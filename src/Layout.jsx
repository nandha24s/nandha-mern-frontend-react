import React from 'react'
import { Link } from 'react-router-dom'

function Layout() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">         
          <ul className="navbar-nav d-flex gap-4">
            <li className="nav-item">
              <Link to='/add' className="nav-link fw-semibold">Add Student</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link fw-semibold">Student List</Link>
            </li>
            <li className="nav-item">
              <Link to='/update' className="nav-link fw-semibold">Update Student</Link>
            </li>
          </ul>
        
      </div>
    </nav>
  )
}

export default Layout