import React from 'react';
import { connect } from 'react-redux';
import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/core';
import LoginForm from './loginForm';
import CreateAccount from './createAccount';

const LoginPage = ({ history, user }) => {
  return (
    <Flex
      minw='100vw'
      minH='90vh'
      align='center'
      justify='center'
    >
      <Box>
        <Tabs variant='enclosed' bg='white'>
          <TabList
            color='black'
          >
            <Tab width={user && user.loggedIn ? '100%' : '50%'}>
              {user && user.loggedIn ? 'Logout' : 'Login'}
            </Tab>
            {
              user && !user.loggedIn ?
                (
                  <Tab width='50%'>
                    Create Account
                  </Tab>
                )
                : null
            }
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <CreateAccount history={history} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(LoginPage);