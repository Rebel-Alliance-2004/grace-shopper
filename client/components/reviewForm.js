import React, { Component } from 'react'
import { connect } from 'react-redux'
import StarRatings from 'react-star-ratings';
import { Image, Heading } from '@chakra-ui/core'
import { getProductsThunk } from '../store/productThunks'
import { createReviewThunk } from '../store/reviewThunks'


class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: props.match.params.prodId,
      starRating: 0,
      reviewTitle: '',
      reviewText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
  }

  handleInputChange({ target }) {
    const { value, name } = target
    this.setState({
      [name]: value,
    })
  }

  changeRating(newRating) {
    this.setState({
      starRating: newRating
    });
  }


  render() {
    const { changeRating, handleInputChange } = this
    const { productId, starRating, reviewText, reviewTitle } = this.state
    const { products, createReview } = this.props
    const product = products.find((prod) => {
      return prod.id === this.props.match.params.prodId
    })
    return (
      <>
        <Heading size='sm'>
          <div id='reviewForm'>
            <div className='heading' style={{ fontSize: '2rem' }}>Write a Product Review</div>
            <br />

            <h1>Product: </h1>
            <form onSubmit={() => createReview(productId, starRating, reviewTitle, reviewText)}>
              <div>{products.length &&
                (
                  <div>
                    {product.name}
                    <Image
                      src={product.imgSrcLg}
                      w='200px'
                      h='200px'
                    />
                  </div>
                )}
              </div>
              <br />
              <br />
              <div>Star Rating</div>
              <StarRatings
                rating={starRating}
                starRatedColor="gold"
                starHoverColor="gold"
                starEmptyColor="gray"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                starDimension='25px'
                starSpacing='3px'
              />
              <br />
              <br />
              <label htmlFor='title'>Review Title <br />
                <input id='title' className='reviewForm' name='reviewTitle' type='text' value={reviewTitle} onChange={handleInputChange} placeholder='Title of your review' />
              </label>
              <br />
              <br />
              <label htmlFor='text'>Review Text <br />
                <textarea id='text' className='reviewForm' rows='4' cols='50' name='reviewText' type='text' value={reviewText} onChange={handleInputChange} placeholder='What did you like or dislike about the product? ' />
              </label>
              <br />
              <br />
              <input className='reviewForm' type='submit' value='Submit Review' />
            </form>
          </div>
        </Heading>
      </>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
  createReview: (productId, starRating, reviewText, reviewTitle) => dispatch(createReviewThunk(productId, starRating, reviewText, reviewTitle))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
