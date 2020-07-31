import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminConsole extends Component{

  render(){
    return(
      <div>
        <h1>Welcome to the Admin Console!</h1>
        <h3>Please select the element you would like to modify:</h3>
        <Link to="/admincategories">Categories</Link>
        <Link to="/adminproducts">Products</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminConsole);