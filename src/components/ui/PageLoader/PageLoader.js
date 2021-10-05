import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components/macro';

const LottieWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color_black_transparent};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;

  &::after {
    background-color: ${props => props.theme.color_white};
    border-radius: 50%;
    content: '';
    height: 12rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12rem;
    z-index: -1;
  }
`;

class PageLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canCancelLoading: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {

      if (!this.props.loading && Date.now() - this.state.startedLoading < 500 ) {
        setTimeout(() => {
          this.setState({ canCancelLoading: true });
        }, 500 - (Date.now() - this.state.startedLoading));
      }

      if (this.props.loading) {
        this.setState({
          startedLoading: Date.now(),
        });
      }
    }
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
       animationData: require('@/markus2.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    if (!this.props.loading && this.state.canCancelLoading) {
      return null;
    }
    else {
      return (
        <LottieWrapper>
          <Lottie
            options={defaultOptions}
            height={150}
            width={150}
          />
        </LottieWrapper>
      );
    }
  }
}

export default PageLoader;
