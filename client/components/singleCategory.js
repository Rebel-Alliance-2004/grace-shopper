import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getCategoriesThunk } from '../store/actionCreators'



class SingleCategory extends PureComponent {

  render() {
    const { match: { params: { name } } } = this.props
    console.log('single category is rendering')
    console.log(name)
    return (
      <>
        <h1>{ name }</h1>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)