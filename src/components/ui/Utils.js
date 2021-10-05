import styled from 'styled-components/macro';
import media from '@/utils/media';

export const Hr = styled.div`
  background-color: ${props => props.theme.color_grey_5};
  height: .1rem;
  width: 100%;
`;

export const HideMobile = styled.div`
  display: none;

  ${media.md`
    display: ${props => props.display || 'block'};
  `}
`;

export const HideTablet = styled.div`
  display: none;

  ${media.lg`
    display: ${props => props.display || 'block'};
  `}
`;

export const HideDesktop = styled.div`
  display: ${props => props.display || 'block'};

  ${media.lg`
    display: none;
  `}
`;

export const ShowMobile = styled.div`
  display: ${props => props.display || 'block'};

  ${media.md`
    display: none;
  `}
`;

export const StickyTop = styled.div`
  position: sticky;
  top: 0;
`;
