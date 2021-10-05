import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { ROUTES } from '@/utils/constants/constants';
import { restoreUser } from '@/store/actions/account';

class CheckAuthentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authLoaded: false,
    };

    this.props.restoreUser().then(() => {
      this.setState({
        authLoaded: true,
      });
    });
  }

  render() {
    const { account } = this.props;

    if (account && account.user && account.user.isLoggedIn) {
      return this.props.children;
    }
    else {
      if (this.state.authLoaded) {
        return (
          <Redirect to={ROUTES.LOGIN} />
        );
      }
      else {
        return (<></>);
      }
    }
    // return this.props.children;
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  restoreUser: () => dispatch(restoreUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckAuthentication));
