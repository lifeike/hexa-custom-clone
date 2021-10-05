import styled from 'styled-components/macro';
import Typography from '@/components/ui/Typography/Typography';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import Box from '@/components/ui/Layout/Box/Box';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${media.md`
    margin: 0 auto;
    max-width: 144rem;
    overflow: hidden;
    width: 100%;
  `}
`;

export const MainContent = styled.div`
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  ${media.md`
    overflow: hidden;
  `}
`;

export const DesktopHeader = styled.div`
  border-bottom: .1rem solid ${props => props.theme.color_darkest};
  display: none;
  height: ${rhythm(10)};
  width: 100%;

  ${media.md`
    display: block;
  `}
`;

export const JacketImage = styled.div`
  background-color: ${props => props.theme.color_grey_1};
  flex: 1;
  height: 100%;
  width: 100%;

  ${media.md`
    flex: unset;
  `}
`;

export const Items = styled.div`
  bottom: 0;
  height: 10.2rem;
  overflow-y: hidden;
  position: absolute;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  ${media.md`
    background: ${props => props.theme.color_white};
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: hidden;
    right: 0;
    top: 0;
    width: 30.4rem;
  `}

    ${media.lg`
      width: 37.7rem;
  `}
`;

export const ItemDrawer = styled.div`
  background: ${props => props.theme.color_grey_1};
  bottom: 0;
  flex-direction: row;
  overflow: hidden;
  position: absolute;
  transition: all .4s ${props => props.theme.ease_out_quad};
  width: 100%;
  z-index: 2;

  ${media.md`
    background: ${props => props.theme.color_white};
    display: flex;
    flex-direction: column;
    height: auto;
    right: 0;
    top: 0;
    transform: translateX(${props => props.showDrawer ? '0' : '100%'});
    width: 30.4rem;
  `}

  ${media.lg`
    width: 37.7rem;
  `}
`;

export const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    scrollbar-width: 0;

  ${media.md`
    display: unset;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
  `}
`;

export const Item = styled.div`
  align-items: center;
  display: flex;
  height: 10.2rem;
  position: relative;
  width: 12rem;

  ${media.md`
    height: auto;
    width: auto;

    &:after {
      border-bottom: solid 1px;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      content: '';
      margin-left: 2.4rem;
      opacity: 0.2;
      position: absolute;
      width: calc(100% - 2.4rem);
    }
  `}

  &:focus {
    z-index: 2;
  }
`;

export const LeftColumn = styled.div`
  padding: 0 1.6rem;
  width: 100%;

  ${media.md`
    height: calc(100vh - 17rem);
    overflow: hidden;
    padding: 0 1rem;
    width: calc(100% - 31rem);
  `}

  ${media.lg`
    padding: 0 4rem;
    width: calc(100% - 38rem);
  `}
`;

export const LeftColumnHeaders = styled(Box)`
  position: relative;
  text-align: center;

  ${media.md`
    text-align: left;
  `}
`;

export const ButtonArea = styled.div`
  height: 4.4rem;
  width: 100%;
`;

export const BackButton = styled.button`
  border-bottom: ${props => props.theme.darkest} .1rem solid;
  border-top: ${props => props.theme.darkest} .1rem solid;
  height: 100%;
  width: 100%;
`;

export const FinishEditingButton = styled.button`
  background-color: ${props => props.theme.color_yellow_1};
  height: 100%;
  width: 100%;
`;

export const ButtonTypography = styled.span`
  color: ${props => props.theme[props.color] || props.theme.color_dark};
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font_weight_bold};
  letter-spacing: ${props => props.letterSpacing}rem;
  ${props => props.block ? `display: block;`: null}
`;

export const FadingHeader = styled(Typography)`
  height: 1.2rem;
  opacity: ${props => props.visible ? '1': '0'};
  position: absolute;
  top: 1rem;
  transform: translateX(-50%);
  transition: opacity 0.5s linear;
  width: 100%;
`;

export const HelpModalToggle = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
`;
