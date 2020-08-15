/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Flex, Input } from '@chakra-ui/core';
import { getCategoriesThunk } from '../store/actionCreators';
import { addProductThunk } from '../store/productThunks';

class AddProductForm extends Component {
  constructor() {

    super()
    this.state = {
      name: '',
      price: '',
      description: '',
      categoryId: '',
      categories: [],
      imgSrcSm:'',
      imgSrcLg:''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getCategories();
    this.setState({ categories: this.props.categories })
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit() {
    const { name, price, description, categoryId, imgSrcSm, imgSrcLg } = this.state;
    const newProduct = {
      name,
      price,
      description,
      categoryId,
      imgSrcLg,
      imgSrcSm
    }
    this.props.addProduct(newProduct)
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryId: '',
      imgSrcLg:'',
      imgSrcSm:''
    })

  }

  render() {
    const { categories } = this.state;
    return (
      <div style={{ margin: '1em' }}>
        <Flex
          className='form'
          width='100%'
          bg='#4A5568'
          color='white'
          p='1em'
          direction='column'
          align='center'
        >
          <h4 className='subtitle' style={{ color: 'white' }}>Add Product</h4>
          <form>
            <label>
              Product Name:
            </label>
            <Input value={this.state.name} name='name' className='input' onChange={this.handleInput} />
            <label>
              Price:
            </label>
            <Input value={this.state.price} name='price' className='input' onChange={this.handleInput} />
            <label>
              Description:
            </label>
            <Input
              value={this.state.description}
              name='description'
              className='input'
              onChange={this.handleInput}
            />
            <label>
              Small Image URL:
            </label>
            <Input
              value={this.state.imgSrcSm}
              name='imgSrcSm'
              className='input'
              onChange={this.handleInput}
            />
            <label>
              Large Image URL:
            </label>
            <Input
              value={this.state.imgSrcLg}
              name='imgSrcLg'
              className='input'
              onChange={this.handleInput}
            />
            <label>
              Select Product Category:
              <select name='categoryId' onChange={this.handleInput} style={{ color: 'black', margin: '1em' }}>
                <option value=''>Choose a Category</option>
                {categories &&
                  categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <div>
              <Button onClick={() => { this.handleSubmit() }} variantColor='green'>Add Product</Button>
            </div>
          </form>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  addProduct: (obj) => dispatch(addProductThunk(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);