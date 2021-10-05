import { createGlobalStyle, css } from 'styled-components';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

// This could be reduced, just covering a wide basis for now.
const boxSizes = [0,1,2,3,4,5,6,7,8,9,10,12,15];

const createBoxDimensions = resolution => css`

  ${boxSizes.map((size) => css`
    ${['top', 'right', 'bottom', 'left'].map((dir) => css`
      .box_${dir}${size}${resolution} {
        padding-${dir}: ${rhythm(size)};
      }
    `)}

    .box_${size}${resolution} {
      padding-bottom: ${rhythm(size)};
      padding-left: ${rhythm(size)};
      padding-right: ${rhythm(size)};
      padding-top: ${rhythm(size)};
    }

    .box_sides${size}${resolution} {
      padding-left: ${rhythm(size)};
      padding-right: ${rhythm(size)};
    }

    .box_flats${size}${resolution} {
      padding-bottom: ${rhythm(size)};
      padding-top: ${rhythm(size)};
    }
  `)};
`;

const BoxStyles = createGlobalStyle`
  .box {
    display: block;
  }

  .box_center {
    margin: 0 auto;
  }

  .box_relative {
    position: relative;
  }

  .box_inlineBlock {
    display: inline-block;
  }

  .box_textCenter {
    text-align: center;
  }

  .box_textLeft {
    text-align: left;
  }

  .box_textRight {
    text-align: right;
  }

  .box_vMiddle {
    vertical-align: middle;
  }

  .box_flexgrow1 {
   flex-grow: 1;
  }

  .box_overflowAuto {
    overflow: auto;
  }

  .box_overHidden {
    overflow: hidden;
  }

  ${createBoxDimensions('')};

  ${media.md`
    ${createBoxDimensions('Md')};
  `};

  ${media.lg`
    ${createBoxDimensions('Lg')};
  `};

  ${media.xl`
    ${createBoxDimensions('Xl')};
  `};
`;

export default BoxStyles;
