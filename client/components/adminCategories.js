import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/core';
import { getCategoriesThunk } from '../store/actionCreators';
import AddCategoryForm from './addCategoryForm';

class AdminCategories extends Component {

  async componentDidMount() {
    await this.props.getCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <Flex
        p='2em'
        direction='column'
        align='center'
        textAlign='center'
      >
        <Flex
          direction='column'
          bg='#2D3748'
          p='1em'
          w='xl'
        >
          <Heading as='h2' size='xl' className='heading' color='white'>Categories</Heading>
          <AddCategoryForm />
          <Flex
            direction='column'
            color='white'
          >
            <Heading as='h4' size='md' color='white' m='1em'>Select the Category you would like to edit.</Heading>
            {categories &&
              categories.map(category => {
                return (
                  <Flex
                    key={category.id}
                    direction='column'
                    align='center'
                    bg='#4A5568'
                    p='0.5em'
                  >
                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                  </Flex>
                )
              })}
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);