import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { getUserCartsThunk } from '../store/cartActions';

const PastOrder = (props)=>{

  useEffect(() => {
    props.getUserCarts()
  }, []);
  
  const { carts } = props.cart;
  let archivedCart;
  if(carts){
    archivedCart = carts.filter(cart=> cart.completed && cart.id===props.match.params.id) ;
  }

  return(
    <div style={{padding:'20px'}}>
      <h1 className='title' style={{color: 'white'}}> Order Number: {archivedCart[0].id.slice(0,8)}</h1>
      <table className='table' style={{margin:'auto'}}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {archivedCart &&
          archivedCart[0].products.map(prod=>{
            return (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (props) => (props);
const mapDispatchToProps = (dispatch) => ({
  getUserCarts: () => dispatch(getUserCartsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrder);