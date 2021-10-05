import styled from 'styled-components/macro';
import media from '@/utils/media';
import Icon from '@/components/ui/Icons/Icon';

export const OptionGrid = styled.div`
  border-top: 1px solid ${props => props.theme.color_white};
  display: flex;
  flex-direction: row;
  height: 10.2rem;
  padding: .5rem;
  overflow-y: hidden;

  ${media.md`
    background-color: ${props => props.theme.color_white};
    border-top: none;
    flex-wrap: wrap;
    height: auto;
    margin-top: 1.6rem;
  `}
`;

export const OptionsTitle = styled.div`
  color: ${props => props.theme.color_darkest};
  font-size: 2rem;
  line-height: 1.2;
  padding-left: 0.5rem;
`;

export const Back = styled.button`
  color: ${props => props.theme.color_darkest};
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.71;
`;

export const Chevron = styled(Icon)`
  margin-left: -8px;
`;
