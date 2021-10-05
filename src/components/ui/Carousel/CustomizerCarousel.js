import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants/constants';
import PropTypes from 'prop-types';

import ReviewDesign from '@/components/ui/ReviewDesign/ReviewDesign';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import GenderToggle from '@/components/ui/GenderToggle/GenderToggle';
import Customizer from '@/components/ui/Customizer/Customizer';
import Toggler from '@/components/ui/Toggler';
import StandardModal from '@/components/ui/Modal/StandardModal';

import { debounce } from 'throttle-debounce';
import { UnderlinedButton } from '@/components/ui/Buttons/Buttons';

const CarouselWrapper = styled.div``;

const FADE_LENGTH_MS = 300;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const FadeWrapper = styled.div`
  animation: ${props => props.active ? css`${fadeOut} ease-out` : css`${fadeIn} ease-in`} ${FADE_LENGTH_MS}ms;
`;

const CustomizerControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${rhythm(2)};
  width: 100%;
  z-index: 10;

  ${media.md`
    padding-top: ${rhythm(3)};
  `}
`;

class CustomizerCarousel extends Component {

  static propTypes = {
    isSubmitted: PropTypes.bool,
    showButton: PropTypes.bool,
    order: PropTypes.object,
    positionDefault: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedGender: 'M',
      fadeActive: false,
    };

    this.timeouts = [];
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }


  clearTimeouts() {
    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });

    this.timeouts = [];
  }

  handleGenderToggleDebounced = gender => debounce(FADE_LENGTH_MS, true, this.handleGenderToggle(gender));

  handleGenderToggle(gender) {
    this.clearTimeouts();

    this.timeouts.push(
      setTimeout(
        () => {
          this.setState({
            fadeActive: true,
          });
        },
        0
      ),
      setTimeout(
        () => {
          this.setState({
            selectedGender: gender,
            fadeActive: false,
          });
        },
        FADE_LENGTH_MS
      )
    );
  }

  getButton() {
    if (!this.props.showButton) return null;

    return this.props.isSubmitted
      ? this.renderReviewButton()
      : this.renderEditButton();
  }

  renderReviewButton() {

    return (
      <Toggler>
        {([toggled, onToggle]) => (
          <div>
            <UnderlinedButton onClick={() => onToggle(true)} to="#">
              View Details
            </UnderlinedButton>
            <StandardModal
              toggle={toggled}
              onAfterClose={() => onToggle(false)}
            >
              {toggled &&
                <ReviewDesign />
              }
            </StandardModal>
          </div>
        )}
      </Toggler>
    );
  }

  renderEditButton() {
    return (
      <UnderlinedButton icon="true" to={`${ROUTES.ORDER}/${this.props.groupId}/edit`}>
        <Icon size={16} name="editDesign"/>
        <Box inline classes="left1">Edit Design</Box>
      </UnderlinedButton>
    );
  }

  render() {
    const button = this.getButton();

    const { order, positionDefault } = this.props;

    return (
      <CarouselWrapper>
        <CustomizerControlsWrapper classes="top2 left2">
          <GenderToggle onChangeGender={gender => this.handleGenderToggleDebounced(gender)} showPreviewText={this.props.showButton} />
          {button}
        </CustomizerControlsWrapper>
        <FadeWrapper active={this.state.fadeActive}>
          <Customizer positionDefault={positionDefault} order={order} gender={this.state.selectedGender || 'm'} />
        </FadeWrapper>
      </CarouselWrapper>
    );
  }
}

export default CustomizerCarousel;
