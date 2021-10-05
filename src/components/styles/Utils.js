import { css, createGlobalStyle } from 'styled-components/macro';

const utils = css`
  .visuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: .1rem;
    margin: -.1rem;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: .1rem;
  }

  .noScroll {
    position: fixed;
  }

  .modalOpen {
    margin-right: calc(-1 * (100vw - 100%));
    position: fixed;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const Utils = createGlobalStyle`${utils}`;
