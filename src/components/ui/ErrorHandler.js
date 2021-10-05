import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ViewportHelper from '@/utils/viewport';
import { resetError } from '@/store/actions/error';
import { priorityError } from '@/store/selectors/errors';

import GeneralErrorModal from '@/components/ui/Modal/GeneralErrorModal';
import ErrorToast from '@/components/ui/Toast/ErrorToast';

class ErrorHandler extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: null,
    };

    this.calculateViewport = debounce(50, this.calculateViewport.bind(this));

    // Clear errors on route change.
    this.props.history.listen(() => {
      this.props.resetError();
    });
  }

  componentDidMount() {
    this.calculateViewport();

    window.addEventListener('resize', this.calculateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateViewport);
  }

  calculateViewport() {
    this.setState({
      viewport: ViewportHelper.getViewportAbbreviation(),
    });
  }

  render() {
    const {errorMessage, resetError} = this.props;

    if (!this.state.viewport || !errorMessage) return null;

    if (this.state.viewport === 'sm') {
      return <GeneralErrorModal errorMessage={errorMessage} onAfterClose={() => resetError()} />;
    }

    return <ErrorToast errorMessage={errorMessage} onAfterClose={() => resetError()} />;

  }
}

const mapStateToProps = state => ({
  errorMessage: priorityError(state),
});

const mapDispatchToProps = dispatch => ({
  resetError: () => dispatch(resetError()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorHandler));
