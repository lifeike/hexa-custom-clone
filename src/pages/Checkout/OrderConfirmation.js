import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import OrderDetailSummary from '@/components/ui/OrderDetail/OrderDetailSummary';
import Typography from '@/components/ui/Typography/Typography';
import CheckoutCta from '@/components/ui/Checkout/CheckoutCta';
import ShippingTimeline from '@/components/ui/ShippingTimeline/ShippingTimeline';
import Box from '@/components/ui/Layout/Box/Box';
import ReviewDesign from '@/components/ui/ReviewDesign/ReviewDesign';
import Toggler from '@/components/ui/Toggler';
import StandardModal from '@/components/ui/Modal/StandardModal';
import OrderDetailItem from '@/components/ui/OrderDetail/OrderDetailItem';
import Icon from '@/components/ui/Icons/Icon';

const ConfirmationFormWrapper = styled.div`
  padding-top: ${rhythm(2)};
`;

const SectionBorder = styled.div`
  border: ${rhythm(0.5)} solid  ${props => props.theme.color_grey_0};
  margin: 0 ${rhythm(-2)};

  ${media.md`
    ${props => props.showMd ? 'border-width: 0.1rem;' : 'none;'}
    margin: 0;
  `}
`;

const Section = styled.div`
  padding: ${rhythm(4)} 0;
`;

const PaymentSection = styled.div`
  padding-top: ${rhythm(3)};
`;

const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : rhythm(3)};
`;

const Detail = styled(Typography)`
  display: block;
`;

const SubText = styled.span`
  color: ${props => props.theme.color_grey_dark_1};
  font-size: 1.4rem;
  line-height: 1.43;
`;

const BillingDisclaimer = styled(SubText)`
  width: 50%;
`;

const Plus = styled(Icon)`
  margin-left: 0.8rem;
`;

export class ConfirmationForm extends Component {
  backToCart = () => {
    const groupId = this.props.match.params.groupId;

    return this.props.history.push(`/order/${groupId}`);
  }

  renderSectionHeader(title, onClick, paddingBottom) {
    return (
      <SectionHeader paddingBottom={paddingBottom}>
        <Typography variant="h3">{title}</Typography>
        <button onClick={onClick}>
          <Typography variant="link">Edit</Typography>
        </button>
      </SectionHeader>
    );
  }

  renderDetail(value, variant) {
    return <Detail variant={variant}>{value}</Detail>;
  }

  renderOrderSummary() {
    const { summary, groupId } = this.props;

    return (
      <>
        <OrderDetailSummary
          isSubmitted={true}
          order={summary}
          groupId={groupId}
          hideCheckout={true}
          hideHRule={true}
          hideTimeline={true}
        />
        <BillingDisclaimer>You will be invoiced for the full amount after the order is approved by our production team.</BillingDisclaimer>
      </>
    );
  }

  renderOrderSummarySection() {
    return (
      <div>
        <SectionBorder showMd={true}></SectionBorder>
        <Section>
          {this.renderSectionHeader('Order Summary', this.backToCart)}
          {this.renderOrderSummary()}
        </Section>
      </div>
    );
  }

  renderDetailsButton() {
    return (
      <button>
        <SubText>View Design Details</SubText>
        <Plus size={9} name="plus"></Plus>
      </button>
    );
  }

  renderOrderDetails() {
    const { subOrders } = this.props;

    return (
      <div>
        <SectionBorder showMd={true}></SectionBorder>
        <Section>
          {this.renderSectionHeader('Order Details', this.backToCart, '0.8rem')}
          <Toggler>
            {([toggled, onToggle]) => (
              <div>
                <button onClick={() => onToggle(true)}>
                  <SubText>View Design Details</SubText>
                  <Plus size={9} name="plus"></Plus>
                </button>
                <StandardModal
                  toggle={toggled}
                  onAfterClose={() => onToggle(false)}
                >
                  {toggled &&
                    <ReviewDesign />
                  }
                </StandardModal>
              </div>
            )}
          </Toggler>
          <Box classes="top4">
            {subOrders && subOrders.map((sub, idx) => {
              return (
                <OrderDetailItem
                  key={idx}
                  canDelete={false}
                  item={sub}
                  isSubmitted={true}
                  backgroundColor={'color_grey_1'}
                />
              );
            })

            }
          </Box>
        </Section>
      </div>
    );
  }

  renderShippingSection() {
    const { shippingInfo, editForm } = this.props;
    const fullName = `${shippingInfo.firstName} ${shippingInfo.lastName}`;
    const shippingAddress = `${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}`;

    return (
      <div>
        <SectionBorder showMd={true}></SectionBorder>
        <Section>
          {this.renderSectionHeader('Shipping', () => editForm(1))}
          <>
            {this.renderDetail('Shipping Address', 'metaTitle')}
            {this.renderDetail(fullName, 'meta1')}
            {this.renderDetail(shippingInfo.address, 'meta1')}
            {this.renderDetail(shippingAddress, 'meta1')}
          </>
          <Box classes="top3">
            <ShippingTimeline isOpen={false} />
          </Box>
        </Section>
      </div>
    );
  }

  renderPaymentSection() {
    const { editForm, paymentInfo } = this.props;

    if (!paymentInfo || !paymentInfo.token) return null;

    const creditCardType = paymentInfo.token.card.brand;
    const lastFourDigits = paymentInfo.token.card.last4;
    const paymentMethod = `${creditCardType} ending in ${lastFourDigits}`;

    return (
      <div>
        <SectionBorder showMd={true}></SectionBorder>
        <PaymentSection>
          {this.renderSectionHeader('Payment Method', () => editForm(2))}
          {this.renderDetail(paymentMethod, 'meta1')}
        </PaymentSection>
      </div>
    );
  }

  renderCta() {
    const { handleFormSubmit } = this.props;
    const isButtonDisabled = false;

    return (
      <CheckoutCta
        onClick={event => handleFormSubmit(event)}
        text="Submit Order"
        disabled={isButtonDisabled}
      />
    );
  }

  render() {
    const { isVisible, onlyPayment } = this.props;

    return isVisible && (
      <ConfirmationFormWrapper>
        {this.renderOrderSummarySection()}
        {this.renderOrderDetails()}
        {!onlyPayment && this.renderShippingSection()}
        {this.renderPaymentSection()}
        {this.renderCta()}
      </ConfirmationFormWrapper>
    );
  }
}

export default withRouter(withTheme(ConfirmationForm));
