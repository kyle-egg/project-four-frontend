import { userProfile, headers } from '../../lib/api'
import React from 'react'
import { useParams } from 'react-router'
import { getUserId } from '../../lib/auth'
import { Link } from 'react-router-dom'

function UserProfile() {
  const { userId } = useParams()
  const [profile, setProfile] = React.useState({})
  React.useEffect(() => {

    const getData = async () => {
      const res = await userProfile(getUserId(), headers())
      console.log(res)
      setProfile(res.data)
    }
    getData()
    
  }, [ ])

  console.log(userId, profile)

  return (
    <section>
      <div className='myDetails'>
        <h2>My Details</h2>
        <h1>Members Area</h1>
        <h3>Username:</h3><p>{profile.username}</p>
        <h3>E-mail:</h3><p>{profile.email}</p>
      </div>
      <div className='myWishList'>
        <h2>My Wish List!</h2>
        {profile.likedGins && (
          profile.likedGins.map(gin => {
            return <div key={gin.id}>
              <Link to={`/gins/${gin.id}`}>
                <div className='ginCard'>
                  <img src={gin.image}></img>
                  <h5>ABV{gin.abv}% - {gin.size}CL</h5>
                  <h2>{gin.name}</h2>
                  <h3>£{gin.price}</h3>
                </div>
              </Link>
            </div>
          }))}
      </div>
      <div className='myReviews'>
        <h2>My Reviews!</h2>
        {profile.commentsMade && (
          profile.commentsMade.map(comment => {
            return <div key={comment.id}>
              <Link to={`/gins/${comment.gin}`}>
                <div className='reviewCard'>
                  <h2>{comment.rated}/10</h2>
                  <p>£{comment.text}</p>
                </div>
              </Link>
            </div>
          }))}
      </div>
    </section>

  )
}
export default UserProfile