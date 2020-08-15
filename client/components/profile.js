import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex, Heading } from '@chakra-ui/core';
import { getUserCartsThunk } from '../store/cartActions';

const UserProfile = (props) => {

  useEffect(() => {
    props.getUserCarts()
  }, []);

  const { carts } = props.cart;
  let archivedCarts;
  if (carts) {
    archivedCarts = carts.filter(cart => cart.completed);
  }

  return (
    <Flex
      p='20px'
      direction='column'
      justify='center'
    >
      {archivedCarts && (
        <div>
          <Flex
            direction='column'
            justify='center'
            textAlign='center'
          >
            <Heading as='h2' size='xl' className='heading' color='white'>Profile Name: {props.user.username}</Heading>
            <Heading as='h4' size='lg' className='heading' color='white'>Previous Orders</Heading>
            <table className='table' style={{ margin: '1em auto' }}>
              <thead>
                <tr>
                  <th>Purchase Date</th>
                  <th>Total Cost</th>
                  <th>Total Products</th>
                  <th>Order Number</th>
                </tr>
              </thead>
              <tbody>
                {archivedCarts.map(cart => {
                  return (
                    <tr key={cart.id}>
                      <td>{new Date(cart.updatedAt).toDateString()}</td>
                      <td>{cart.total}</td>
                      <td>{cart.products.length}</td>
                      <td>{cart.id.slice(0, 8)}</td>
                      <td><button type='button' onClick={() => props.history.push(`/order-details/${cart.id}`)}>View Products</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Flex>
        </div>
      )}
    </Flex>
  )
}

const mapStateToProps = (props) => (props);
const mapDispatchToProps = (dispatch) => ({
  getUserCarts: () => dispatch(getUserCartsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);