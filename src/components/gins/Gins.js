import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Gins() {
  const [gins, setGins] = React.useState(null)
  const [flavourValue, setFlavourValue] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/gins')
      setGins(res.data)
    }
    getData()
    
  }, [ ])

  const handleFlavour = (e) => {
    setFlavourValue(e.target.value)
  }

  const handleSort = (e) => {
    console.log(e.target.value)
  }

  const filterFlavour = () => {
    if (flavourValue) {
      return gins.filter(gin => {
        return gin.flavour.includes(flavourValue)
      })
    } else {
      return gins
    }
    
  }

  return (
    <section>
      <h1>GINS</h1>
      <h2>SORT & FILTER</h2>
      <select 
        className='flavourSelector'
        onChange={handleFlavour}>
        <option value=''>Flavour:</option>
        <option value='Classic'>Classic</option>
        <option value='Citrus'>Citrus</option>
        <option value='Spiced'>Spiced</option>
        <option value='Fruit'>Fruit</option>
        <option value='Floral'>Floral</option>
        <option value='Herbs'>Herbs</option>
      </select>
      <select 
        className='sorter'
        onChange={handleSort}>
        <option value=''>Sort By:</option>
        <option value='name'>Name</option>
        <option value='price'>Price: Low</option>
        <option value='price'>Price: High</option>
      </select>
      {gins &&
        <h5>{filterFlavour().length} GINS FOUND</h5>}
      <div>
        {gins && filterFlavour().map(gin => {
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
        })}
      </div>
    </section>
  )
}

export default Gins