import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import PropTypes from 'prop-types';
import media from '@/utils/media';

import Typography from '@/components/ui/Typography/Typography';

const Toggle = styled.button`
  background-color: ${props => props.theme.color_grey_5};
  border-radius: 1rem;
  height: 2rem;
  left: 0;
  margin: 0 .6rem;
  position: relative;
  width: 3.7rem;
  z-index: 20;

  &::after {
    background-color: ${props => props.theme.color_darkest};
    border-radius: .8rem;
    content: '';
    height: ${rhythm(2)};
    left: ${props => props.left ? '.2rem' : '1.9rem'};
    position: absolute;
    top: .2rem;
    transition: left .2s ${props => props.theme.ease_out_quad};
    width: ${rhythm(2)};
  }
`;

const GenderInitial = styled(Typography)`
  font-size: 1.4rem;
  ${props => props.left ? 'left: -1.6rem;' : 'right: -1.6rem;'}
`;

const GenderToggleWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;

const PreviewText = styled.span`
  color: ${props => props.theme.color_grey_dark};
  display: block;
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  line-height: 1.45;
  padding-right: 0.8rem;

  ${media.mobileLg`
    display: inline-block;
  `}
`;

class GenderToggle extends Component {
  static propTypes = {
    onChangeGender: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isFemale: false,
    };
  }

  handleGenderToggle() {
    this.setState({ isFemale: !this.state.isFemale }, () => {
      this.props.onChangeGender(this.state.isFemale ? 'W': 'M');
    });
  }

  render() {

    const { isFemale} = this.state;
    const { showPreviewText } = this.props;

    return (
      <div>
        {showPreviewText &&
          <PreviewText>Previewing:</PreviewText>
        }
        <GenderToggleWrapper>
          <GenderInitial
            color="color_darkest"
            variant="meta2"
            left={true}
          >
          W
          </GenderInitial>
          <Toggle
            onClick={() => this.handleGenderToggle()}
            left={isFemale}
          />
          <GenderInitial
            color="color_darkest"
            variant="meta2"
          >
          M
          </GenderInitial>
        </GenderToggleWrapper>
      </div>
    );
  }
}

export default GenderToggle;
