import React from 'react'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { getGin, wishGin, createReview } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { FadeInDiv, FadeInLeftDiv, FadeInRightDiv, FadeInUpDiv } from './Gins'
import Heart from 'react-heart'



const initialState = {
  'rated': '',
  'text': '',
}

export const basket = []
const reducer = (previousValue, currentValue) => previousValue + currentValue

function GinProfile() {
  const [gin, setGin] = React.useState(null)
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const { ginId } = useParams()
  const isAuth = isAuthenticated()
  const [active, setActive] = React.useState(false)
  const [showBasket, setShowBasket] = React.useState(false)
  const [showWriteAReview, setShowWriteAReview] = React.useState(true)
  const history = useHistory()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getGin(ginId)
        setGin(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    
  }, [ginId])


  const wishToggle = async e => {
    console.log(e)
    setActive(!active)
    try {
      const { data } = await wishGin(ginId)
      console.log('Wished/UnWished', data)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

  const submitComment = async e => {
    e.preventDefault()
    try {
      const { data } = await createReview(ginId, formData)
      console.log('Comment Submitted:', data)
    } catch (err) {
      console.log(formErrors)
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
    setShowWriteAReview(false)
  }

  const inputtingComment = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const addToBasket = () => {
    basket.push(gin)
    console.log(basket)
    setShowBasket(true)
    setTimeout(function(){
      setShowBasket(false) 
    }, 3000)
  }

  const closeBasket = () => {
    setShowBasket(false) 
    history.push('/login')
  }

  const rateArray = []

  const register = () => {
    history.push('/register')
  }

  const login = () => {
    history.push('/login')
  }

  return (
    <>
      {showBasket && (
        <div className="basket">
          <FadeInDiv>
            <div>
              <h2 id="profileheader">Your Basket:</h2>
              {basket.length ? basket.map(gin => {
                return <div key={gin.id}>
                  <div>
                    <h2 id="basketitems">{gin.name} - ??{gin.price}</h2>
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
      <section className="section">
        <div>
          {gin &&
        <>
          <>
            <div key={gin.id} className="columns">
              <div className="column" id="column">
                <FadeInLeftDiv>
                  {!isAuth ?
                    <div className="card-image" id="ginprofileimage">
                      {!gin.isPremium ?
                        <figure className="image is-4by4" id="ginprofileimage">
                          <img id="ginprofileimage" src={gin.image}></img>
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
                    <div className="card-image" id="ginprofileimage">
                      <figure className="image is-4by4" id="ginprofileimage">
                        <img id="ginprofileimage" src={gin.image}></img>
                      </figure>
                    </div>
                  }
                  <div className="ginStats">
                    {gin.likedBy.length ?
                      <h2 className="ginstat"><strong className="ginStats">{gin.likedBy.length}</strong> Member(s) have added this Gin to their Wish List!</h2>
                      :
                      <h2> </h2>}
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
                    {gin.comments &&
                gin.comments.map(comment => {
                  <div key={comment.id}>
                    <div>{rateArray.push(comment.rated)}</div>
                  </div>
                })}
                    {gin.comments.length ?
                      <>
                        <h2 className="ginstat">This Gin Has An Average Member Rating Of: <strong className="ginStats">{Math.round(rateArray.reduce(reducer) / gin.comments.length * 10) / 10}/10!</strong></h2>
                      </>
                      :
                      <h2>This Gin Has Not Been Rated Yet!</h2>
                    }
                  </div>
                </FadeInLeftDiv>
              </div>
              <div className="column" id="ginprofileright">
                <FadeInRightDiv>
                  <h2 className="ginattributes" id="ginheader"><strong>{gin.name}</strong></h2>
                  <h5 className="ginattributes" id="gininfo">ABV{gin.abv}% - {gin.size}CL</h5>
                  <h3 className="ginattributes" id="ginsub-header">??{gin.price}</h3>
                  {!isAuth ?
                    <div>
                      {!gin.isPremium ?
                        <button className="buttons" onClick={addToBasket}>Add To Basket</button>
                        :
                        <>
                          <h2 id="membermessage">This Gin Can Only Be Purchased By Members. Register Or Login Below!</h2>
                          <button className="buttons" onClick={register}>Register</button>
                          <button className="buttons" onClick={login}>Login</button>
                        </>
                      }
                    </div>
                    :
                    <div>
                      <button className="buttons" onClick={addToBasket}>Add To Basket</button>
                    </div>}
                  <h4 className="ginattributes"><strong>About:</strong></h4>
                  <p className="ginattributes">{gin.bio}</p>
                  <h4 className="ginattributes"><strong>Origin:</strong></h4>
                  <p className="ginattributes">{gin.origin}</p>
                  <h4 className="ginattributes"><strong>Botanicals:</strong></h4>
                  <p className="ginattributes">{gin.botanicals}</p>
                  <h4 className="ginattributes"><strong>Tasting Notes:</strong></h4>
                  <p className="ginattributes">{gin.tastingNotes}</p>
                  <h4 className="ginattributes"><strong>Perfect G&T:</strong></h4>
                  <p className="ginattributes">{gin.perfectGt}</p>
                </FadeInRightDiv>
              </div>
            </div>
            <section className="section" id="profilecontent">
              <FadeInUpDiv>
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
                <div id="reviews">
                  {gin.comments.length ?
                    <h3 id="ginheader">Member Reviews:</h3>
                    :
                    <h3> </h3>}
                  <div className="card">
                    {gin.comments &&
                    gin.comments.map(comment => {
                      return <div key={comment.id}>
                        <div className="card-content" id="review">
                          <h2 className="title">{comment.rated}/10</h2>
                          <p className="title">
                            {comment.text}
                          </p>
                          <p className="subtitle">
                          From User: {comment.owner.username}
                          </p>
                          <p>
                            {comment.createdAt.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </FadeInUpDiv>
            </section>
          </>
        </>
          }
        </div>
      </section>
    </>
  )
}

export default GinProfile