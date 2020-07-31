import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { whoami } from '../store/actionCreators';

const NavBar = ({ whoAmI, user }) => {
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (user.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [user]);

  return (
    <div>
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/products" className="navbar-item">View All Products</Link>
        <Link to="/cart" className="navbar-item">Cart</Link>
        <Link to="/login" className="navbar-item">Login</Link>
        {isAdmin &&
          <Link to="/admin" className="navbar-item">Admin</Link>}
      </nav>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
