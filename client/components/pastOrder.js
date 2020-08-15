import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Button } from '@chakra-ui/core'
import { getUserCartsThunk } from '../store/cartActions';
import { getReviewsThunk } from '../store/reviewThunks';


const PastOrder = (props) => {
  useEffect(() => {
    props.getUserCarts()
  }, []);

  useEffect(() => {
    props.getReviews()
  }, []);

  const { carts } = props.cart;
  const { reviews, user } = props;


  const userReview = (id) => {
    const review = reviews.find((rev) => {
      return rev.productId === id && rev.UserId === user.id
    })

    return review ? `"${review.reviewText}"` : null
  }

  let archivedCart;
  if (carts) {
    archivedCart = carts.filter(cart => cart.completed && cart.id === props.match.params.id);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='title' style={{ color: 'white' }}> Order Number: {carts && archivedCart[0].id.slice(0, 8)}</h1>
      <table className='table' style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Your Reviews</th>
          </tr>
        </thead>
        <tbody>
          {archivedCart &&
            archivedCart[0].products.map(prod => {
              return (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td><Image
                    src={prod.imgSrcLg}
                    size='small'
                    maxH='100px'
                    maxW='100px'
                  />
                  </td>
                  <td>${prod.price}</td>
                  <td>{prod.description}</td>
                  <td>{(reviews && reviews.length && userReview(prod.id)) || <Link to={`/review/${user.id}/${prod.id}`}><Button variantColor="green">Write a review</Button></Link>}
                  </td>
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
  getReviews: () => dispatch(getReviewsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrder);