import React from 'react';
import ResetPasswordForm from '@/components/ui/Forms/Account/ResetPasswordForm';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';

const Background = styled.div`
  display: flex;
  flex-grow: 1;

  ${media.md`
    background-color: ${props => props.theme.color_grey_1};
    display: block;
    padding: ${rhythm(4)}
  `}
`;

const ResetFormWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: ${rhythm(4)};

  ${media.md`
    background-color: ${props => props.theme.color_white};
    box-shadow:  0 0 .8rem 0 rgba(0, 0, 0, 0.2);
    flex-grow: 0;
    margin: 0 auto;
    max-width: 62.4rem;
    padding: ${rhythm(5)};

  `}
`;

export default function ResetPassword() {
  return (
    <Background>
      <ResetFormWrapper>
        <ResetPasswordForm />
      </ResetFormWrapper>
    </Background>
  );
}
