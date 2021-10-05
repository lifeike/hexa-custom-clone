import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import Icon from '@/components/ui/Icons/Icon';
import { toFeatureTitle } from './module';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color_grey_1};
  border: solid 0.1rem ${props => props.theme.color_white};
  cursor: pointer;
  border-right: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  padding: 1.2rem 0.4rem;
  text-align: center;
  width: 6.7rem;

  ${media.md`
    align-items: center;
    background-color: ${props => props.theme.color_white};
    border: none;
    flex-direction: row;
    justify-content: left;
    padding: 1.2rem 0.4rem 1.2rem 2.4rem;
    text-align: left;
    width: 100%;
  `}

  > * {
    &:first-child {
      border-left: none;
    }
  }
`;

const Name = styled.div`
  color: ${props => props.color_grey_dark_1};
  font-size: 1.1rem;
  line-height: 1.27;
  padding-top: ${rhythm(1)}

  ${media.md`
    font-size: 1.6rem;
    line-height: 2;
    padding-top: 0;
    padding-left: ${rhythm(2)}
  `}
`;

const ChevronIcon = styled(Icon)`
  display: none;

  ${media.md`
    display: block;
    position: absolute;
    right: ${rhythm(2)};
    transform: rotateZ(180deg);
  `}
`;

const Img = styled.img`
  height: 5rem;
  width: 5rem;

  ${media.md`
    height: 5.5rem;
    margin: -0.2rem;
    width: 5.5rem;
  `}
`;

class Style extends Component {

  static propTypes = {
    options: PropTypes.array,
    feature: PropTypes.object.isRequired,
    iconPath: PropTypes.string.isRequired,
    styleNo: PropTypes.string,
  };

  render() {
    const { feature: {
      item_no,
    },
    iconPath} = this.props;

    return (
      <Wrapper>
        <Img src={`${iconPath}${item_no}.png`}
          srcset={`${iconPath}${item_no}@2x.png 2x,${iconPath}${item_no}@3x.png 3x`} />
        <Name>{toFeatureTitle(item_no, this.props.styleNo)}</Name>
        <ChevronIcon size={24} name="chevron" />
      </Wrapper>
    );
  }
}

export default withTheme(Style);
