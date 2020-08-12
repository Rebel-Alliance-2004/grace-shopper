import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCategoriesThunk } from '../store/actionCreators';


const Categories = ({ categories, getCategories }) => {

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {
        categories &&
        categories.map(category => {
          return (
            <div key={category.id} className='dropList'>
              <Link to={`/categories/${category.name}`} className='navLink'> <h2>{category.name}</h2> </Link>
            </div>
          )
        })
      }
    </div>
  )
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
