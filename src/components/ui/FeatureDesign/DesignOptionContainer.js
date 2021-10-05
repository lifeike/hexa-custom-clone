import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import media from '@/utils/media';
import Icon from '@/components/ui/Icons/Icon';
import Box from '@/components/ui/Layout/Box/Box';

const Option = styled.button`
  align-items: center;
  background-color: ${props => props.theme.color_grey_1};
  border-right: 0.1rem solid ${props => props.theme.color_white};
  color: ${props => props.theme.color_grey_dark_1};
  display: flex;
  flex-direction: column;
  font-size: 11px;
  height: 10.2rem;
  line-height: 1.27;
  outline: none;
  padding: 1rem;
  position: relative;
  min-width: 6.6rem;

  ${media.md`
    border-bottom: 0.1rem solid ${props => props.theme.color_white};
    justify-content: center;
    padding: 0;
    width: 8.4rem;

    &:focus,
    &:active {
      z-index: 10;
      outline: auto;
    }
  `}

  ${media.lg`
    width: 10.9rem;
  `}
`;

const InlineOption = styled(Option)`
  flex-grow: 1;

  ${media.md`
    background-color: ${props => props.theme.color_white};
    border-bottom: 0.1rem solid ${props => props.theme.color_grey_5};
    flex-direction: row;
    font-size: 1.6rem;
    height: ${props => props.height || '7.4rem'};
    justify-content: start;
    width: 100%;

    &:first-child {
      border-top: 0.1rem solid ${props => props.theme.color_grey_5};
    }
  `}
`;

const Circle = styled.div`
  align-items: center;
  background-color: ${props => props.color || props.theme.color_white};
  border: solid 0.1rem rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  height: 3.2rem;
  justify-content: center;
  min-height: 3.2rem;
  min-width: 3.2rem;
  width: 3.2rem;
`;

const Checkmark = styled.div`
  display: ${props => props.selected ? 'block' : 'none'};
  margin-top: 0.15rem;
  transform: ${props => props.selected ? 'scale(1)' : 'scale(0)'};
  transition: 0.2s;
`;

const OutOfInventoryIcon = styled(Icon)`
  position: absolute;
  right: 0.2rem;
  top: 0;

    ${media.md`
      right: 0.4rem;
      top: 0.4rem;
    `}
`;

export class DesignOptionContainer extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    inline: PropTypes.bool,
    addPrice: PropTypes.number,
    onOptionSelected: PropTypes.func,
  };

  render() {
    const {
      onOptionSelected,
      color,
      selected,
      inline,
      height,
      outOfInventory,
    } = this.props;

    const checkmarkFill = color ? '#fff': '#000';

    const OptionStyle = inline ? InlineOption : Option;

    return (
      <OptionStyle
        height={height}
        inline={inline}
        onClick={onOptionSelected}
      >
        <Circle color={color}>
          <Checkmark selected={selected}>
            <Icon size={15.5} name="circleCheck" fill={checkmarkFill} />
          </Checkmark>
        </Circle>
        <Box classes={`sides2 ${inline ? 'flexgrow1 textLeft flats1 flats2Md' : ''}`}>
          {this.props.children}
        </Box>
        {outOfInventory &&
          <OutOfInventoryIcon size={16} name="fabricOutOfInventory" />
        }
      </OptionStyle>
    );
  }
}
