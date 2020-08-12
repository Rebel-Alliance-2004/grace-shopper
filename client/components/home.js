import React from 'react';
import { connect } from 'react-redux';

const Home = () => {
  return (
    <div className='homeHeroImg' />
  )
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);