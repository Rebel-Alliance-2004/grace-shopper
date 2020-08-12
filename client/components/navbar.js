import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@chakra-ui/core';
import Categories from './categories';
import { whoami } from '../store/userActions';

const NavBar = ({ whoAmI, user }) => {
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    whoAmI();
    const productsDrop = document.getElementById('productsDrop');
    const dropDown = document.getElementById('dropDown');
    const svg = productsDrop.querySelector('svg');

    productsDrop.addEventListener('mouseenter', () => {
      dropDown.classList.add('showMenu');
      svg.classList.add('rotate');
    });
    productsDrop.addEventListener('mouseleave', () => {
      dropDown.classList.remove('showMenu');
      svg.classList.remove('rotate');
    });
  }, []);

  useEffect(() => {
    if (user.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [user]);

  const burgerDance = () => {
    const menu = document.querySelector('.navContainer');
    const burgers = document.querySelectorAll('#burger>div');
    menu.classList.toggle('showMenu');
    burgers.forEach(burger => burger.classList.toggle('active'))
  }

  return (
    <nav className="" role="navigation" aria-label="main navigation">
      <div className='burgerLogo'>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          role='navigation'
          onKeyPress={() => burgerDance()}
          id='burger'
          onClick={() => burgerDance()}
        >
          <div id='burger1' />
          <div id='burger2' />
          <div id='burger3' />
        </div>
        <div className='navLogo'>
          <Link to="/">Grace&apos;s Hopper</Link>
        </div>
      </div>
      <div className='navContainer'>
        <div className='dropContainer navSection' id='productsDrop'>
          <Link to="/products" className='navLink'>Products <Icon name='chevron-down' className='chevron' /></Link>
          <div className='dropDown' id='dropDown'>
            <Categories />
          </div>
        </div>
        <div className='navSection'>
          {
            isAdmin &&
            <Link to="/admin" className='navLink'>Admin</Link>
          }
          {
            user.role !== 'guest' &&
            <Link to="/profile" className='navLink'>Profile</Link>
          }
          <Link to="/shopping-cart" className='navLink'>Cart</Link>
          <Link to="/login" className='navLink'>{user.username ? 'Log Out' : 'Login'}</Link>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
