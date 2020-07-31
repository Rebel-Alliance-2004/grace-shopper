import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesThunk } from '../store/actionCreators';
import store from '../store/reducer';

class AdminCategories extends Component{
  constructor(){
    super()

    this.state={
      categories: []
    }
  }

  async componentDidMount(){
    await this.props.getCategories();
    this.setState({categories: store.getState().categories})
  }

  render(){
    const { categories } = this.state.categories;
    return(
      <div>
        <h1>Categories</h1>
        <div>
          {categories &&
          categories.map(category => {
              return (
                <div key={category.id}>
                  <Link to={`/admin/category/${category.id}`} className='title tag is-white is-large'>{category.name}</Link>
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