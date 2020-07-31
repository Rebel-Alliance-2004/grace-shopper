import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddProductForm from './addProductForm';

class AdminConsole extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Admin Console!</h1>
        <AddProductForm />
        <h3>Please select the element you would like to modify:</h3>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/Products">Products</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminConsole);