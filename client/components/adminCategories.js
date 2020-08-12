import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesThunk } from '../store/actionCreators';
import AddCategoryForm from './addCategoryForm';

class AdminCategories extends Component {

  async componentDidMount() {
    await this.props.getCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div style={{padding:'30px'}}>
        <h1 className='title' style={{color:'white'}}>Categories</h1>
        <AddCategoryForm />
        <div style={{margin: 'auto', width:'85%', marginTop:'30px' }} className='box'>
          <h1 className='subtitle'>Select the Category you would like to edit.</h1>
          {categories &&
            categories.map(category => {
              return (
                <div key={category.id} className='box'>
                  <Link to={`/category/${category.id}`} className='title tag is-white is-large'>{category.name}</Link>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);