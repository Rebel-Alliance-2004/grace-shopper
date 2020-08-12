/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/core';
import { getCategoriesThunk } from '../store/actionCreators';
import { addProductThunk } from '../store/productThunks';

class AddProductForm extends Component{
  constructor(){
    
    super()
    this.state={
      name:'',
      price:'',
      description:'',
      categoryId:'',
      categories:[]
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    await this.props.getCategories();
    this.setState({categories: this.props.categories})
  }
  
  handleInput(e){
    this.setState({ [e.target.name]: e.target.value})
  }
  
  handleSubmit(){
    const { name, price, description, categoryId } = this.state;
    const newProduct={
        name,
        price,
        description,
        categoryId
    }
    this.props.addProduct(newProduct)
    this.setState({
        name:'',
        price:'',
        description:'',
        categoryId:''
    })
    
}

  render(){
    const { categories } = this.state;
    return(
      <div>
        <div className='box form' style={{width:'50vw', margin:'auto'}}>
          <h1 className='subtitle'>Add Product</h1>
          <form>
            <label className='label'>
              Product Name:
              <input value={this.state.name} name='name' className='input' onChange={this.handleInput} />
            </label>
            <label className='label'>
              Price:
              <input value={this.state.price} name='price' className='input' onChange={this.handleInput} />
            </label>
            <label className='label'>
              Description:
              <input value={this.state.description} name='description' className='input' onChange={this.handleInput} />
            </label>
            <label className='label'>
              Select Product Category:
              <select name='categoryId' onChange={this.handleInput}>
                <option>Choose a Category</option>
                { categories&&
                  categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <Button onClick={()=>{this.handleSubmit()}} variantColor='green'>Add Product</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  addProduct:(obj) => dispatch(addProductThunk(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);