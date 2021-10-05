import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const withBaseModal = (WrappedComponent) => {
  return class BaseModal extends Component {

    static propTypes = {
      toggle: PropTypes.bool,
      onAfterClose: PropTypes.func,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
      ]),
      // Prop type might need to change once we implement a modal with action buttons.
      buttons: PropTypes.arrayOf(PropTypes.node),
      long: PropTypes.bool,
    }

    constructor(props) {
      super(props);

      this.state = {
        opacity: 0,
        previousScrollTop: 0,
      };

      this.afterOpen = this.afterOpen.bind(this);
      this.beforeClose = this.beforeClose.bind(this);
      this.afterClose = this.afterClose.bind(this);
    }

    componentWillUnmount() {
      document.body.classList.remove('modalOpen');
    }

    afterClose() {
      document.body.classList.remove('modalOpen');
      document.body.style.top = '';
      document.documentElement.scrollTop = document.body.scrollTop = this.state.previousScrollTop;

      if (this.props.onAfterClose) {
        this.props.onAfterClose();
      }
    }

    afterOpen() {
      setTimeout(() => {
        this.setState({
          opacity: 1,
          previousScrollTop: (document.documentElement.scrollTop || document.body.scrollTop),
        });

        document.body.style.top = `-${window.pageYOffset}px`;
        document.body.classList.add('modalOpen');
      });
    }

    beforeClose() {
      return new Promise(resolve => {
        this.setState({ opacity: 0 });
        setTimeout(resolve, 200);
      });
    }

    render() {
      return <WrappedComponent
        {...this.props}
        afterOpen={() => this.afterOpen()}
        opacity={this.state.opacity}
        afterClose={() => this.afterClose()}
        beforeClose={() => this.beforeClose()} />;
    }
  };
};
