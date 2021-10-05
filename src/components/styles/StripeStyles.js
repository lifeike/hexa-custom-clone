

import { css, createGlobalStyle } from 'styled-components/macro';

const stripeStyles = css`

    .StripeElement {
      background-color: ${props =>  props.theme.color_grey_0};
      border: none;
      color: ${props => props.theme.color_darkest};
      display: block;
      font-family: ${props => props.theme.font_family};
      font-size: 1.6rem;
      padding: 1.1rem 1.6rem 1.1rem;
      position: relative;
      width: 100%;
      z-index: 2;
    }

   .StripeElement--focus {
      outline-width: 2px;
      outline-style: solid;
      outline-color: Highlight;
      outline-color: -webkit-focus-ring-color;
      outline-style: auto;
      transition: all 150ms ease;
    }

    .StripeElement--invalid {
      background-color: ${props => props.theme.color_light_red_1};
    }
`;

export const StripeStyles = createGlobalStyle`${stripeStyles}`;
