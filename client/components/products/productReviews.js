import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getReviewsThunk } from '../../store/reviewThunks'


const ProductReviews = (props) => {
  console.log(props)

  useEffect(() => {
    props.getReviews()
  }, [])

  return (
    props.reviews && props.reviews.filter((review) => review.productId === props.productId)).map((prodReview) => {
      return (
        <div key={prodReview.id}>
          <div style={{ fontWeight: 'bold' }}>{prodReview.reviewTitle}&nbsp;&nbsp;{prodReview.starRating}/5</div>
          <div style={{ textAlign: 'center' }}>&quot;{prodReview.reviewText}&quot;</div>
          <div style={{ textAlign: 'right', fontStyle: 'italic' }}>-{prodReview.User.username}</div>
          <br />
        </div>
      )
    }
    )
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: () => dispatch(getReviewsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews)
