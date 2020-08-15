/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Flex, Input } from '@chakra-ui/core';
import { getCategoriesThunk, addCategoryThunk } from '../store/actionCreators';

class AddCategoryForm extends Component {
  constructor() {

    super()
    this.state = {
      name: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit() {
    const { name } = this.state;
    const newCat = {
      name,
    }
    this.props.AddCategory(newCat)
    this.setState({
      name: '',
    })
  }

  render() {
    return (
      <div>
        <Flex
          className='form'
          width='100%'
          bg='#4A5568'
          color='white'
          p='1em'
          direction='column'
          align='center'
        >
          <h4 className='subtitle' style={{ color: 'white' }}>Add Category</h4>
          <form>
            <label
              htmlFor='name'
            >
              Category Name:
            </label>
            <Input
              value={this.state.name}
              name='name'
              className='input'
              onChange={this.handleInput}
              m='1em auto'
              bg='#E2E8F0'
              id='name'
            />
            <Button onClick={() => { this.handleSubmit() }} variantColor='green'>Add Category</Button>
          </form>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  AddCategory: (obj) => dispatch(addCategoryThunk(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);