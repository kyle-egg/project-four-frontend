import React from 'react'
import axios from 'axios'

function GinProfile() {

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/gins')
      const gins = res.data
      console.log(gins)
    }
    getData()
    
  }, [ ])
  return (
    <section>
      <h1>This is the Gin Profile Page</h1>
    </section>
  )
}

export default GinProfile