import { css } from 'styled-components';
import media from '@/utils/media';
import { getAdjustedVh } from '@/utils/helpers';

export const FullHeight = () => {
  return css`
    min-height: calc(${getAdjustedVh(100)}px - (4.7rem + 9.3rem));

    ${media.md`
      min-height: calc(${getAdjustedVh(100)}px - (9rem + 12.5rem));
    `}
  `;
};
