import React from 'react';
import LoginForm from '@/components/ui/Forms/Account/LoginForm';
import { rhythm } from '@/utils/helpers';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { Tier } from '@/components/ui/Layout/Tier';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';

const LoginWrapper = styled.div`
  ${media.md`
    background-color: ${props => props.theme.color_white};
    box-shadow:  0 0 .8rem 0 rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    max-width: 62.4rem;
    padding: ${rhythm(5)};
    padding-bottom: 10rem;
  `}
`;

const LoginHeader = styled.div`
  padding-bottom: ${rhythm(3)};

  ${media.md`
    padding-bottom: ${rhythm(7)};
  `}
`;

export default function Login() {
  return (
    <Tier height="full" color="color_grey_1">
      <Container>
        <LoginWrapper>
          <LoginHeader>
            <Typography variant="h1">
              Sign In
            </Typography>
          </LoginHeader>
          <LoginForm/>
        </LoginWrapper>
      </Container>
    </Tier>
  );
}
