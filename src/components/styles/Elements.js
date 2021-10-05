import { css, createGlobalStyle } from 'styled-components/macro';

const elements = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    font-size: 62.5%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  body {
    font-family: ${props => props.theme.font_family};
    font-size: 1.6rem;
  }

  button {
    appearance: none;
    background: transparent;
    border: 0;
    border-radius: 0;
    cursor: pointer;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  hr {
    border-color: ${props => props.theme.color_grey_1};
    height: 0.1rem;
    margin: 0;
  }
`;

export const Elements = createGlobalStyle`${elements}`;
