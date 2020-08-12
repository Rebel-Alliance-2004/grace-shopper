import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, Heading } from '@chakra-ui/core';
import { getProductsThunk } from '../../store/productThunks'
import { getCategoriesThunk } from '../../store/actionCreators';
import ProductCard from '../productCard'


class SingleCategory extends Component {
  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getCategories()
  }

  render() {
    const { match: { params: { name } }, products, categories } = this.props
    return (
      <Flex
        direction='column'
        align='center'
      >
        <Heading as='h2' size='lg' className='heading' m='1em'>
          {name.toUpperCase()}
        </Heading>
        <Flex
          wrap='wrap'
          justify='center'
        >
          {
            !!products.length && !!categories.length &&
            products.filter(product => product.categoryId === (categories.find(category => category.name === name)).id)
              .map(cProduct => (
                <div key={cProduct.id}>
                  {/* <Link to={`/products/${cProduct.id}`}>{cProduct.name}</Link> */}
                  <ProductCard product={cProduct} />
                </div>
              ))
          }
        </Flex>
      </Flex>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, categories: state.categories }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    getCategories: () => dispatch(getCategoriesThunk()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)