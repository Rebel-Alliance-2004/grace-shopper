import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminConsole extends Component {
  render() {
    return (
      <div style={{margin: 'auto', width:'40%', marginTop:'30px' }} className='box'>
        <h1 className='title'>Welcome to the Admin Console!</h1>
        <h3 className='subtitle'>Please select the element you would like to modify:</h3>
        <div style={{display:'flex', flexDirection:'row', margin:'auto'}}>
          <div className='box' style={{ marginRight:'40px', backgroundColor:'rgb(87,159,110)'}}>
            <Link to="/admin/categories" className='subtitle' style={{color:'white'}}>Categories</Link>
          </div>
          <div className='box' style={{height:'4.2rem', backgroundColor:'rgb(87,159,110)'}}>
            <Link to="/admin/Products" className='subtitle' style={{color:'white'}}>Products</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminConsole);