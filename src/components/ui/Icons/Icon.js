import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import IconPropTypes from './IconPropTypes';
// Import all Icons below and add the the IconSelector as well.

import Close from './Close';
import ShowPassword from './ShowPassword';
import HidePassword from './HidePassword';
import Chevron from './Chevron';
import Edit from './Edit';
import Exclamation from './Exclamation';
import EditDesign from './EditDesign';
import Kebab from './Kebab';
import Question from './Question';
import CircleCheck from './CircleCheck';
import CircleCheckLogo from './CircleCheckLogo';
import Account from './Account';
import LowInventory from './LowInventory';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Trash from './Trash';
import { FabricOutOfInventory } from './FabricOutOfInventory';
import Plus from './Plus';
import AccountError from './AccountError';

import { SOCIAL_MEDIA } from '@/utils/constants/constants';

import FileUpload from './FileUpload';

const StyledIcon = styled.i`
  display: inline-block;
  height: ${props => props.size/10}rem;
  min-height: ${props => props.size/10}rem;
  min-width: ${props => props.size/10}rem;
  position: relative;
  width: ${props => props.size/10}rem;

  > * {
    height: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
  }

  &:hover {
    color: ${props => props.hoverColor || props.color};
  }
`;

StyledIcon.propTypes = IconPropTypes;

class Icon extends Component {
  static propTypes = IconPropTypes;

  IconSelector(props) {
    switch(props.name) {
    case 'close':
      return <Close {...props} />;
    case 'exclamation':
      return <Exclamation {...props} />;
    case 'hidePassword':
      return <HidePassword {...props} />;
    case 'showPassword':
      return <ShowPassword {...props} />;
    case 'chevron':
      return <Chevron {...props} />;
    case 'edit':
      return <Edit {...props} />;
    case 'editDesign':
      return <EditDesign {...props} />;
    case 'kebab':
      return <Kebab {...props} />;
    case 'question':
      return <Question {...props} />;
    case 'circleCheck':
      return <CircleCheck {...props} />;
    case 'circleCheckLogo':
      return <CircleCheckLogo {...props} />;
    case 'account':
      return <Account {...props} />;
    case 'lowInventory':
      return <LowInventory {...props} />;
    case SOCIAL_MEDIA.FACEBOOK:
      return <Facebook {...props} />;
    case SOCIAL_MEDIA.INSTAGRAM:
      return <Instagram {...props} />;
    case SOCIAL_MEDIA.TWITTER:
      return <Twitter {...props} />;
    case 'fileUpload':
      return <FileUpload {...props} />;
    case 'trash':
      return <Trash {...props} />;
    case 'fabricOutOfInventory':
      return <FabricOutOfInventory {...props} />;
    case 'plus':
      return <Plus {...props} />;
    case 'accountError':
      return <AccountError {...props} />;
    default:
      break;
    }
  }

  render() {
    return (
      <StyledIcon {...this.props}>
        {this.IconSelector(this.props)}
        {this.props.children}
      </StyledIcon>
    );
  }
}

export default withTheme(Icon);
