import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import media from '@/utils/media';
import {formatStyleName, rhythm} from '@/utils/helpers';
import { todaysDate } from '@/utils/dates';
import { Hr, HideMobile, ShowMobile } from '@/components/ui/Utils';
import Typography from '@/components/ui/Typography/Typography';
import CheckoutCta from '@/components/ui/Checkout/CheckoutCta';
import Box from '@/components/ui/Layout/Box/Box';
import { STATUS_LITERALS, STATUS_ENUMS } from '@/utils/constants/constants';

const OrderSubmittedPage = styled.div`
  ${media.md`
    margin-top: ${rhythm(5)};
  `}

  ${media.lg`
    margin-top: ${rhythm(4)};
  `}
`;

const OrderSubmittedWrapper = styled.div`
  background-color: ${props => props.theme.color_white};
  padding: ${rhythm(3)} ${rhythm(2)} 0;

  ${media.md`
    margin-bottom: ${rhythm(-1)};
    margin-top: ${rhythm(4)};
    padding: ${rhythm(3)} ${rhythm(3)} 0;
  `}

  ${media.lg`
    margin-bottom: 0;
  `}
`;

const OrderSubmittedDetailsTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderSubmittedDetailsBottom = styled.div`
  padding-bottom: ${rhythm(3)};

  ${media.md`
    display: flex;
    justify-content: space-between;
    max-width: 65rem;
    width: 80%;
  `}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${rhythm(2)};

  ${media.md`
    padding-bottom: 0;
  `}
`;

const SectionTop = styled(Section)`
  ${media.md`
    padding-bottom: ${rhythm(3)};
  `}
`;

const SubmittedTag = styled.div`
  background-color: ${props => props.error ? props.theme.color_yellow_3 : props.theme.color_purple};
  border-radius: 1rem;
  margin-bottom: ${rhythm(1)};
  padding: ${rhythm(0.25)} ${rhythm(2)};
  text-align: center;
  text-transform: uppercase;

  ${media.md`
    border-radius: 1.5rem;
    padding: ${rhythm(0.5)} ${rhythm(2)}};
  `}
  ${media.lg`
    padding: ${rhythm(0.75)} ${rhythm(3)}};
  `}
`;

const MetaTitle = styled(Typography)`
  font-weight: ${props => props.theme.font_weight_semi_bold};
`;

const Subheading = styled.div`
  ${media.md`
    padding-bottom: ${rhythm(1)};
  `}
`;

const OrderSubmitted = ({
  isVisible,
  handleFormSubmit,
  isButtonDisabled,
  summary,
  order,
  shippingInfo,
  backToOrders,
  paymentError,
}) => {

  const styleName =
    summary.styleName.toLowerCase().includes('wind breaker')
      ? formatStyleName(summary.styleName)
      : summary.styleName;

  const orderSummary = `${summary.quantity} ${styleName}`;
  const headerText = paymentError ? 'Your order has been submitted, but there was an issue with your payment.' : 'Your order has been submitted!';
  const status = paymentError ? STATUS_LITERALS[STATUS_ENUMS.UNPAID] : STATUS_LITERALS[STATUS_ENUMS.PAID];

  return isVisible && (
    <OrderSubmittedPage>
      <HideMobile>
        <Typography variant="h1">
          {headerText}
        </Typography>
      </HideMobile>
      <OrderSubmittedWrapper>
        <ShowMobile>
          <Typography variant="h1">
            {headerText}
          </Typography>
          <Box classes="flats3">
            <Hr />
          </Box>
        </ShowMobile>
        <OrderSubmittedDetailsTop>
          <SectionTop>
            <Subheading>
              <Typography variant="h2">{`#${order.groupId}`}</Typography>
            </Subheading>
            <Typography variant="meta1">{orderSummary}</Typography>
          </SectionTop>
          <Section>
            <SubmittedTag error={paymentError}>
              <Typography variant="meta3">
                {status}
              </Typography>
            </SubmittedTag>
            <ShowMobile>
              <MetaTitle variant="metaTitle">Submitted Just Now</MetaTitle>
            </ShowMobile>
          </Section>
        </OrderSubmittedDetailsTop>
        <OrderSubmittedDetailsBottom>
          <Section>
            <MetaTitle variant="metaTitle">Invoice Number:</MetaTitle>
            <Typography variant="meta1"></Typography>
          </Section>
          <Section>
            <MetaTitle variant="metaTitle">Customer Email</MetaTitle>
            <Typography variant="meta1">{shippingInfo.email}</Typography>
          </Section>
          <Section>
            <HideMobile>
              <Section>
                <MetaTitle variant="metaTitle">Last Updated</MetaTitle>
                <Typography variant="meta1">{todaysDate}</Typography>
              </Section>
            </HideMobile>
          </Section>
        </OrderSubmittedDetailsBottom>
      </OrderSubmittedWrapper>
      <CheckoutCta
        onClick={backToOrders}
        text="My Orders"
        disabled={isButtonDisabled}
      />
    </OrderSubmittedPage>
  );
};

export default withRouter(withTheme(OrderSubmitted));
