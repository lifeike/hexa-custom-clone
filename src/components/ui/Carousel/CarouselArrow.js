import React, { Component } from 'react';
import styled  from 'styled-components/macro';
import PropTypes from 'prop-types';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

import Icon from '@/components/ui/Icons/Icon';

const Arrow = styled.button`
  bottom: 0.3rem;
  display: none;
  left: ${props => props.direction === 'previous' ? rhythm(3) : 'auto'};
  opacity: ${props => props.hasMore() ? 1 : 0.1};
  position: absolute;
  right: ${props => props.direction === 'next' ? rhythm(3) : 'auto'};
  top: 0.3rem;
  transform: ${props => props.direction === 'previous' ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: 0.2s all ${props => props.theme.ease_out_quad};
  z-index: 10;

  ${media.md`
    display: block;
  `};

`;

export class CarouselArrow extends Component {
  static propTypes = {
    changeItem: PropTypes.func,
    hasMore: PropTypes.func,
    direction: PropTypes.oneOf([
      'next',
      'previous',
    ]).isRequired,
  };

  handleChange(e) {
    e && e.preventDefault();

    this.props.changeItem();
  }

  render() {
    const {description, direction, hasMore} = this.props;

    return (
      <Arrow
        onClick={e => this.handleChange(e)}
        role="button"
        direction={direction}
        hasMore={hasMore}
      >
        <Icon size={40} name="chevron"></Icon>
        <div className="visuallyHidden">{description}</div>
      </Arrow>
    );
  }
}
