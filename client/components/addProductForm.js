/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoriesThunk } from '../store/actionCreators';

class AddProductForm extends Component{
  constructor(){
    super()

    this.state={
      name:'',
      price:'',
      description:'',
      // category:''
    }
  }

  async componentDidMount(){
    await this.props.getCategories();
    // this.setState({categories: this.props.categories})
  }

  render(){
    // const { categories } = this.state.categories;
    return(
      <div>
        <h1>Add Product</h1>
        <div>
          <label>
            Product Name:
            <input value={this.state.name} />
          </label>
          <label>
            Price:
            <input value={this.state.price} />
          </label>
          <label>
            Description:
            <input value={this.state.description} />
          </label>
          <label>
            <select>
              <option>Choose a Category</option>
            </select>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);