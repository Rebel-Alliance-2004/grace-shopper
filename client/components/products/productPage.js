import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex, Image, Heading, Button, Input, useToast, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import { addToCartThunk } from '../../store/cartActions'
import ProductReviews from './productReviews'
import { getCategoriesThunk } from '../../store/actionCreators'

const ProductPage = ({ product, addToCart, categories, getCategories }) => {
  const [quantity, setQuantity] = useState(1);

  const toast = useToast();
  const handleAddToCart = (e, productId, qty) => {
    e.preventDefault();
    addToCart(productId, qty);
    toast({
      title: `${product.name}`,
      description: "added to cart",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: 'bottom'
    })
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryName = !!categories && !!categories.length && categories.find(c => c.id === product.categoryId).name;

  return (
    <>
      <Breadcrumb
        style={{
          color: 'white',
          backgroundColor: '#1a202c'
        }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/${categoryName}`}>{categoryName}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        direction='column'
        align='center'
      >
        <Flex
          justify='center'
          m='2em'
          wrap='wrap'
        >
          <Flex m='1em'>
            <Image
              src={product.imgSrcLg}
              w={['300px', '300px', '400px', '400px']}
              h={['300px', '300px', '400px', '400px']}
            />
          </Flex>
          <Flex
            w={['300px', '300px', '400px', '400px']}
            bg='#2D3748'
            m='1em'
            direction='column'
            justifyContent='space-between'
            p='1em'
          >
            <Heading
              as='h2'
              size='lg'
              className='heading'
              textAlign='center'
              marginBottom='1em'
            >
              {product.name}
            </Heading>
            <p>
              {product.description}
            </p>
            <Flex
              justify='space-between'
              align='center'
            >
              <Flex
                align='center'
                justify='center'
                m='1em'
                w={['300px', '300px', '400px', '400px']}
              >
                <Heading as='h4' size='lg'>
                  ${+product.price}
                </Heading>
              </Flex>
              <Flex
                justify='center'
                align='center'
              >
                <Input
                  size={['xs', 'sm']}
                  width='3em'
                  textAlign='center'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  color='black'
                  placeholder='1'
                  m={['0.5em', '1em']}
                />
                <Button
                  variantColor="green"
                  size={['md', 'md', 'lg']}
                  p='0.5em 0.25em'
                  onClick={(e) => handleAddToCart(e, product.id, quantity)}
                >
                  Add to Cart
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify='center'
          align='center'
          w={['400px', '400px', '400px', 'calc(800px + 2em)']}
          bg='#2D3748'
          m='1em'
          direction='column'
          justifyContent='space-between'
          p='1em'
        >
          <Heading
            as='h2'
            size='lg'
            className='heading'
            textAlign='center'
            marginBottom='1em'
          >
            Product Reviews
          </Heading>
          <ProductReviews productId={product.id} />
        </Flex>
      </Flex>
    </>
  );
}

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity)),
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);