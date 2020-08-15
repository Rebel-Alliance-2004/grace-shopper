import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset, } from '@chakra-ui/core';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from './store';
import {
  ProductList, LoginPage, CartPage, NavBar, Categories, Home, AdminConsole, AdminProducts, AdminCategories, EditProduct, SingleCategory, EditCategory, SingleProduct, Checkout, PaymentSuccess, ReviewForm, UserProfile, PastOrder
} from './components';

const stripePromise = loadStripe('pk_test_51HBl7cDJ4hFgM3mecqwVKLMDofr5OYg5kaECgABQGdBTqz85lvnr1dQJYT9lgXVzFX7m9okowsxgUKg6XYYwxbjv007Hensznt');

const App = () => (
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <ThemeProvider>
          <CSSReset />
          <Route render={() => <NavBar />} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shopping-cart" component={CartPage} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/admin" component={AdminConsole} />
            <Route exact path="/checkout/:id" component={Checkout} />
            <Route exact path="/success" component={PaymentSuccess} />
            <Route exact path="/review/:userId/:prodId" component={ReviewForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/order-details/:id" component={PastOrder} />
            <Route exact path="/categories/:name" component={SingleCategory} />
            <BrowserRouter
              basename='/admin'
            >
              <Route exact path="/categories" component={AdminCategories} />
              <Route exact path="/products" component={AdminProducts} />
              <Route exact path="/product/:id" component={EditProduct} />
              <Route exact path="/category/:id" component={EditCategory} />
            </BrowserRouter>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </Elements>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
