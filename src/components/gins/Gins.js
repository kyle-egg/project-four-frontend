import React from 'react'
import { Link } from 'react-router-dom'
import { getAllGins } from '../../lib/api'
import { fadeInDown, fadeInUp, fadeInLeft, fadeInRight, fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components'

const fadeDownAnimation = keyframes`${fadeInDown}`
export const fadeInAnimation = keyframes`${fadeIn}`
export const fadeInLeftAnimation = keyframes`${fadeInLeft}`
export const fadeInRightAnimation = keyframes`${fadeInRight}`
export const fadeInUpAnimation = keyframes`${fadeInUp}`

export const FadeInUpDiv = styled.div`
  animation: 2s ${fadeInUpAnimation}`

export const FadeDownDiv = styled.div`
  animation: 2s ${fadeDownAnimation}`

export const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation}`

export const FadeInLeftDiv = styled.div`
  animation: 2s ${fadeInLeftAnimation}`

export const FadeInRightDiv = styled.div`
  animation: 2s ${fadeInRightAnimation}`


function Gins() {
  const [gins, setGins] = React.useState(null)
  const [flavourValue, setFlavourValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [showFilter, setShowFilter] = React.useState(false)

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


  const seeFilter = () => {
    if (!showFilter) {
      setShowFilter(true)
    } else {
      setShowFilter(false)
    }
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
    <section className="section">
      <FadeDownDiv>
        <div className="ginTop">
          <h1 className="title" id="headerGin" >GINS</h1>
          <div>
            <input 
              className='searchGins'
              placeholder='SEARCH'
              onChange={handleSearch}
              id="sub-header"
            />
          </div>
          <div>
            <button className="searchGins" id="sub-header" onClick={seeFilter}>FILTER</button>
          </div>
          {showFilter && (
            <div>
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
            </div>
          )}
        </div>
      </FadeDownDiv>
      {gins &&
        <h5 id="info">{filterGins().length} GINS FOUND</h5>}
      <div className="columns">
        {gins && filterGins().map(gin => {
          return <div className="column"key={gin.id} id="column">
            <Link to={`/gins/${gin.id}`}>
              <FadeInDiv>
                <div className="card">
                  <div className="card-image">
                    {!gin.isPremium ?
                      <figure className="image is-4by4">
                        <img src={gin.image}></img>
                      </figure>
                      :
                      <div id="premium">
                        <figure className="image is-4by4" id="premium">
                          <img src={gin.image}></img>
                        </figure>
                      </div>
                    }
                  </div>
                  <div className="media-content">
                    <h5 id="info">ABV{gin.abv}% - {gin.size}CL</h5>
                    <h2 id="header">{gin.name.toUpperCase()}</h2>
                    <h3 id="sub-header">£{gin.price}</h3>
                  </div>
                </div>
              </FadeInDiv>
            </Link>
          </div> 
        })}
      </div>
    </section>
  )
}

export default Gins