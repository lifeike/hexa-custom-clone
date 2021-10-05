import styled from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

const container = styled.div`
  ${props => !props.leftAligned ? 'margin: 0 auto' : null};
  padding-left: ${props => props.inner ? rhythm(3) : rhythm(2)};
  padding-right: ${props => props.inner ? rhythm(3) : rhythm(2)};
  padding: ${props => props.md ? 0: null};

  ${media.md`
    max-width: 81.6rem;
    padding-left: ${rhythm(5)};
    padding-right: ${rhythm(5)};
  `}

  ${media.lg`
    max-width: 144.0rem;
  `}
`;

export default container;
