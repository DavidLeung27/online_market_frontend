import React from 'react'
import { Link } from 'react-router-dom'

function ProfileHeader() {
  return (
    <div>
        <Link to="/">DAVID LEUNG</Link>
        <Link to="/">ABOUT ME</Link>
        <Link to="/">RESUME</Link>
        <Link to="/">PROJECT</Link>
        <Link to="/">CONTACT</Link>
    </div>
  )
}

export default ProfileHeader