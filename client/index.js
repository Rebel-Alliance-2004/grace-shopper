import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import store from './store';
import {
  ProductList, LoginForm, Cart, NavBar,
} from './components';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <Route render={() => <NavBar />} />
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/categories" />
            <Route exact path="/musicians" />
          </Switch>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
