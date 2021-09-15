import { basket } from '../gins/GinProfile.js'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FadeInDiv } from '../gins/Gins'

function CheckOut() {
  const [quantityValue, setQuantityValue] = React.useState(1)
  const shipping = 4.99
  const history = useHistory()
  useLocation()
  const reducer = (previousValue, currentValue) => previousValue + currentValue

  const handleQuantity = (e) => {
    setQuantityValue(e.target.value)
    console.log(quantityValue)
  }

  const deleteItem = (e) => {
    basket.splice(e.target.id, 1)
    history.push('/checkout')
  }

  const totalPrices = []


  return (
    <FadeInDiv>
      <section className="hero is-fullheight" id="myprofile">
        <div className="hero-body" id="profile-body">
          <h1 id="checkoutheader">Check-Out</h1>
          <div className="columns">
            <div className='column' id="checkcolumn">
              <h2 id="checkoutheader">My Basket</h2>
              {basket.length ? basket.map(gin => {
                return <div key={gin.id}>
                  <article className="media">
                    <figure className="media-left">
                      <p className="image is-64x64">
                        <img src={gin.image} />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p id="profilesub-header">
                          <strong id="profilesub-header">{gin.name}</strong> <small>ABV{gin.abv}% - {gin.size}CL</small>
                          <br />
                  £{gin.price}
                        </p>
                      </div>
                      <nav className="level is-mobile">
                        <div className="level-left">
                          <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-reply"></i></span>
                          </a>
                          <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                          </a>
                          <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-heart"></i></span>
                          </a>
                        </div>
                      </nav>
                    </div>
                    <div className="media-right">
                      <button className="delete" id={totalPrices.push(gin.price) - 1} onClick={deleteItem}></button>
                      <select 
                        name="quantity" 
                        id="basketQuantity"
                        onChange={handleQuantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select> 
                    </div>
                  </article>
                </div> 
              })
                :
                <h3 >No Items In Basket!</h3>
              }
              {basket.length ?
                <div>
                  <h4 id="profilesub-header"><strong id="profilesub-header">Subtotal:</strong> £{((totalPrices.reduce(reducer)) * quantityValue).toFixed(2)}</h4>
                  <h4 id="profilesub-header"><strong id="profilesub-header">Shipping:</strong> £{shipping}</h4>
                  <h3 id="profilesub-header" ><strong id="profilesub-header">Total:</strong> £{(((totalPrices.reduce(reducer)) * quantityValue) + shipping).toFixed(2)} </h3>
                </div>
                :
                <></>
              }
            </div>
            {basket.length ?
              <div className='column' id="checkcolumn">
                <h2 id="checkoutheader">My Details</h2>
                <div className>
                  <div className="container">
                    <h3 id="profilesub-header">Shipping Details</h3>
                    <div className="columns">
                      <form
                        id="profilesub-header"
                        className="shipping"
                      >
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              placeholder="Name"
                              name="name"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <div className="field">
                          <div className="shipping">
                            <input
                              className="input"
                              placeholder="Address"
                              name="address"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <div className="field">
                          <div className="shipping">
                            <input
                              className="input"
                              placeholder="City"
                              name="city"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <div className="field">
                          <div className="shipping">
                            <input
                              className="input"
                              placeholder="Postal Code"
                              name="postcode"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <h3>Payment Details</h3>
                        <div className="field">
                          <div className="paymentName">
                            <input
                              className="input"
                              placeholder="Name On Card"
                              name="nameOnCard"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <div className="field">
                          <div className="paymentNumber">
                            <input
                              className="input"
                              placeholder="Card Number"
                              name="numberOnCard"
                              // onChange={handleChange}
                              // value={formData.name}
                            />
                          </div>
                          {/* {formErrors.name && (
                <p className="help is-danger">{formErrors.name}</p>
              )} */}
                        </div>
                        <div className="field">
                          <button 
                            type="submit" 
                            className="button"
                          >
              Purchase!
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              :
              <></>
            }
          </div>
        </div>
      </section>
    </FadeInDiv>
  )
}
export default CheckOut