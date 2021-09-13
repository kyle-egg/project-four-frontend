import { Link } from 'react-router-dom'

function Home() {

  return (
    <section className="hero is-fullheight" id="home">
      <div className="hero-body" id="home-body">
        <div className="ccontainer has-text-centered" id="home-title-container">
          <p className="title" id="header">
        YOUR FAVOURITE GINS
          </p>
          <p className="subtitle" id="sub-header">
        Delivered To Your Door
          </p>
        </div>
        <div>
          <Link to='/gins/'>
            <button className="button is-light" id="shopping-button"
              onClick="/gins">
              <strong>START SHOPPING!</strong>
            </button>
          </Link>
        </div>
      </div>
    </section>

  )
}
export default Home 