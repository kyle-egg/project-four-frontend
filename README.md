# Craft Gin Shop - A Django & React App

Introducing a Django, PostgresSQL and React full-stack app. My final project for General Assembly's Software Engineering Immersive.

![Gif of App](https://media.giphy.com/media/c48gmvJZx7hAptem9f/giphy.gif)

## Deployment

I deployed this website using Heroku and Netlify, which is available [HERE](https://kyle-egg-craft-gin.netlify.app/). The free servers on Heroku are a tad slow when they are not in use, so please allow a minute or two for them to wake up, especially when loading the gins!
Feel free to register your own account (takes seconds!) to experience the full functionality of the app!


## Table Of Contents

* Concept
* Project Brief
* Technologies Used
* Installation Instructions
* Wireframe and Relationships
* General Approach and Planning
* Days 1 & 2
* Days 3 & 4
* Day 5
* Days 6 & 7
* Unsolved Problems
* Challenges
* Wins
* Features Wishlist 
* Key Learnings

## Concept

The Craft Gin Shop is cloned from the popular [Craft Gin Club](https://club.craftginclub.co.uk/), an e-commerce website that sells craft gins. The website is like most e-commerce websites, except that members (users) are able to buy a premium range of gins, that are not accessible to non-members. 
N.B.: It goes without saying, that although the gins may be tempting, they are not for sale!

## Project Brief

* One week to plan, build, and test our final project with a focus on cementing the learning from the past 11 weeks.
* Choose to work solo, as a pair, or as a group for the duration of the project.
* Review project proposal with our Teacher Assistants to make sure it can be accomplished in the limited time available.
* Build a full-stack application by making our own backend and frontend.
* Use a Python Django API, using Django REST Framework to serve our data from a PostgresSQL database.
* Consume our API with a separate frontend built with React.
* Build a complete product, which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Implement thoughtful user stories/wireframes that are significant enough to help us know which features are core MVP and which can be cut.
* Have a visually impressive design and be deployed online so it's publicly accessible.
* A git repository hosted on Github, with a link to your hosted project and frequent commits dating back to the very beginning of the project.

## Technologies Used

* PostgresSQL
* Python
* Django
* JavaScript
* React.js
* HTML5
* CSS3 + SASS
* Bulma
* Djangorestframework
* Djangorestframework-camel-case
* Pyjwt
* Python-dotenv
* Psycopg2-binary
* Axios
* React-router-dom
* Simple-react-lightbox
* JSONWebToken
* React-heart
* React-animations
* React-alice-carousel
* Development Tools:
* VS Code
* Git + GitHub
* Insomnia
* TablePlus
* Heroku
* Pylint

## Installation Instructions
1. Clone repo code from GitHub onto your machine.
2. Open up server in VS Code.
3. Run `pipenv i` in the root directory to install all packages from Pipfile.
4. Run `pipenv shell` in the root directory to spawn a shell within the virtual environment.
5. Use `python manage.py runserver` to start the backend server in the root directory.
6. Open a second window of VS Code and open client.
7. Use `npm i` in your client directory to install all dependencies from the package.json file.
8. Run `npm run dev` from client to start the frontend.

## Wireframe & Relationships

**Database Entity Relationship Diagram**

[Image]



**WireFrame**


[Image]


## General Approach & Planning

* I began by mocking up a basic wireframe for the app, taking screenshots from the Craft Gin Club website that I was aiming to replicate. 
* Next, I created an entity relationship diagram (ERD) for our database tables and relationships for a clear understanding of all the models that need to be created.
* My MVP goal was to build an e-commerce website that could handle unlimited user accounts, with user functionality to rate and review gins as well as making a purchase. 
* My extension goals that I wanted to implement if my MVP goal was met early were to:
  * Introduce the premium gin range, which only members/users can purchase.
  * Research and implement animations to the app.
  * Add ‘Purchase History’ relationship for users, so the User Profile page can see purchases made.
  * Add ‘Edit User’ functionality so users can change their username, email and password. 
* Once my overall plan was set out, I set myself a day-to-day plan with goals that I wanted to complete each day to make sure I stay on track for completion. 
  * DAY 1 & 2 - Backend completed, with connection to the frontend.
  * DAY 3 & 4 - Frontend MVP completion. 
  * DAY 5 - Fixing errors, tweaking frontend features and styling. 
  * DAY 6 - Implementation of extension goals 
  * DAY 7 - ‘Buffer day’

## Days 1 & 2
As per my day-to-day plan I began to set up the backend using Django and Python. Using the ERD diagram as I guide, I started to create the Gin and Comment models, allowing for users to rate, review and like multiple gins.

```python
class Gin(models.Model):
   name = models.CharField(max_length=200, unique=True)
   bio = models.TextField(max_length=500)
   size = models.PositiveIntegerField()
   abv = models.FloatField()
   image = models.CharField(max_length=500, unique=True)
   price = models.FloatField()
   origin = models.CharField(max_length=200)
   botanicals = models.CharField(max_length=200)
   tasting_notes = models.TextField(max_length=500)
   perfect_gt = models.CharField(max_length=200)
   flavour = models.CharField(max_length=50)
   liked_by = models.ManyToManyField(
       'jwt_auth.User',
       related_name='liked_gins',
       blank=True
   )
   def __str__(self):
       return f'{self.name}'
 
 
class Comment(models.Model):
   text = models.TextField(max_length=300)
   rated = models.PositiveIntegerField(default=10, validators=[MaxValueValidator(10)])
   created_at = models.DateTimeField(auto_now_add=True)
   gin = models.ForeignKey(
       Gin,
       related_name='comments',
       on_delete=models.CASCADE
   )
   owner = models.ForeignKey(
       'jwt_auth.User',
       related_name='comments_made',
       on_delete=models.CASCADE
   )
   def __str__(self):
       return f'{self.gin} - {self.id}'

```

Afterwhich, I added in the Serializers for the gins, comments and likes

```python
class NestedUserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('id', 'username')
 
class CommentSerializer(serializers.ModelSerializer):
   class Meta:
       model = Comment
       fields = '__all__'
 
class PopulatedCommentSerializer(CommentSerializer):
   owner = NestedUserSerializer()
 
class GinSerializer(serializers.ModelSerializer):
   comments = PopulatedCommentSerializer(many=True, read_only=True)
   liked_by = NestedUserSerializer(many=True, read_only=True)
 
   class Meta:
       model = Gin
       fields = '__all__'
```

…..and views with the URLs routed separately.

```python
class GinListView(ListCreateAPIView):
   ''' List View for /gins INDEX CREATE'''
   queryset = Gin.objects.all()
   serializer_class = GinSerializer
   permission_classes = (IsAuthenticatedOrReadOnly, )
 
class GinDetailView(RetrieveUpdateDestroyAPIView):
   ''' Detail View for /gins/id SHOW UPDATE DELETE'''
   queryset = Gin.objects.all()
   serializer_class = GinSerializer
   permission_classes = (IsAuthenticatedOrReadOnly, )
```

In doing the above, I was then able to test the backend by using the Django administration website to create, edit and view individual gins, whilst also seeing all gins as an admin. 

After adding a handful of gins to start, I then proceeded to add the models, views, serializers and authentication for Users. This is required at this stage, not only because the application needs them eventually, but because I needed to create users and tokens in order to test the functionality of rating and reviewing gins.

**User Model**

```python
class User(AbstractUser):
   email = models.CharField(max_length=50)
```

**User Serializers**
```python
class UserRegisterSerializer(serializers.ModelSerializer):
 
   password = serializers.CharField(write_only=True)
   password_confirmation = serializers.CharField(write_only=True)
 
   def validate(self, data):
       password = data.pop('password')
       password_confirmation = data.pop('password_confirmation')
 
       if password != password_confirmation:
           raise ValidationError({'password_confirmation': 'does not match'})
 
       # try:
       #     validation.validate_password(password=password)
       # except ValidationError as err:
       #     raise ValidationError({'password': err.messages})
 
       data['password'] = make_password(password)
 
       return data
 
 
   class Meta:
       model = User
       fields ='__all__'
 
class UserProfileSerializer(serializers.ModelSerializer):
   liked_gins = GinSerializer(many=True)
   comments_made = CommentSerializer(many=True)
 
   class Meta:
       model = User
       fields = ('username', 'email', 'liked_gins', 'comments_made')
```

Now with the Registration and Login of users set up with JWT Authentication also configured, I can now go back to the gin views, adding the Comment and Like views with authentication, in order for only users/members to rate and review individual gins.

```python
class CommentListView(APIView):
   ''' List View for /gins/ginId/comments CREATE comments'''
 
   permission_classes = (IsAuthenticated, )
 
   def post(self, request, gin_pk):
       request.data['gin'] = gin_pk
       request.data['owner'] = request.user.id
       created_comment = CommentSerializer(data=request.data)
       if created_comment.is_valid():
           created_comment.save()
           return Response(created_comment.data, status=status.HTTP_201_CREATED)
       return Response(created_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
 
 
class CommentDetailView(APIView):
   ''' DELETE COMMENT VIEW '''
 
   permission_classes = (IsAuthenticated, )
 
   def delete(self, _request, **kwargs):
       comment_pk = kwargs['comment_pk']
       try:
           comment_to_delete = Comment.objects.get(pk=comment_pk)
           comment_to_delete.delete()
           return Response(status=status.HTTP_204_NO_CONTENT)
       except Comment.DoesNotExist:
           raise NotFound(detail='Comment Not Found')
 
class GinLikeView(APIView):
   ''' Adds likes to gins or removes if already liked '''
 
   permission_classes = (IsAuthenticated, )
 
   def post(self, request, gin_pk):
       try:
           gin_to_like = Gin.objects.get(pk=gin_pk)
       except Gin.DoesNotExist:
           raise NotFound()
 
       if request.user in gin_to_like.liked_by.all():
           gin_to_like.liked_by.remove(request.user.id)
       else:
           gin_to_like.liked_by.add(request.user.id)
 
       serialized_gin = GinSerializer(gin_to_like)
 
       return Response(serialized_gin.data, status=status.HTTP_202_ACCEPTED)
```
Now all the functionality of the backend is more or less completed, I can now undergo a full ‘sanity check’, using Insomnia as a tool, and carryout full CRUD tests of both Users, Gins, Comments and Likes to put my mind at ease moving from the backend to the frontend for the rest of the project (in the most part!).

Using Insomnia I can now Register and Login Users successfully to receive a token, and use that token in order to test users liking and commenting on gins.

By the end of Day 2, I was very happy with the progress made and pleased I was oncourse as per the day-to-day goals set. Django is a godsend for being able to set-up a full backend efficiently and quickly!

## Days 3 & 4

Going into Day 3, I was very eager to get into the frontend from two days in the backend and started with routing and creating all the pages at the frontend as per the wireframe I created. Afterwhich, and it is not a glamorous job, I proceeded to add more data to the seed, by adding more gins and liking and commenting on a few with a created user through Insomnia.

Now with all the pages routed and created, I moved onto linking up the frontend to the backend and tested the connection by using Axios to ‘getAllGins’ and console log the handful of gins I had previously created. With my sanity in check, knowing all is connected, I then went through each page one by one to create an MVP of each. Presenting the data on each page unstyled.

In particular the GinProfile.js & UserProfile.js pages needed more attention, with most of the functionality occurring on those pages...

On the ginProfile.js page, I wanted to display the amount of members who added the gin to their Wish List in order to showcase popularity, whilst hiding the stat if there were not any. 

```javascript
{gin.likedBy.length ?
<h2 className="ginstat"><strong className="ginStats">{gin.likedBy.length}</strong> 
Member(s) have added this Gin to their Wish List!</h2>
                     :
                     <h2> </h2>}
 
```

Next I added functionality for users (only) to add the gin to their Wish List.

```javascript
{isAuth &&
<div className="wish">
<h2>Add To Wish List!</h2>
<div className="heart">
<Heart isActive={active}
onClick={wishToggle}
type="submit"
className="wishButton" />
</div>
</div>
}
```
Display the average user rating of the gin
```javascript
{gin.comments.length ?
<h2 className="ginstat">This Gin Has An Average Member Rating Of: 
<strong className="ginStats">{Math.round(rateArray.reduce(reducer) / gin.comments.length * 10) / 10}/10!</strong></h2>
                     :
 <h2>This Gin Has Not Been Rated Yet!</h2>}

Allow users (only) to rate and review gins.
{isAuth &&
               <div>
                 {showWriteAReview ?
                   <form
                     id='createComment'
                     onSubmit={submitComment}>
                     <div className="field">
                       <label className="label" id="ginheader">Write A Review:</label>
                       <div className="control">
                         <input
                           className={`input ${formErrors.text}`}
                           placeholder="Write A Review Here..."
                           name="text"
                           onChange={inputtingComment}
                           value={formData.text}
                           id="reviewtextbox"
                           rows="10"
                         />
                       </div>
                     </div>
                     <div className="field">
                       <label className="label">Rate it:</label>
                       <div className="control">
                         <input
                           className={`input ${formErrors.rated}`}
                           name="rated"
                           placeholder="Rate Out Of 10.."
                           type="number"
                           onChange={inputtingComment}
                           value={formData.rated}
                         />
                       </div>
                     </div>
                     <div className="field">
                       <button
                         type="submit"
                         className="buttons"
                         onSubmit={submitComment}>
                     Submit Review!
                       </button>
                     </div>
                   </form>
                   :
                   <h2 id="ginheader">Review Submitted!</h2>
                 }
               </div>
               }
```
An ‘Add to basket’ button that pushed the gin to an empty array, with the idea of mapping out that array on the CheckOut page. 
 
```javascript 
 const addToBasket = () => {
   basket.push(gin)
   console.log(basket)
   setShowBasket(true)
   setTimeout(function(){
     setShowBasket(false)
   }, 3000)
 ```
 
## User Profile Page

With the User Profile page, from an MVP viewpoint, I wanted each user to see the gins they added to their Wish List as well as comments made.

For the Wish List in particular, I had the idea of using a slider carousel to showcase all the images of the gins wish listed, and found one on npm called Alice Carousel, which had fairly straightforward documentation. 

For the Reviews, it is a simple mapping of the data to show all the reviews that the user has made. 

With Day 4 coming to a close, I was a little bit off my schedule with some more pages and features to be added to the front end, however all was still achievable within the timeframe.

## Day 5

On Day 5 I started to finish off a few things I could not quite complete in the previous day, such as the Check Out page where I mapped out the basket data, as mentioned earlier, and added a bit of maths in order to calculate totals with shipping.

On completing an MVP for the overall app, I then proceeded to catch up to my schedule by adding styling, choosing bulma as my framework. I also added and styled a navbar for a better UX experience. Using Craft Gin Club as a guide, I managed to style a similar website.

## Days 6 & 7

With the application now looking presentable with basic functionality, I moved to adding some of the extensions goals I set out previously. Firstly, I tackled the basket, as I wanted to add a pop-up basket that presents the contents when an item is added. A function that you may find with most e-commerce websites. 

Given items are only added to the basket from the Gin Profile Page, I added this pop-up function to this page only and had it sit at the top, in-between the Navbar and the contents of the page. With a bit of styling and React functionality, I was able to make the basket look as though it was hidden and a part of the Navbar.  

![This is GIF of Basket](https://media.giphy.com/media/HRmBjLNwq6jcHElM74/giphy.gif)

```javascript
Add To Basket Function:
 const addToBasket = () => {
   basket.push(gin)
   console.log(basket)
   setShowBasket(true)
   setTimeout(function(){
     setShowBasket(false)
   }, 3000)
 }

```

**Basket JSX:**
```javascript
     {showBasket && (
       <div className="basket">
         <FadeInDiv>
           <div>
             <h2 id="profileheader">Your Basket:</h2>
             {basket.length ? basket.map(gin => {
               return <div key={gin.id}>
                 <div>
                   <h2 id="basketitems">{gin.name} - £{gin.price}</h2>
                 </div>
               </div>
             })
          
               :
               <h3 id="profileheader">No Items In Basket!</h3>
             }
             <div className="buttoncontainer">
               <NavLink to="/checkout">
                 <button
                   className="checkoutbutton"
                   onClick={closeBasket}>
                 Go To Check Out!</button>
               </NavLink>
             </div>
           </div>
         </FadeInDiv>
       </div>
     )}
```

As per the code and above GIF, you can see that I added a 3 second timer to the basket, so that when an item is added it also disappears. Showing the user it has been added, whilst also enabling the user to manually toggle the basket when clicking the shopping trolley once to show the basket, and once more to hide it.

![NavBar GIF](https://media.giphy.com/media/XjOcnL6dtKImk9l0Ii/giphy.gif)

To give the application further functionality and to create a difference between a user and a non-user. I created a premium range of gins that can only be purchased by users/members.
To do this, I added another field to the gin model by adding a is_premium attribute as a boolean. Then added a handful of premium gins for testing.

```python
   is_premium = models.BooleanField()
```

From a business perspective, I wanted it to be visibly clear to non-users that there are premium gins on offer, in order to push sign-ups to members. To do this, I added a padlock png to appear instead of the gin image to non-members and made the gin still clickable. However, upon entering the gin profile page, there will be a prompt to sign up to become a member. 

![Gif Example](https://media.giphy.com/media/u5OLK5OQsRQExfD2N6/giphy.gif)

I did this in the JSX, by determining what the user sees by using authentication and is.premium as a rule.

```javascript

{!isAuth ?
<div className="card-image">
{!gin.isPremium ?
<figure className="image is-4by4">
<img src={gin.image}></img>
</figure>
:
<div id="premium">
<div>
<svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Lock Closed</title><path d="M336 208v-95a80 80 0 00-160 0v95" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
</div>
<figure className="image is-4by4" id="premium">
</figure>
</div>
}
</div>
:
<div className="card-image">
<figure className="image is-4by4">
<img src={gin.image}></img>
</figure>
</div>
}
```

Lastly as an extension goal, I wanted to explore the world of animations! As this is something I had not experienced or implemented previously in any of my projects. 

After a bit of research I came across react-animations via npm, which for me had really straight forward documentation and a good demonstration tool. I started with the gin page, and once I got the hang of it….I implemented it everywhere!

```javascript
import { fadeInDown, fadeInUp, fadeInLeft, fadeInRight, fadeIn } from 'react-animations'
 
const fadeDownAnimation = keyframes`${fadeInDown}`
export const fadeInAnimation = keyframes`${fadeIn}`
export const fadeInLeftAnimation = keyframes`${fadeInLeft}`
export const fadeInRightAnimation = keyframes`${fadeInRight}`
export const fadeInUpAnimation = keyframes`${fadeInUp}`
 
export const FadeInUpDiv = styled.div`
 animation: 2s ${fadeInUpAnimation}`
 
export const FadeDownDiv = styled.div`
 animation: 2s ${fadeDownAnimation}`
 
export const FadeInDiv = styled.div`
 animation: 2s ${fadeInAnimation}`
 
export const FadeInLeftDiv = styled.div`
 animation: 2s ${fadeInLeftAnimation}`
 
export const FadeInRightDiv = styled.div`
 animation: 2s ${fadeInRightAnimation}`
```

![GIF Animations](https://media.giphy.com/media/qwIWtBEmPtk04pSGxE/giphy.gif)

With the deadline looming, with less than an hour to spare, I moved on to a bit more data entry in order to make the application look fuller. 

## Challenges and Unsolved Problems
Whilst there were not too many challenges for this project for me, there were a handful of smaller problems that I did not quite get to solving:

* The basket counter in the top right hand corner of the Navbar does not update once an item is added to basket, but it does once the shopping cart is clicked.
* The ‘heart’ on the Gin Profile page and ‘Go To Checkout’ button are not responsive and can be unaligned.
* The ‘heart’ button does not stay ‘liked’ once a user adds the gin to their Wish List. If they return to the page, visually, the heart is not red. 
* On the Checkout page the totals do not calculate properly when there are multiple items with different quantities within the basket. 

## Wins

Building a fully functional application on my own in a week with minimal challenges was definitely a big win, especially one that I feel is very close to a standard e-commerce website that you will find on the internet. Another key win for me is finishing the MVP standard in good time, meaning I was not in a rush and allowed myself to explore and execute animations on the website. Something that I was unable to do with previous projects. 

## Features Wish List

* Adding the Edit User feature to the My Profile Page. The button currently has no function.
* Adding a Purchase History to the My Profile Page and hooking up the purchase button to the backend so purchase history is recorded. 
* Adding a filter function for Premium Gins.
* Further styling to Navbar and My Profile Page. 

## Key Learnings

I found that going solo for the final project definitely had its pros and cons. I did miss bouncing ideas off team mates and sorting out any hurdles easier. However, I was happy that I trusted my ability to build a full-stack app on my own, as it really did highlight how far I have come and the skills I learned over the past 3 months. I was very happy with how the app turned out in the time given with just a few minor features that missed out on the final version. On the technical side Django was definitely and eye-opener on how quick it is to set up a back end and is a language I enjoyed using!



