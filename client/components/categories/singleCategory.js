import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesThunk } from '../../store/actionCreators'
import { getProductsThunk } from '../../store/productThunks'
import ProductCard from '../productCard'



class SingleCategory extends Component {

  render() {
    console.log(this.props)
    const { match: { params: { name, id } }, categories, products } = this.props
    console.log(categories, products)
    return (
      <>
        <h1>{name.toUpperCase()}</h1><br />
        <div>
          {products.filter(product => product.categoryId === id).map(cProduct => (
            <div key={cProduct.id}>
              <ProductCard product={cProduct} />
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories, products: state.products }
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  getProducts: () => dispatch(getProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)