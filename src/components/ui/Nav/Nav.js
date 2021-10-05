import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';
import { connect } from 'react-redux';
import { isSuperAdmin } from '@/utils/helpers';

import NavTitle from './NavTitle';
import NavLogo from './NavLogo';

const NavContainer = styled.nav`
  height: 4.7rem;
  background-color: ${props => props.theme.color_darkest};
  display: flex;
  justify-content: space-between;

  ${media.md`
    height: 9rem;
  `}
`;

const NavInner = styled.div`
  padding: 1rem ${rhythm(2)};
  width: 100%;

  ${media.md`
    padding: 2rem ${rhythm(5)};
  `}
`;

const Title = styled.h1`
  align-self: center;
  color: ${props => props.theme.color_white};
  font-size: 1.4rem;
  font-weight: bold;
`;

const StartWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export class Nav extends Component {
  renderTitle() {
    if (isSuperAdmin(this.props.user)) {
      return (
        <Title>
          Admin Dashboard
        </Title>
      );
    }
    else {
      return (
        <>
          <NavTitle />
        </>
      );
    }
  }

  render() {

    return (
      <NavContainer>
        <NavInner>
          <StartWrapper>
            {this.renderTitle()}
            <NavLogo />
          </StartWrapper>
        </NavInner>
      </NavContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
});

export default withTheme(connect(mapStateToProps)(Nav));
