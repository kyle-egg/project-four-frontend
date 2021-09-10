import React from 'react'
import { useParams } from 'react-router-dom'
import { getGin, wishGin, createReview } from '../../lib/api'

const initialState = {
  'rated': '',
  'text': '',
}

function GinProfile() {
  const [gin, setGin] = React.useState(null)
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const { ginId } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getGin(ginId)
        setGin(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    
  }, [ginId])

  const wishToggle = async e => {
    e.preventDefault()
    try {
      const { data } = await wishGin(ginId)
      console.log(data)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

  const submitComment = async e => {
    e.preventDefault()
    try {
      const { data } = await createReview(ginId, formData)
      console.log(data)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

  const inputtingComment = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  
  return (
    <section>
      <div>
        {gin &&
          <div key={gin.id}>
            <div className='leftSide'>
              <div className='ginImage'>
                <img src={gin.image}></img>
              </div>
              <div className="ginStats">
                {gin.likedBy.length ?
                  <h3>{gin.likedBy.length} Member(s) have added this Gin to their Wish List!</h3>
                  :
                  <h3>This Gin Is Unloved!</h3>}
                <button 
                  type="submit" 
                  className="wishButton"
                  onClick={wishToggle}>
                    Add to Wish List!</button>
                {gin.comments &&
                gin.comments.map(comment => {
                  return <div key={comment.id}>
                    <h3>This Gin Has An Average Member Rating Of:</h3>
                    <h3>{comment.rated / gin.comments.length}/10!</h3>
                  </div>
                })}
                <form
                  id='createComment'
                  onSubmit={submitComment}>
                  <div className="field">
                    <label className="label">Write A Review:</label>
                    <div className="control">
                      <input
                        className="input"
                        placeholder="Write A Review Here..."
                        name="text"
                        onChange={inputtingComment}
                        value={formData.text}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Rate it:</label>
                    <div className="control">
                      <input
                        className="input"
                        name="rated"
                        placeholder="Rate Out Of 10.."
                        type="number"
                        onChange={inputtingComment}
                        value={formData.rated}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <h2>{gin.name}</h2>
              <h5>ABV{gin.abv}% - {gin.size}CL</h5>
              <h3>£{gin.price}</h3>
              <button>Add To Cart</button>
              <h4>About:</h4>
              <p>{gin.bio}</p>
              <h4>Origin:</h4>
              <p>{gin.origin}</p>
              <h4>Botanicals:</h4>
              <p>{gin.botanicals}</p>
              <h4>Tasting Notes:</h4>
              <p>{gin.tastingNotes}</p>
              <h4>Perfect G&T:</h4>
              <p>{gin.perfectGt}</p>
            </div>
          </div> 
          
        }
      </div>
    </section>
  )
}

export default GinProfile