import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoading } from '@/store/selectors/loading';
import { Theme } from '@/components/styles/Theme';
import { ThemeProvider } from 'styled-components';
import BaseStyles from '@/components/styles/BaseStyles';
import Layout from '@/layouts/Layout/Layout';
import PageLoader from '@/components/ui/PageLoader/PageLoader';
import ReactGA from 'react-ga';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(process.env.REACT_APP_GA, {
      debug: false,
    });
  }

  componentDidMount() {
    console.log('MH_072921');
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div className="App">
          <PageLoader loading={this.props.loading}/>
          <BaseStyles />
          <Layout history={this.history}/>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: isLoading(state),
  };
};

export default connect(mapStateToProps)(App);
