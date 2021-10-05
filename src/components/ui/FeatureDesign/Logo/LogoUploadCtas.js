import React from 'react';
import styled from 'styled-components';
import Icon from '@/components/ui/Icons/Icon';
import Box from '@/components/ui/Layout/Box/Box';

const AddText = styled.span`
  font-size: 2rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.2;
  padding-left: 1.1rem;
  text-transform: uppercase;
`;

const DragText = styled.span`
  font-size: 1.1rem;
  line-height: 1.45;
  text-transform: uppercase;
`;

const Flex = styled.div`
  display: flex;
`;

const LogoCtaText = styled.div`
  font-size: 1.1rem;
  line-height: 2.18;
`;

const RetryCtaText = styled(LogoCtaText)`
  letter-spacing: 0.1rem;
  text-decoration: underline;
  text-transform: uppercase;
`;

export const LogoAddCta = () => {
  return (
    <>
      <Flex>
        <Icon name="fileUpload" size={24} />
        <AddText>ADD LOGO</AddText>
      </Flex>
      <Box classes="top1">
        <DragText>OR DRAG ASSET HERE</DragText>
      </Box>
    </>
  );
};

export const FileReadError = (props) => {
  return (
    <div>
      <Icon size={64} fill={props.theme.color_red} name="exclamation"></Icon>
      <Box classes="top2">
        <LogoCtaText>{props.errorMessage}</LogoCtaText>
        <button onClick={e => props.handleClick(e)}>
          <RetryCtaText>Try again</RetryCtaText>
        </button>
      </Box>
    </div>
  );
};

export const FileReadSuccess = () => {
  return (
    <div>
      <Icon name="circleCheckLogo" size={64} />
      <Box classes="top2">
        <LogoCtaText>File Selected</LogoCtaText>
      </Box>
    </div>
  );
};
