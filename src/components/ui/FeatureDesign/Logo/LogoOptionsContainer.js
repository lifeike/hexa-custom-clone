import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/Icons/Icon';
import Box from '@/components/ui/Layout/Box/Box';

const Option = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color_white};
  border-bottom: 0.1rem solid ${props => props.theme.color_grey_5};
  border-right: 0.1rem solid ${props => props.theme.color_white};
  color: ${props => props.theme.color_grey_dark_1};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  font-size: 1.6rem;
  height: ${props => props.height || '7.4rem'};
  justify-content: start;
  line-height: 1.27;
  position: relative;
  width: 100%;
`;

const Circle = styled.div`
  align-items: center;
  align-self: start;
  background-color: ${props => props.color || props.theme.color_white};
  border: solid 0.1rem rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  height: 3.2rem;
  justify-content: center;
  margin-top: 1.6rem;
  min-width: 3.2rem;
  width: 3.2rem;
`;

const Checkmark = styled.div`
  display: ${props => props.selected ? 'block' : 'none'};
  margin-top: 0.15rem;
  transform: ${props => props.selected ? 'scale(1)' : 'scale(0)'};
  transition: 0.2s;
`;

export class LogoOptionsContainer extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    color: PropTypes.string,
    label: PropTypes.string,
    inline: PropTypes.bool,
    addPrice: PropTypes.number,
    onOptionSelected: PropTypes.func,
  };

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.onOptionSelected();
    }
  }

  render() {
    const {
      onOptionSelected,
      color,
      selected,
      inline,
      height,
    } = this.props;

    const checkmarkFill = color ? '#fff': '#000';

    return (
      <Option height={height} tabIndex="0" inline={inline} onClick={e => onOptionSelected()} onKeyDown={e => this.onKeyDown(e)}>
        <Circle tabIndex="0" color={color}>
          <Checkmark selected={selected}>
            <Icon size={15.5} name="circleCheck" fill={checkmarkFill} />
          </Checkmark>
        </Circle>
        <Box classes={`${inline ? 'left2 flexgrow1 textLeft flats2 overHidden' : 'sides2'}`}>
          {this.props.children}
        </Box>
      </Option>
    );
  }
}
