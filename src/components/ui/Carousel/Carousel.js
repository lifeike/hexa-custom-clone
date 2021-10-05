import React, { Component, Children } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import media from '@/utils/media';
import { Swipeable as SwipeableBase } from 'react-swipeable';

import { CarouselDot } from './CarouselDot';
import { CarouselArrow } from './CarouselArrow';

const CarouselWrapper = styled.ul`
  display: flex;
  height: 100%;
  transition: ${props => props.sliding ? 'none' : 'transform 0.5s ' + props.theme.ease_out_quad};
  transform: ${props => `translateX(-${props.position * 100}%) translateZ(0)`};
`;

const CarouselViewport = styled.div`
  height: calc(100vh - 20rem);
  max-height: 1000px;
  position: relative;
  width: 100%;

  ${media.md`
    height: calc(100vh - 36rem);

    ${props => props.editor && css`
      height: calc(100vh - 22rem);
    `}
  `}

  ${props => props.editor && css`
    height: calc(100vh - 22rem);
  `}
`;

const CarouselItem = styled.li`
  flex: 1 0 100%;
  flex-basis: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CarouselButtonList = styled.ul`
  bottom: 2rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
`;

// const Swipeable = styled(SwipeableBase)`
//   overflow: hidden;
//   height: 100%;
//   margin-top: -2rem;

//   ${media.md`
//     height: calc(100% - 9rem);
//   `}
// `;
const Swipeable = styled.ul`
  overflow: hidden;
  height: 100%;
  margin-top: -2rem;

  ${media.md`
    height: calc(100% - 9rem);
  `}
`;
export class Carousel extends Component {

  static propTypes = {
    children: PropTypes.node,
    positionDefault: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      isSliding: false,
      isEditor: window.location.pathname.includes('edit'),
      direction: 'next',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.positionDefault !== prevProps.positionDefault && this.props.positionDefault !== undefined) {
      this.setState({
        position: this.props.positionDefault,
      });
    }
  }

  nextSlide() {
    const { position } = this.state;

    if (this.canMoveForward()) {
      this.navigateToSlide(position + 1);
    }
  }

  previousSlide() {
    const { position } = this.state;

    if (this.canMoveBackward()) {
      this.navigateToSlide(position - 1);
    }
  }

  canMoveForward() {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    return position < numItems - 1;
  }

  canMoveBackward() {
    const { position } = this.state;

    return position > 0;
  }

  navigateToSlide(idx) {
    this.setState({
      position: idx,
    });
  }

  handleSwipe(isNext) {
    if (isNext) {
      this.nextSlide();
    } else {
      this.previousSlide();
    }
  }

  renderItems() {
    const { position } = this.state;
    const isEditor = window.location.pathname.includes('edit');

    return Children.map(this.props.children, (item, index) => {
      const childWithProps = React.cloneElement(item, {
        visible: position === index,
      });

      return (
        <CarouselItem key={index} editor={isEditor}>
          {childWithProps}
        </CarouselItem>
      );
    });
  }

  renderDots() {
    const { position } = this.state;

    return Children.map(this.props.children, (item, index) => {
      return (
        <CarouselDot key={index} index={index} changeItem={(index) => this.navigateToSlide(index)} position={position} />
      );
    });
  }

  render() {
    const { position } = this.state;
    const isEditor = window.location.pathname.includes('edit');

    return (
      <CarouselViewport height={this.props.calculatedHeight} editor={isEditor}>
        <CarouselArrow
          direction="previous"
          changeItem={() => this.previousSlide()}
          description="Previous"
          hasMore={() => this.canMoveBackward()} />
        <CarouselArrow
          direction="next"
          changeItem={() => this.nextSlide()}
          description="Next"
          hasMore={() => this.canMoveForward()} />
        <Swipeable
          onSwipedLeft={() => this.nextSlide()}
          onSwipedRight={() => this.previousSlide()}
          preventDefaultTouchmoveEvent={true}
          trackMouse={true}>
          <CarouselWrapper position={position}>
            {this.renderItems()}
          </CarouselWrapper>
        </Swipeable>
        <CarouselButtonList>
          {this.renderDots()}
        </CarouselButtonList>
      </CarouselViewport>
    );
  }
}
