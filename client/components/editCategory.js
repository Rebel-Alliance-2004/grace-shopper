/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Flex, Heading, Input } from '@chakra-ui/core';
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
      <Flex
        direction='column'
        align='center'
        w='100vw'
        p='1em'
      >
        <Flex
          m='2em'
          direction='column'
          align='center'
          bg='#2D3748'
          w='xl'
          p='1em'
        >
          <Heading
            as='h2'
            className='heading'
          >
            Edit {name}
          </Heading>
          <div>
            {
              name && (
                <div>
                  <label className='subtitle' style={{ color: 'white' }}>
                    Name:
                    <Input
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      className='input'
                      marginBottom='1em'
                      bg='#E2E8F0'
                    />
                  </label>
                  <Flex
                    justifyContent='center'
                  >
                    <Button
                      onClick={() => this.props.updateCategory(id, name, history)}
                      variantColor='green'
                      size='sm'
                      m='0 1em'
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => this.props.deleteCategory(id, history)}
                      variantColor='red'
                      size='sm'
                      m='0 1em'
                    >
                      Delete Category
                    </Button>
                  </Flex>
                </div>
              )
            }
          </div>
        </Flex>
      </Flex>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  updateCategory: (id, name, history) => dispatch(updateCategoryThunk(id, name, history)),
  deleteCategory: (id, history) => dispatch(deleteCategoryThunk(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);