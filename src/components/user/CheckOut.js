import { basket } from '../gins/GinProfile.js'
import React from 'react'

function CheckOut() {
  const [quantityValue, setQuantityValue] = React.useState(1)
  const shipping = 4.99
  const reducer = (previousValue, currentValue) => previousValue + currentValue

  const handleQuantity = (e) => {
    setQuantityValue(e.target.value)
    console.log(quantityValue)
  }

  const totalPrices = []


  return (
    <section className="hero is-fullheight">
      <h1>Check-Out</h1>
      <div className='leftside'>
        <h2>My Basket</h2>
        {basket.length ? basket.map(gin => {
          return <div key={gin.id}>
            <div className='ginCheckOutCard'>
              <img src={gin.image}></img>
              <h2>{totalPrices.push(gin.price)}. {gin.name}</h2>
              <h5>ABV{gin.abv}% - {gin.size}CL</h5>
              <h3>£{gin.price}</h3>
              <label htmlFor="quantity"> Quantity</label>
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
          </div> 
        })
          :
          <h3>No Items In Basket!</h3>
        }
        {basket.length ?
          <div>
            <h4>Subtotal: £{((totalPrices.reduce(reducer)) * quantityValue).toFixed(2)}</h4>
            <h4>Shipping: £{shipping}</h4>
            <h3>Total: £{(((totalPrices.reduce(reducer)) * quantityValue) + shipping).toFixed(2)} </h3>
          </div>
          :
          <></>
        }
      </div>
      {basket.length ?
        <div className='rightside'>
          <h2>My Details</h2>
          <div className="section">
            <div className="container">
              <h3>Shipping Address</h3>
              <div className="columns">
                <form
                  id="shippingForm"
                  className="Shipping"
                >
                  <div className="field">
                    <label className="label">Name:</label>
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
                    <label className="label">Address:</label>
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
                  <h3>Payment</h3>
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
    </section>

  )
}
export default CheckOut