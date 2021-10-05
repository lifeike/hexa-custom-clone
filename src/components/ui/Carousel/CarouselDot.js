import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { rhythm } from '@/utils/helpers';

const ListItem = styled.li`
  display: inline-block;
  margin: ${rhythm(1)};
`;

const Dot = styled.button`
  background-color: ${props => props.theme.color_darkest};
  border-radius: 50%;
  cursor: pointer;
  height: ${rhythm(1)};
  opacity: ${props => props.position !== props.value ? 0.1 : 1};
  transition: 0.2s all ${props => props.theme.ease_out_quad};
  width: ${rhythm(1)};
`;

export class CarouselDot extends Component {
  static propTypes = {
    index: PropTypes.number,
    position: PropTypes.number,
    changeItem: PropTypes.func,
  };

  render() {
    const { index, changeItem, position } = this.props;

    return (
      <ListItem>
        <Dot
          onClick={() => changeItem(index)}
          value={index}
          role='button'
          tabIndex={0}
          position={position}
        />
      </ListItem>
    );
  }
}
