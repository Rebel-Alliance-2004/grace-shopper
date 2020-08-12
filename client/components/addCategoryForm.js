/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/core';
import { getCategoriesThunk, addCategoryThunk } from '../store/actionCreators';

class AddCategoryForm extends Component{
  constructor(){
    
    super()
    this.state={
      name:'',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInput(e){
    this.setState({ [e.target.name]: e.target.value})
  }
  
  handleSubmit(){
    const { name } = this.state;
    const newCat={
        name,
    }
    this.props.AddCategory(newCat)
    this.setState({
        name:'',
    })
}

  render(){
    return(
      <div>
        <div className='box form' style={{width:'50vw', margin:'auto'}}>
          <h1 className='subtitle'>Add Category</h1>
          <form>
            <label className='label'>
              Category Name:
              <input value={this.state.name} name='name' className='input' onChange={this.handleInput} />
            </label>
            <Button onClick={()=>{this.handleSubmit()}} variantColor='green'>Add Category</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  AddCategory:(obj) => dispatch(addCategoryThunk(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);