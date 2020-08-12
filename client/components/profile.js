import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {getUserCartsThunk} from '../store/cartActions';

const UserProfile = (props)=>{

  useEffect(() => {
    props.getUserCarts()
  }, []);

  const { carts } = props.cart;
  let archivedCarts;
  if(carts){
    archivedCarts = carts.filter(cart=> cart.completed);
  }

  return (
    <div style={{padding:'20px'}}>
      {archivedCarts && (
      <div>
        <div>
          <h1 className='title' style={{color: 'white'}}>Profile Name: {props.user.username}</h1>
          <h1 className='subtitle' style={{color:'white'}}>Previous Orders</h1>
          <table className='table' style={{margin:'auto'}}>
            <thead>
              <tr>
                <th>Purchase Date</th>
                <th>Total Cost</th>
                <th>Total Products</th>
                <th>Order Number</th>
              </tr>
            </thead>
            <tbody>
              {archivedCarts.map(cart=>{
            return (
              <tr key={cart.id}>
                <td>{new Date(cart.updatedAt).toDateString()}</td>
                <td>{cart.total}</td>
                <td>{cart.products.length}</td>
                <td>{cart.id.slice(0,8)}</td>
                <td><button type='button' onClick={()=>props.history.push(`/order-details/${cart.id}`)}>View Products</button></td>
              </tr>
            )
          })}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </div>
  )
}

const mapStateToProps = (props) => (props);
const mapDispatchToProps = (dispatch) => ({
  getUserCarts: () => dispatch(getUserCartsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);