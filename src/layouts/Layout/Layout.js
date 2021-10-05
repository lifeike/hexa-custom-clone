import React from 'react';
import { routes, authenticatedRoutes } from '@/config/routes';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components/macro';
import { ROUTES } from '@/utils/constants/constants';
import AppData from '@/components/ui/Data/AppData';

import ModalOverlay from '@/components/ui/Modal/ModalOverlay';
import Nav from '@/components/ui/Nav/Nav';
import Footer from '@/components/ui/Footer/Footer';
import CheckAuthentication from '@/components/ui/CheckAuthentication/CheckAuthentication';
import ErrorHandler from '@/components/ui/ErrorHandler';
import ServerError from '@/pages/Errors/ServerError';
import GAListener from '../../components/GaListener';
import AccountError from '@/components/ui/Account/AccountError';

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  flex-direction: column;
  display: flex;
`;

export default function Layout() {
  return (
    <ModalOverlay>
      <AppContainer>
        <Router>
          <GAListener>
            <>
              <header className="App-header">
                <Nav />
              </header>
                <>
                  <ServerError>
                    <Switch>
                      {authenticatedRoutes.map((route, i) => (
                        <AuthHelper
                          key={i}
                          exact={route.exact}
                          path={route.path}
                          component={route.component}
                        />
                      ))}
                      {routes.map((route, i) => (
                        <PublicHelper
                          key={i}
                          exact={route.exact}
                          path={route.path}
                          component={route.component}
                        />
                      ))}
                    </Switch>
                    <ErrorHandler />
                  </ServerError>
                </>
                <Footer hideFooterPath={ROUTES.EDIT} />
            </>
          </GAListener>
        </Router>
        <AccountError/>
      </AppContainer>
    </ModalOverlay>
  );
}

const AuthHelper = ({component: Component, ...rest}) => (
  <Route {...rest} render={(matchProps) => (
    <CheckAuthentication authenticated>
      <Main>
        <AppData />
        <Component {...matchProps} />
      </Main>
    </CheckAuthentication>
  )}/>
);


const PublicHelper = ({component: Component, ...rest}) => (
  <Route {...rest} render={(matchProps) => (
    <Main>
      <Component {...matchProps} />
    </Main>
  )}/>
);
