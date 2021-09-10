import React from 'react'
import { Link } from 'react-router-dom'
import { getAllGins } from '../../lib/api'

function Gins() {
  const [gins, setGins] = React.useState(null)
  const [flavourValue, setFlavourValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const isLoading = !gins

  React.useEffect(() => {
    const getData = async () => {
      const res = await getAllGins()
      setGins(res.data)
    }
    getData()
    
  }, [ ])

  const handleFlavour = (e) => {
    setFlavourValue(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  // const handleSort = (e) => {
  //   console.log(e.target.value)
  // }

  const filterGins = () => {
    if (flavourValue || searchValue) {
      return gins.filter(gin => {
        return gin.flavour.includes(flavourValue) && 
        gin.name.toLowerCase().includes(searchValue.toLowerCase())
      })
    } else {
      return gins
    }
    
  }

  return (
    <section>
      <h1>GINS</h1>
      <h2>SEARCH</h2>
      <input 
        className='searchGins'
        placeholder='Search...'
        onChange={handleSearch}
      />
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
      {/* <select 
        className='sorter'
        onChange={handleSort}>
        <option value=''>Sort By:</option>
        <option value='name'>Name</option>
        <option value='price'>Price: Low</option>
        <option value='price'>Price: High</option>
      </select> */}

      {isLoading ?
        <>
          <img src="https://media.giphy.com/media/mADcc0uyUzkrHkv4AG/giphy.gif?cid=790b76113024d6cb7cf5c7dd726ac3c5cc4e03eca9e129fa&rid=giphy.gif&ct=s"/> 
        </>
        :
        gins &&
        <h5>{filterGins().length} GINS FOUND</h5>}
      <div>
        {gins && filterGins().map(gin => {
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