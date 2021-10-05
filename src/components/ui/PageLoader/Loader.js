import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

export class Loader extends React.Component {

  static propTypes = {
    delay: PropTypes.number,
    minLoadtime: PropTypes.number,
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.immediate,
      startTime: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.visible && nextProps.loading) {
      this.setState({
        loading: true,
      }, () => {
        this.setState({
          waiting: setTimeout(() => {
            this.showLoader();
          }, this.props.delay || 500),
        });
      });
    }

    if (this.state.visible && !nextProps.loading) {
      const timeLeft = new Date() - this.state.startTime - (this.props.minLoadtime || 500);

      if (timeLeft < 0) {
        setTimeout(() => {
          this.cancelLoader();
        }, Math.abs(timeLeft));
      }
      else {
        this.cancelLoader();
      }
    }
    else if (this.state.waiting) {
      clearTimeout(this.state.waiting);
      this.cancelLoader();
    }
    else {
      this.cancelLoader();
    }
  }

  /**
   * This is called from a set timeout, so make sure we're still valid to show.
   */
  showLoader() {
    if (!this.state.loading) return;

    this.setState({
      visible: true,
      startTime: new Date(),
    });
  }

  cancelLoader() {
    this.setState({
      visible: false,
      start: null,
      waiting: null,
    });
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      // animationData: require('@/pageLoader.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    if (!this.state.visible) {
      return null;
    }
    else {
      return (
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
        />
      );
    }
  }
}
