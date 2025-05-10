import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'

const Settings = () => {
  return (
    <div>
      <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
        Edit Profile
      </h1>

      <ChangeProfilePicture />

      <EditProfile />
    </div>
  )
}

export default Settings