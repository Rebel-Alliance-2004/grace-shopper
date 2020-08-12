/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Flex, Stack, Input, Button } from '@chakra-ui/core';
import Loading from './loading';
import ProductCard from './productCard';
import { getProductsThunk, sortProductsThunk } from '../store/productThunks';

const ProductList = ({ loading, products, getProducts, sortProducts }) => {
  // this works like componentDidMount
  useEffect(() => {
    getProducts();
  }, []);

  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const showProductsList = () => {
    let productsToShow;
    if (searchResults) {
      productsToShow = searchResults;
    } else if (products.length) {
      productsToShow = products
    } else {
      return <p>Error fetching products</p>
    }

    return productsToShow.map((product) => (
      <div key={product.id}>
        <ProductCard product={product} />
      </div>
    ))
  }

  const handleSort = async (e) => {
    setSortBy(e.target.value)
    products = await sortProducts(e.target.value);
  }

  const handleSearch = () => {
    axios.get(`/search?term=${searchTerm}`)
      .then(({ data }) => setSearchResults(data))
      .catch(console.log)
  }

  return (
    <Flex
      width='100vw'
      minHeight='75vh'
      justify='center'
      align='center'
      direction='column'
    >
      <Stack
        p='1.5em 2em'
        align='center'
      >
        <Flex
          align='center'
        >
          <Input
            placeholder='search products'
            value={searchTerm}
            color='black'
            onChange={(e) => setSearchTerm(e.target.value)}
            m='1em 0.5em'
          />
          <Button
            variantColor="blue"
            size="md"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <label>
          Sort By:
          <select onChange={handleSort} value={sortBy} style={{ color: 'black' }}>
            <option value=''>-- Select --</option>
            <option value='Price High to Low'>Price High to Low</option>
            <option value='Price Low to High'>Price Low to High</option>
            <option value='Name A to Z'>Name A to Z</option>
            <option value='Name Z to A'>Name Z to A</option>
          </select>
        </label>
        <div className='productList'>
          {
            loading ? <Loading /> : showProductsList()
          }
        </div>
      </Stack>
    </Flex>
  );
};

const mapStateToProps = ({ loading, products }) => ({ loading, products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
  sortProducts: (type) => dispatch(sortProductsThunk(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
