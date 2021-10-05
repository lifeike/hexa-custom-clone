import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import AccountApi from '@/services/accountService';
import StyleApi from '@/services/styleService';
import GroupApi from '@/services/GroupService';
import AuthApi from '@/services/authService';
import LogoApi from '@/services/logoService';

const AccountService = new AccountApi();
const StyleService = new StyleApi();
const GroupService = new GroupApi();
const AuthService = new AuthApi();
const LogoService = new LogoApi();

function configureStore(initialState={}) {
  const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) || compose;

  return createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ AccountService, StyleService, GroupService, AuthService, LogoService }))
  ));
}

const theStore = configureStore();

export { theStore as Store };
