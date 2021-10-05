import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { Link } from "react-router-dom";
import { ROUTES } from '@/utils/constants/constants';
import { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '@/store/actions/account';
import { toggleShowError } from '@/store/actions/accountError';
import Box from '@/components/ui/Layout/Box/Box';

import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';
import Icon from '@/components/ui/Icons/Icon';

const AccountDropdown = styled.div`
  background-color: ${props => props.theme.color_white};
  box-shadow: 0 0.3rem 1rem 0 rgba(0, 0, 0, 0.23);
  height: ${props => props.hidden ? '0': 'auto'};
  position: absolute;
  top: 2.8rem;
  right: 0%;
  transition: height .3s ${props => props.theme.ease_out_quad};
  width: 15.3rem;
  z-index: 100;
`;

const AccountWrapper = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const AccountLink = styled(Link)`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.color_grey_5};
  color: ${props => props.theme.color_dark};
  display: flex;
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  line-height: 1.5;
  padding: 1.2rem 1.6rem;

  &:last-child {
    border-bottom: none;
  }
`;

const Username = styled.p`
  color: ${props => props.theme.color_white};
  font-size: 1rem;
  margin-bottom: ${rhythm(.5)};
  margin-right: ${rhythm(1)};
  max-width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.md`
    font-size: 1.5rem;
    max-width: 25rem;
  `}
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
`;

class NavLogo extends Component {

  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      'isOpen': false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  handleClick(e) {
    if (!this.container || !this.container.current || this.container.current.contains(e.target)) {
      return;
    }

    this.setState({isOpen: false});
  }

  handleLogOut() {
    this.setState({isOpen: false});
    this.props.logout();
  }

  renderOrderLink() {
    if (this.props.location.pathname === ROUTES.ORDERS) return null;

    return(
      <AccountLink onClick={() => this.setState({isOpen: false})} to={ROUTES.ORDERS}>My Orders</AccountLink>
    );
  }

  renderDropDown() {
    const { isOpen } = this.state;
    const { accountError, theme, toggleShowError } = this.props;

    return(
      <AccountDropdown hidden={!isOpen}>
        {this.renderOrderLink()}
        <AccountLink onClick={() => this.handleLogOut()} to={ROUTES.LOGIN}>Log Out</AccountLink>
        { accountError &&
          <>
             <AccountLink onClick={() => toggleShowError(true)}><Icon size={15} fill={theme.color_red_1} name="accountError" /><Box classes="inlineBlock left1">Account Error</Box></AccountLink>
          </>
        }
      </AccountDropdown>);
  }

  render() {
    const { isOpen } = this.state;
    const { user: { email }, accountError, theme } = this.props;

    if (!this.props.user.isLoggedIn) return null;

    return (
      <AccountWrapper ref={this.container}>
        <Username>{email}</Username>
        <button onClick={() => this.setState({isOpen: !isOpen})}>
          <Icon size={24} name="account" />
          {accountError &&
            <ErrorContainer>
              <Icon size={15} fill={theme.color_red_1} name="accountError" />
            </ErrorContainer>
          }
          <div className="visuallyHidden">Account settings</div>
        </button>
        {this.renderDropDown()}
      </AccountWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleShowError: showError => dispatch(toggleShowError(showError)),
});

const mapStateToProps = state => ({
  user: state.account.user,
  accountError: state.selectedOrder && state.selectedOrder.order && state.selectedOrder.order.billingStatus === 'block',
});

export default withRouter(withTheme(connect(mapStateToProps, mapDispatchToProps)(NavLogo)));
