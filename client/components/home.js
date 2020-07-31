import React from 'react';
import { connect } from 'react-redux';
import Categories from './categories';

const Home = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <Categories />
    </div>
  )
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);