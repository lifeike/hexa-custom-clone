import React,  { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { rhythm, formatCurrency } from '@/utils/helpers';
import { HideDesktop } from '@/components/ui/Utils';
import media from '@/utils/media';

import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import { Breadcrumb as BreadcrumbBase } from '@/components/ui/Buttons/Buttons';

const OrderDetailHeaderBackground = styled.div`
  background-color: ${props => props.theme.color_white};
  padding: ${rhythm(3)} 0 ${rhythm(3)};
`;

const OrderDetailHeaderWrapper = styled.div`
  position: relative;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Chevron = styled(Icon)`
  margin-left: -8px;
`;

const HeaderSummary = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  padding-top: ${rhythm(2)};
`;

const Total = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.5;

  ${media.md`
    font-size: 1.8rem;
  `}
`;

const Breadcrumb = styled(BreadcrumbBase)`
  margin-bottom: 0rem;
`;

class CheckoutHeader extends Component {
  render() {
    const {
      orderId,
      styleName,
      quantity,
      total,
    } = this.props.summary;

    const { breadcrumbLink, breadcrumbLabel } = this.props;

    return (
      <OrderDetailHeaderBackground>
        <Container>
          <OrderDetailHeaderWrapper>
            <Breadcrumb onClick={breadcrumbLink}>
              <Chevron size={24} name="chevron" />
              {breadcrumbLabel}
            </Breadcrumb>
            <Box classes="top1 top3Md">
              <Typography variant="h1">
              Checkout
              </Typography>
            </Box>
            <Box classes="top1">
              <MetaContent>
                <Typography variant="meta1">
                  {`Order #: ${orderId}`}
                </Typography>
              </MetaContent>
            </Box>
            <HideDesktop>
              <HeaderSummary>
                <Typography variant="metaTitle">{`${quantity} ${styleName}`}</Typography>
                <Total>{formatCurrency(total)}</Total>
              </HeaderSummary>
            </HideDesktop>
          </OrderDetailHeaderWrapper>
        </Container>
      </OrderDetailHeaderBackground>
    );
  }
}

export default withTheme(CheckoutHeader);
