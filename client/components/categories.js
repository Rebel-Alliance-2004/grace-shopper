import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesThunk } from '../store/actionCreators';

const Categories = ({ categories, getCategories }) => {
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h2>Shop By Our Categories</h2>
      { categories.categories &&
        categories.categories.map(category => {
          return (
            <div key={category.id} className="box">
              <Link to={`/categories/${category.name}`}> { category.name } </Link>
            </div>
          );
        }) }
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
});
const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategoriesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
