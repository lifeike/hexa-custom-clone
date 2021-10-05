import { css } from 'styled-components';

const sizes = {
  mobileLg: 375,
  md: 700,
  lg: 920,
  xl: 1500,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
