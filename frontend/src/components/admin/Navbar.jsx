import React, { useContext } from 'react'
import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
    const {userData} = useContext(AppContext)
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        {/* <img src={} alt="logo" className="w-28 lg:w-32" /> */}
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {userData ? userData.email : "Developers"}</p>
        {userData ? (
          <UserButton />
        ) : (
          <img className="max-w-8" src='' />
        )}
      </div>
    </div>
  )
}

export default Navbar