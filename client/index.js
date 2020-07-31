import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset, ColorModeProvider, } from '@chakra-ui/core';
import store from './store';
import {
  ProductList, LoginPage, Cart, NavBar, Categories, Home, AdminConsole, AdminProducts, AdminCategories, EditProduct
} from './components';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <Route render={() => <NavBar />} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/admin" component={AdminConsole} />
            <Route exact path="/admincategories" component={AdminCategories} />
            <Route exact path="/adminproducts" component={AdminProducts} />
            <Route exact path="/adminproduct/:id" component={EditProduct} />
          </Switch>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
