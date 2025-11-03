import React, { Suspense, lazy } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav>
        <h1>ElectroGadgets</h1>
        <div>
          <Link to="/" className='link'>Home</Link>
          <Link to="/cart" className='link'>Cart</Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar