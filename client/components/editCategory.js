/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/core';
import { getCategoriesThunk } from '../store/actionCreators';
import { deleteCategoryThunk, updateCategoryThunk } from '../store/categoryThunks';

class EditCategory extends Component {
  constructor() {
    super()

    this.state = {
      id: '',
      name: '',
    }
  }

  async componentDidMount() {
    await this.props.getCategories();
    const { categories } = this.props;
    const categoryId = this.props.match.params.id;
    const category = await categories.find(cat => cat.id === categoryId);
    this.setState({
      id: category.id,
      name: category.name,
    })
  }

  render() {
    const { id, name } = this.state;
    const { history } = this.props;
    return (
      <div style={{padding:'30px'}}>
        <h1 className='title' style={{color:'white'}}>Edit {name}</h1>
        <div>
          {
            name && (
              <div>
                <label className='subtitle' style={{color:'white'}}>
                  Name:
                  <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} className='input' style={{width:'50%'}} />
                </label>
                <Button onClick={() => this.props.updateCategory(id, name, history)} variantColor='green'>Save Changes</Button>
                <Button onClick={() => this.props.deleteCategory(id, history)} variantColor='red'>Delete Category</Button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  updateCategory: (id, name, history ) => dispatch(updateCategoryThunk(id, name, history)),
  deleteCategory: (id, history) => dispatch(deleteCategoryThunk(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);