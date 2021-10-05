import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import { getShippingInformation } from '@/store/selectors/order';
import { getShippingUrl } from '@/utils/shippingUrls';
import moment from 'moment';

import { Hr } from '@/components/ui/Utils';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';

const Title = styled(Typography)`
  padding-bottom: ${rhythm(.5)};
`;

const ShippingPackage = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & + & {
    padding-top: ${rhythm(2)};
  }
`;

const ShippingCommonText = styled.span`
  color: ${props => props.theme.color_grey_dark_1};
  font-size: 1.4rem;
  line-height: 1.43;
`;

class OrderDetailShipping extends Component {

  handlePackagesTitle() {

    let title = `Completed in ${this.props.shipping.packages.length} package`;

    if (this.props.shipping.packages.length > 1) {
      title += 's';
    }

    return title;
  }

  renderShipmentTracking() {
    const { isOpen, shipping } = this.props;

    return (
      <>
        <Box classes="flats3">
          <Hr />
        </Box>
        <Title block variant="metaTitle">Tracking Info</Title>
        <ShippingCommonText>{this.handlePackagesTitle()}</ShippingCommonText>
        <ul>
          {shipping.packages.map((shipment, i) => (
            <Box classes="top3" key={i}>
              <Typography block variant="meta1" color="color_darkest">Package {i + 1}</Typography>
              <ShippingPackage>
                <ShippingCommonText>Shipped on {moment(shipping.shippedDate).local().format('M/D/YY')}</ShippingCommonText>
                <a tabIndex={isOpen ? '' : '-1'} rel="noopener noreferrer" target="_blank" href={getShippingUrl(shipment.shippingCompany, shipment.id)}>
                  <Typography block variant="link">Track</Typography>
                </a>
              </ShippingPackage>
            </Box>
          ))}
        </ul>
      </>
    );
  }

  render() {
    if (!this.props.order) {
      return null;
    }

    const { shipping } = this.props;

    return (
      <>
        <Title block variant="metaTitle">Shipping Address</Title>
        <Typography block variant="meta1">{shipping.name}</Typography>
        <Typography block variant="meta1">{shipping.address}</Typography>
        <Typography block variant="meta1">{shipping.cityStateZip}</Typography>
        {shipping.packages.length > 0 && this.renderShipmentTracking()}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    shipping: getShippingInformation(props.order),
  };
};

export default connect(mapStateToProps, null)(OrderDetailShipping);
