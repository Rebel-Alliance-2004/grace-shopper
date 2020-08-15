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
        <>
          <div style={{ fontWeight: 'bold' }}>{prodReview.reviewTitle}</div>
          <div style={{ textAlign: 'center' }}>&quot;{prodReview.reviewText}&quot;</div>
          <br />
        </>
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
