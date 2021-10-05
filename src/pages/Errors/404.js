import React from 'react';
import { ROUTES } from '@/utils/constants/constants';
import styled from 'styled-components/macro';
import media from '@/utils/media';

import Typography from '@/components/ui/Typography/Typography';

import Box from '@/components/ui/Layout/Box/Box';
import { BorderedLink } from '@/components/ui/Buttons/Buttons';

const OuterContainer = styled.div`
  display: flex;
  flex-grow: 1;

  ${media.md`
    padding: 4rem;
  `}
`;

const InnerContainer = styled.div`
  background-color: ${props => props.theme.color_grey_1};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;

  ${media.md`
    padding: 4rem;
  `}
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
`;

const ReturnButton = styled(BorderedLink)`
   padding: 1.4rem 5.5rem;
  text-transform: uppercase;
`;

export default function PageNotFound() {
  return (
    <OuterContainer>
      <InnerContainer>
        <Content>
          <div>
            <Typography variant="h1">
            404
            </Typography>
            <Typography variant="h3">
            Sorry, that page cannot be found.
            </Typography>
            <Box classes="top2">
              <Typography variant="body">
              You may have the wrong URL, or your order may have changed status.
              </Typography>
            </Box>
            <Box classes="top8">
              <ReturnButton to={ROUTES.ORDERS}>return to your orders</ReturnButton>
            </Box>
          </div>
        </Content>
      </InnerContainer>
    </OuterContainer>
  );
}
