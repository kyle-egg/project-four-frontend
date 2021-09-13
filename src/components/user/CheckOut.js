import { basket } from '../gins/GinProfile.js'

function CheckOut() {

  return (
    <section className="hero is-fullheight">
      <h1>Check-Out</h1>
      <div className='leftside'>
        <h2>My Basket</h2>
        {basket && basket.map(gin => {
          return <div key={gin.id}>
            <div className='ginCheckOutCard'>
              <img src={gin.image}></img>
              <h2>{gin.name}</h2>
              <h5>ABV{gin.abv}% - {gin.size}CL</h5>
              <h3>£{gin.price}</h3>
              <label htmlFor="quantity">Quantity</label>
              <select name="quantity" id="basketQuantity">
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
            <h4>Subtotal:</h4>
            <h4>Shipping:</h4>
            <h3>Total:</h3>
          </div> 
        })}
      </div>
      <div className='rightside'>
        <h2>Information</h2>
      </div>
    </section>

  )
}
export default CheckOut