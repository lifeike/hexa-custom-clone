import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { ROUTES } from '@/utils/constants/constants';

import StandardModal from '@/components/ui/Modal/StandardModal';
import Container from '@/components/ui/Layout/Container';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import { Loader } from '@/components/ui/PageLoader/Loader';
import Icon from '../Icons/Icon';
import { BorderedLink } from '../Buttons/Buttons';

const LoaderContainer = styled.div`
  padding: 10rem;
`;

const CenteredText = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const InventoryCopy = styled.span`
  font-size: 1.6rem;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.color_grey_dark_1};
`;

const InventoryCopyBold = styled(InventoryCopy)`
  font-weight: ${props => props.theme.font_weight_semi_bold};
`;

const ReturnButton = styled(BorderedLink)`
  padding: 1.4rem 5.5rem;
  text-transform: uppercase;
`;

const EmailLink = styled(Typography)`
  font-size: 1.6rem;
`;

class InventoryCheck extends PureComponent {

  static propTypes = {
    isOpen: PropTypes.bool,
    loading: PropTypes.bool,
    showError: PropTypes.bool,
    failedInventoryItems: PropTypes.arrayOf(PropTypes.string),
    groupId: PropTypes.string,
  }

  renderLoading() {
    return (
      <>
      <LoaderContainer>
        <Loader immediate={true} loading={true}/>
      </LoaderContainer>
      <Box classes="bottom8">
        <CenteredText>
          <Typography variant="h2">One moment...</Typography>
          <Box classes="top1">
            <InventoryCopy variant="body">We’re doing a quick inventory check before we get into checkout.</InventoryCopy>
          </Box>
        </CenteredText>
      </Box>
      </>
    );
  }

  renderInventoryItems(item, index) {
    const { failedInventoryItems } = this.props;
    const isFirst = index === 0;
    const isLast = index + 1 === failedInventoryItems.length;

    return (
      <span key={index}>
        { !isFirst && <InventoryCopy>, {isLast && 'and '}</InventoryCopy>}
        <InventoryCopyBold>{item}</InventoryCopyBold>
      </span>
    );
  }

  renderError() {
    const { theme, groupId, failedInventoryItems } = this.props;

    return (
      <>
        <Box classes="top9 bottom5 textCenter">
          <Icon name="lowInventory" size={61} fill={theme.color_red}></Icon>
        </Box>
        <Box classes="bottom8">
          <CenteredText>
            <Typography variant="h2">Low Inventory</Typography>
            <Box classes="top2 textCenter">
              <InventoryCopy variant="body">We appologize, but we currently do not have enough </InventoryCopy>
              {
                failedInventoryItems.map((item, idx) => {
                  return this.renderInventoryItems(item, idx);
                })
              }
              <InventoryCopy variant="body"> in stock to complete your order.</InventoryCopy>
            </Box>
            <Box classes="top2">
              <InventoryCopy variant="body">Contact us at </InventoryCopy>
              <a href="mailto:partnersupport@hexa.com"><EmailLink variant="link">support@hexacustom.com</EmailLink> </a>
              <InventoryCopy variant="body">and we’ll help you complete your order.</InventoryCopy>
            </Box>
            <Box classes="top8">
              <ReturnButton to={`${ROUTES.ORDER}/${groupId}`}>Return To Cart</ReturnButton>
            </Box>
          </CenteredText>
        </Box>
      </>
    );
  }

  render() {
    const { isOpen, failedInventoryItems } = this.props;

    return (
      <StandardModal
        toggle={isOpen}
        hideClose={true}
      >
        <Container>
          {failedInventoryItems && failedInventoryItems.length > 0 ? this.renderError() : this.renderLoading()}
        </Container>
      </StandardModal>
    );
  }
}

export default withTheme(InventoryCheck);
