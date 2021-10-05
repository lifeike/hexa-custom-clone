import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../utils/constants/constants';

function Home(props) {
  return (<Redirect to = {ROUTES.ORDERS} />);
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps)(Home);
