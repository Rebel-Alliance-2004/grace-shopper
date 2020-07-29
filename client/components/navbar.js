import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className='navbar is-light' role="navigation" aria-label="main navigation">
        <Link to='/' className='navbar-item'>Home</Link>
        <Link to='/categories' className='navbar-item'>Shop By Category</Link>
        <Link to='/products' className='navbar-item'>View All Products</Link>
        <Link to='/musicians' className='navbar-item'>Rent a Musician</Link>
        <Link to='/cart' className='navbar-item'>Cart</Link>
        <Link to='/login' className='navbar-item'>Login</Link>
        <Link to='/signup' className='navbar-item'>Sign Up</Link>
      </nav>
    </div>
  );
};

export default NavBar;
