import React from 'react';
import styled, { css } from 'styled-components/macro';
import Icon from '@/components/ui/Icons/Icon';
import { withTheme } from 'styled-components';
import media from '@/utils/media';

import { Link } from "react-router-dom";

export const ButtonHoverCircle = css`
  &:before {
    border-radius: 50%;
    content: '';
    height: 4rem;
    left: 1px;
    position: absolute;
    top: 1px;
    transition: transform .2s ease;
    transform: scale(0);
    width: 4rem;
  }

  &:hover {
    &:before {
      background-color: ${props => props.theme.color_grey_2};
      transform: scale(1);
    }
  }
`;

export const Button = styled.button`
  background: transparent;
  color: ${props => props.color || '#000'};
  cursor: pointer;
  display: inline-block;
  font-family: ${props => props.theme.font_family};
  font-size: 1.1rem;
  font-weight: ${props => props.theme.font_weight_bold};
  padding: 1.4rem 2.4rem;
  text-align: center;
  transition: 0.2s all ${props => props.theme.ease_out_quad};
  width: 100%;
`;

export const ButtonLink = styled(Link)`
  align-items: center;
  color: ${props => props.theme.color_darkest};
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  justify-content: center;

  &:visited {
    color: ${props => props.theme.color_darkest};
  }
`;

export const UnderlinedButton = styled(ButtonLink)`
  position: relative;

  &:before {
    background-color: black;
    bottom: -.5rem;
    content: '';
    height: .2rem;
    left: ${props => props.icon ? 2.5 : 0}rem;
    margin-top: .2rem;
    position: absolute;
    transition: width .2s ease-out;
    width: 0;
  }

  &:focus {
    outline: auto;
  }

  &:hover {
    &:before {
      width: calc(100% - ${props => props.icon ? 25 : 0}px);
    }
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.color_yellow_1};
  font-size: 1.6rem;

  &:hover, &:focus {
    background-color: ${props => props.theme.color_yellow_2};
  }

  &:focus {
    outline: auto;
  }

  &:disabled {
    background: ${props => props.theme.color_yellow_0};
    color: ${props => props.theme.color_grey_4};
  }

  ${media.md`
    max-width: ${props => props.fullMd ? 'auto' : props.maxWidth};
    padding: 1rem ${props => props.paddingSide || '4.6'}rem;
    width: ${props => props.fullMd ? '100%;' : props.buttonWidth || 'auto'};
  `}
`;

export const Secondary = styled(Button)`
  background-color: ${props => props.theme.color_white};
  border: solid 1px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.115rem;
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  padding: 1.4rem 4.6rem;
  text-transform: uppercase;
  width: auto;

  &:disabled {
    opacity: 0.3;
  }


  &:hover {
    background-color: ${props => props.theme.color_grey_2};
  }
`;

export const Breadcrumb = styled.button`
  color: ${props => props.theme.color_darkest};
  cursor: pointer;
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.71;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-transform: uppercase;

  &:active {
    outline: none;
  }
`;

const ModalClose = styled(Button)`
  ${props => props.sticky && css`background: ${props.theme.color_white};`}
  border-radius: 50%;
  height: 4rem;
  padding: 1rem;
  position: fixed;
  right: 1.6rem;
  top: 1.6rem;
  width: 4rem;
  z-index: 2;

  ${props => props.sticky && css`box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);`}

  ${ButtonHoverCircle}

  ${media.md`
    padding: 1.1rem;
    position: absolute;
    right: 1.9rem;
    top: 1.9rem;
  `}

`;

export const ModalCloseButton = withTheme(({...props}) => (
  <ModalClose onClick={props.onClick} sticky={props.sticky}>
    <Icon size={20} fill={props.theme.color_darkest} name="close"></Icon>
  </ModalClose>
));

export const FooterButton = styled(Button)`
  color: ${props => props.theme.footer.link_color || props.theme.color_white};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  padding: 0;
  text-align: center;

  &:hover {
    color: ${props => props.theme.footer.hover_color || props.theme.color_white};
  }

  ${media.md`
    text-align: left;
  `}
`;

export const NewOrdersLink = styled(Link)`
  border: .1rem solid ${props => props.theme.color_dark};
  color: ${props => props.theme.color_dark};
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: .11rem;
  padding: 1.2rem 2.2rem;
  text-transform: uppercase;

  span:first-child {
    display: none;
  }

  ${media.md`
    span:first-child {
      display: block;
    }

    span:last-child {
      display: none;
    }
  `}
`;

export const BorderedButton = styled(Button)`
  border: solid 1px ${props => props.borderColor || '#000'};
  padding: 1.4rem 4.6rem;
  width: auto;
`;

export const ModalCancelButton = styled(Button)`
  border: solid 1px ${props => props.borderColor || '#000'};
  width: auto;

  ${media.md`
    padding: 1rem ${props => props.paddingSide || '4.6'}rem;
  `}
`;

export const ModalConfirmButton = styled(PrimaryButton)`
  width: auto;
`;

export const BorderedLink = styled(Link)`
  border: solid 1px ${props => props.borderColor || '#000'};
  color: ${props => props.theme.color_darkest};
  padding: 1.4rem 4.6rem;
  width: auto;
`;

export const HorizontalButtonContainer = styled.div`
  display: flex;

  > * {
    &:first-child {
      margin-right: 1.6rem;
    }

    flex-grow: 1;
  }

  ${media.md`
    display: block;
  `}
`;
