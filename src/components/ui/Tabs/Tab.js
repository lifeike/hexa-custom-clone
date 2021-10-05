import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

const StyledTab = styled.button`
  cursor: pointer;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  font-family: ${props => props.theme.font_family};
  line-height: 1.5;
  margin-right: ${rhythm(3)};

  ${props => props.active && css`
    border-bottom: 0.2rem solid ${props.theme.color_darkest};
  `};

  ${media.md`
    font-size: 2rem;
  `}

  &:active {
    outline: none;
  }
`;

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      label,
      activeTab,
      onClick,
    } = this.props;
    const isActive = activeTab === label;

    return (
      <StyledTab
        active={isActive}
        onClick={() => onClick(label)}
      >
        {label}
      </StyledTab>
    );
  }
}

export default Tab;
