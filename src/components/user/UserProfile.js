import { userProfile, headers } from '../../lib/api'
import React from 'react'
import { getUserId } from '../../lib/auth'
import { Link, useLocation } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

function UserProfile() {
  useLocation()
  const [profile, setProfile] = React.useState({})
  React.useEffect(() => {

    const getData = async () => {
      const res = await userProfile(getUserId(), headers())
      console.log(res)
      setProfile(res.data)
    }
    getData()
    
  }, [ ])
  
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  }
  const items = []

  return (
    <section className="hero is-fullheight" id="myprofile">
      <div className="hero-body" id="profile-body">
        <h1 id="profileheader">Members Area</h1>
        <h1 id="profileheader">Welcome Back {profile.username}!</h1>
        <h2 id="profilesub-header">My Details:</h2>
        <h3 id="profileinfo">Username: {profile.username}</h3>
        <h3 id="profileinfo">E-mail: {profile.email}</h3>
        <button className="buttons">Edit Details</button>
      </div>
      <div>
        <div id="profileleft">
          <h2 id="profileheader">My Wish List!</h2>
          {profile.likedGins && (
            profile.likedGins.map(gin => {
              return <div key={items.push(
                
                <div className="card">
                  <div className="card-image">
                    <Link to={`/gins/${gin.id}`}>
                      <figure className="image is-4by4">
                        <img src={gin.image}></img>
                      </figure>
                    </Link>
                  </div>
                  <div className="media-content">
                    <h5 id="info">ABV{gin.abv}% - {gin.size}CL</h5>
                    <h2 id="header">{gin.name.toUpperCase()}</h2>
                    <h3 id="sub-header">£{gin.price}</h3>
                  </div>
                </div>)}>
              </div>
            }))}
          <AliceCarousel mouseTracking items={items} 
            responsive={responsive}/>
        </div>
        <section className="section">
          <h2 id="profileheader">My Reviews!</h2>
          {profile.commentsMade && (
            profile.commentsMade.map(comment => {
              return <div key={comment.id}>
                <Link to={`/gins/${comment.gin}`}>
                  <div className="card-content" id="review">
                    <h2 id="profileinfo" className="title">{comment.rated}/10</h2>
                    <p className="title" id="profileinfo">
                      {comment.text}
                    </p>
                    <p className="subtitle" id="profileinfo">
                          From User: {comment.owner.username}
                    </p>
                    <p id="profileinfo">
                      {comment.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </Link>
              </div>
            }))}
        </section>
      </div>
    </section>

  )
}
export default UserProfile