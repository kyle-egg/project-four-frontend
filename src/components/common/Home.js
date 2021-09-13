import { Link } from 'react-router-dom'
import { FadeInDiv } from '../gins/Gins'

function Home() {

  return (
    <section className="hero is-fullheight" id="home">
      <div className="hero-body" id="home-body">
        <FadeInDiv>
          <div className="ccontainer has-text-centered" id="home-title-container">
            <p className="title" id="header">
        YOUR FAVOURITE GINS
            </p>
            <p className="subtitle" id="sub-header">
        Delivered To Your Door
            </p>
          </div>
        </FadeInDiv>
        <div>
          <FadeInDiv>
            <Link to='/gins/'>
              <button className="button is-light" id="shopping-button"
                onClick="/gins">
                <strong>START SHOPPING!</strong>
              </button>
            </Link>
          </FadeInDiv>
        </div>
      </div>
    </section>

  )
}
export default Home 