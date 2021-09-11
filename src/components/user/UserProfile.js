import { userProfile } from '../../lib/api'
import React from 'react'

function UserProfile() {

  React.useEffect(() => {
    const getData = async () => {
      const res = await userProfile()
      console.log(res.data)
    }
    getData()
    
  }, [ ])

  return (
    <section>
      <h1>This is User Profile</h1>
    </section>

  )
}
export default UserProfile