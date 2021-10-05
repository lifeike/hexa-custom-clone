import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { Link } from "react-router-dom";
import { ROUTES } from '@/utils/constants/constants';

const Wrapper = styled.div`
  align-self: center;
`;

const Title = styled(Link)`
  color: ${props => props.theme.color_white};
  font-size: 1.4rem;
  font-weight: bold;
`;

const Subtitle = styled.span`
  color: ${props => props.theme.color_grey_3};
  font-size: 1.1rem;
`;

const HexaSubTitle = styled(Subtitle)`
  font-weight: bold;
`;

export class NavTitle extends Component {
  render() {
    return (
      <Wrapper>
        <Title to={ROUTES.HOME}>Group Sales Customizer</Title>
        <div>
          <Subtitle>Powered by </Subtitle>
          <HexaSubTitle>Hexa|Custom</HexaSubTitle>
        </div>
      </Wrapper>
    );
  }
}

export default withTheme(NavTitle);
