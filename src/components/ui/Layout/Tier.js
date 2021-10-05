import styled from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';
import PropTypes from 'prop-types';
import ColorPropTypes from '../PropTypes/ColorPropTypes';
import React, { Component } from 'react';

export const Tier = styled.div`
  flex-grow: ${props => props.height === 'full' ? '1': '0'};
  height: ${props => props.height === 'full' ? '100%': 'auto'};
  padding: ${props => rhythm(props.tierSize || 4)} 0;

  ${media.md`
    background-color: ${props => props.theme[props.color]};
    padding: ${rhythm(5)} 0;
  `}
`;

export const withTier = (WrappedComponent) => {
  return class WithTier extends Component {
    static propTypes = {
      tierSize: PropTypes.oneOf([
        1,2,3,4,5,6,7,8,9,10,
      ]),
      color: ColorPropTypes,
      height: PropTypes.oneOf([
        'full',
      ]),
    }

    render() {
      const {size, color, height } = this.props;

      return (
        <Tier tierSize={size} color={color} height={height}>
          <WrappedComponent {...this.props} />
        </Tier>
      );
    }
  };
};
