import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import media from '@/utils/media';
import { formatCurrency } from '@/utils/helpers';
import { OptionTranslations } from '@/utils/constants/lookups';
import { HideMobile, ShowMobile } from '@/components/ui/Utils';

import Box from '@/components/ui/Layout/Box/Box';

const Label = styled.div`
  line-height: 1.27;
  padding-top: 0.4rem;

  ${media.md`
    display: ${props => props.inline ? 'inline-block': 'block'};
    line-height: ${props => props.inline ? '2': '1.27'};
    ${props => props.inline ? 'padding-top: 0': ''};
  `}
`;

class DesignOption extends Component {
  static propTypes = {
    label: PropTypes.string,
    inline: PropTypes.bool,
    addPrice: PropTypes.number,
    alignText: PropTypes.string,
  };

  renderAddPrice(price) {
    const { inline, textAlign } = this.props;

    if (price && price !== 0) {
      return (
        <>
        <ShowMobile>
          <Label inline={inline}>
            {`+${formatCurrency(price)}`}
          </Label>
        </ShowMobile>

        <HideMobile display="inline-block">
          <Box classes={`left1Md${textAlign === 'left' ? ' textLeft': ''}`}>
            <Label inline={inline}>
              {`(+${formatCurrency(price)})`}
            </Label>
          </Box>
        </HideMobile>
        </>
      );
    }
  }

  render() {
    const {
      label,
      addPrice,
      inline,
    } = this.props;

    return (
      <>
        <Label inline={inline}>
          {OptionTranslations[label] || label}
        </Label>
        {this.renderAddPrice(addPrice)}
      </>
    );
  }
}

export default DesignOption;
