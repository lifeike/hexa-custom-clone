import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Sticky from 'react-sticky-fill';
import {Elements, StripeProvider} from 'react-stripe-elements';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { fetchOrder, convertToOrder, checkout } from '@/store/actions/orders';
import { handleFormSubmit } from '@/utils/form';
import { getSummary } from '@/store/selectors/order';
import { getSubOrders } from '@/store/selectors/subOrder';
import { addShippingInfo, addPaymentInfo } from '@/store/actions/checkout';
import { HideTablet, StickyTop } from '@/components/ui/Utils';
import { CHECKOUT_ERRORS, ERRORS, STATUS_LITERALS, ROUTES } from '@/utils/constants/constants';
import { applicationError } from '@/store/actions/error';

import CheckoutHeader from '@/components/ui/Checkout/CheckoutHeader';
import OrderConfirmation from './OrderConfirmation';
import OrderSubmitted from './OrderSubmitted';
import PaymentInfoForm from '@/components/ui/Forms/PaymentInfoForm';
import ShippingInfoForm from '@/components/ui/Forms/ShippingInfoForm';
import Typography from '@/components/ui/Typography/Typography';
import OrderDetailSummary from '@/components/ui/OrderDetail/OrderDetailSummary';
import Container from '@/components/ui/Layout/Container';
import Accordion from '@/components/ui/Accordion/Accordion';
import visa from '@/assets/images/credit_cards/visa.png';
import masterCard from '@/assets/images/credit_cards/masterCard.png';
import amex from '@/assets/images/credit_cards/amex.png';
import discover from '@/assets/images/credit_cards/discover.png';
import InventoryCheck from '../../components/ui/Checkout/InventoryCheck';
import Box from '@/components/ui/Layout/Box/Box';

const OrderDetailWrapper = styled.div`
  flex-grow: 1;

  ${media.md`
    background-color: ${props => props.theme.color_grey_1};
  `}
`;

const OrderDetailMain = styled.div`
  position: relative;

  ${media.md`
    flex-direction: row;
    display: flex;
    margin: ${rhythm(5)} 0;
  `}
  ${media.lg`
    margin: ${rhythm(2)} 0 ${rhythm(5)};
  `}
`;

const OrderDetailCenter = styled.div`
  position: relative;

  ${media.md`
    flex: 2;
  `}
  ${media.lg`
    padding-right: ${rhythm(2)};
  `}
`;

const OrderDetailSide = styled.div`
  position: relative;

  ${media.lg`
    flex: 1;
  `}
`;

const OrderSummaryAccordions = styled.div`
  > * + * {
    padding-top: .2rem;
  }
`;

const CheckoutInfo = styled.div`
  background-color: ${props => props.theme.color_white};
  padding: 0 ${rhythm(2)} ${rhythm(5)} ${rhythm(2)};

  ${media.md`
    padding: ${rhythm(4)};
  `}
`;

const CardContainer = styled.div`
  margin-bottom: ${rhythm(-2)};
  padding-top: ${rhythm(2)};
`;

const ImageWrapper = styled.div`
  border: 1px solid ${props => props.theme.color_grey_2};
  display: inline-block;
  margin-right: ${rhythm(1.5)};
  height: 25px;
  width: 40px;
`;

const MetaTitle = styled.div`
  display: block;
  padding-bottom: ${rhythm(1)};
`;

const ErrorContainer = styled(Box)`
  background-color: ${props => props.theme.color_light_red_1};
  color: ${props => props.theme.color_red};
  font-size: 1.4rem;
  line-height: 1.29;
`;

const EditLink = styled.span`
  color: ${props => props.theme.color_darkest};
  cursor: pointer;
  display: flex;
  font-size: 1.4rem;
  padding-top: 1.6rem;
  line-height: 1.71;
  text-decoration: underline;
  width: fit-content;
`;

const CREDIT_CARDS = [
  { src: visa, alt: 'Visa accepted' },
  { src: masterCard, alt: 'MasterCard accepted' },
  { src: amex, alt: 'American Express accepted' },
  { src: discover, alt: 'Discover accepted' },
];

export class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      currentStep: 1,
      orderComplete: false,
      steps: {
        '0': 'cart',
        '1': 'shipping',
        '2': 'payment',
        '3': 'confirmation',
        '4': 'submitted',
      },
      forms: {
        cart: {
          hidden: true,
          step: 0,
          name: 'Cart',
          breadcrumbLabel: 'cart',
        },
        shipping: {
          step: 1,
          name: 'Shipping Address',
          breadcrumbLabel: 'shipping',
          form: ShippingInfoForm,
          ctaText: '',
        },
        payment: {
          step: 2,
          name: 'Payment',
          ctaText: 'Payment',
          breadcrumbLabel: 'payment',
          form: PaymentInfoForm,
        },
        confirmation: {
          step: 3,
          name: 'Confirmation',
          ctaText: 'Confirm Order',
          breadcrumbLabel: 'confirmation',
          form: OrderConfirmation,
          summary: true,
        },
        submitted: {
          step: 4,
          form: OrderSubmitted,
          ctaText: '',
        },
      },
      loadingCheckout: false,
      shippingError: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.ready && props.order) {
      const forms = state.forms;

      const onlyPayment = STATUS_LITERALS[props.order.order.status] === 'UNPAID';

      if (onlyPayment) {
        forms.payment.breadcrumbLabel = 'Order';
      }

      return {
        ready: true,
        currentStep: onlyPayment ? 2 : 1,
        onlyPayment: onlyPayment,
        forms: forms,
      };
    }

    return null;
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;

    this.props.fetchOrder(groupId);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.shippingError) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);
    }
  }

  getKeys = values => Object.keys(values);

  goBack = () => {
    const { currentStep, onlyPayment } = this.state;
    const groupId = this.props.match.params.groupId;

    if (currentStep === 1 || (onlyPayment && currentStep === 2)) {
      return this.props.history.push(`/order/${groupId}`);
    }

    return this.setState({ currentStep: this.getNextStep(-1) });
  }

  handleEditForm = number => {
    this.setState({ currentStep: number });
  }

  handleFormSubmit = (event, values) => {
    const { currentStep, steps, onlyPayment } = this.state;

    event.preventDefault();

    handleFormSubmit(event, this, {
      callback: () => this.updateCheckoutInfo(values),
    });

    if (steps[currentStep] === 'confirmation') {
      onlyPayment ? this.checkout() : this.convertToOrder();
    }
    else {
      this.setState({ currentStep: this.getNextStep(1) });
      window.scrollTo(0, 0);
    }
  }

  checkout() {
    const { applicationError } = this.props;

    this.props.makePayment(this.props.order.order.order_no).then(() => {
      this.setState({
        orderComplete: true,
        currentStep: this.getNextStep(1),
      });
    }).catch(() => {
      applicationError(ERRORS.GENERAL_ERROR);
    });
  }

  getNextStep(step) {
    const { currentStep } = this.state;
    const { billingStatus } = this.props.order;

    let next = currentStep + step;

    if (next === 2 && billingStatus === 'true') {
      next += step;
    }

    return next;
  }

  convertToOrder() {
    this.setState({
      loadingCheckout: true,
    });
    this.props.convertToOrder(this.props.summary.shippingCost).then(() => {
      this.setState({
        orderComplete: true,
        currentStep: this.getNextStep(1),
      });
    }).catch(() => {
      this.handleError();
    });
  }

  handleError() {
    const { applicationError, checkout: { failure } } = this.props;

    switch(failure.type) {
    // Move to the checkout success page with messaging about error.
    case CHECKOUT_ERRORS.PAYMENT:
      this.setState({
        orderComplete: true,
        loadingCheckout: false,
        currentStep: this.getNextStep(1),
      });
      break;
      //Leave the modal up, with messaging in the modal regarding inventory errors
    case CHECKOUT_ERRORS.INVENTORY:
      this.setState({
        inventoryErrors: failure.lowInventoryItems,
      });
      break;
      //Close Modal show on page error link to shipping.
    case CHECKOUT_ERRORS.SHIPPING:
      this.setState({
        loadingCheckout: false,
        shippingError: true,
      });
      break;
      // Close modal, display application error.
    default:
      this.setState({
        loadingCheckout: false,
      });
      applicationError(ERRORS.GENERAL_ERROR);
    }
  }

  /**
   * Handle convert to cart success.
   */
  handleConvertToOrderSuccess() {
    this.setState({
      orderComplete: true,
      currentStep: this.getNextStep(1),
    });
  }

  updateCheckoutInfo(values) {
    const { currentStep } = this.state;
    const { addShippingInfo, addPaymentInfo } = this.props;

    return new Promise(resolve=> {
      switch (currentStep) {
      case 1:
        addShippingInfo(values).then(() => {
          resolve();
        });
        break;
      case 2:
        addPaymentInfo(values).then(() => {
          resolve();
        });
        break;
      default:
        resolve();
      }
    });
  }

  renderImages() {
    return CREDIT_CARDS.map(card => {
      return (
        <ImageWrapper key={card.src} >
          <img src={card.src} alt={card.alt} width='100%' />
        </ImageWrapper>
      );
    });
  }

  renderCardSection() {
    return (
      <CardContainer>
        <MetaTitle>
          <Typography variant="metaTitle" weight="600">
            We accept:
          </Typography>
        </MetaTitle>
        {this.renderImages()}
      </CardContainer>
    );
  }

  renderHeader() {
    const { forms, steps } = this.state;
    const { summary } = this.props;
    const breadcrumbLabel = forms[steps[this.getNextStep(-1)]].breadcrumbLabel;

    return (
      <CheckoutHeader
        summary={summary}
        breadcrumbLabel={breadcrumbLabel}
        breadcrumbLink={this.goBack}
      />
    );
  }

  renderForms() {
    const { forms, currentStep, orderComplete, onlyPayment, steps } = this.state;
    const { summary, checkout, order, history, billingStatus, subOrders } = this.props;
    const groupId = this.props.match.params.groupId;
    const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;

    return this.getKeys(forms).map(form => {

      const FORM = forms[form].form;

      if (forms[form].hidden) return null;

      const step = steps[this.getNextStep(1)];

      const ctaText = step ? forms[step].ctaText : '';

      return (
        FORM === PaymentInfoForm ?
          <StripeProvider apiKey={stripeToken} key={form}>
            <Elements>
              <PaymentInfoForm
                key={form}
                ctaText={ctaText}
                handleFormSubmit={this.handleFormSubmit}
                groupId={groupId}
                paymentInfo={checkout.paymentInfo}
                shippingInfo={checkout.shippingInfo}
                summary={summary}
                editForm={this.handleEditForm}
                currentStep={currentStep}
                getKeys={this.getKeys}
                isVisible={currentStep === forms[form].step}
              />
            </Elements>
          </StripeProvider>
          :
          <FORM
            key={form}
            billMonthly={billingStatus}
            ctaText={ctaText}
            handleFormSubmit={this.handleFormSubmit}
            groupId={groupId}
            paymentInfo={checkout.paymentInfo}
            shippingInfo={checkout.shippingInfo}
            summary={summary}
            editForm={this.handleEditForm}
            currentStep={currentStep}
            getKeys={this.getKeys}
            isVisible={currentStep === forms[form].step}
            orderComplete={orderComplete}
            onlyPayment={onlyPayment}
            order={order}
            subOrders={subOrders}
            paymentError={checkout.failure && checkout.failure.type === CHECKOUT_ERRORS.PAYMENT}
            backToOrders={() => history.push(`/orders`)}
          />
      );
    });
  }

  renderSummaryAccordions() {
    const { summary } = this.props;
    const groupId = this.props.match.params.groupId;

    return (
      <OrderSummaryAccordions>
        <Accordion title="Order Summary" openByDefault>
          <OrderDetailSummary
            isSubmitted={true}
            order={summary}
            groupId={groupId}
            hideTimeline={true}
            hideCheckout={true}
          />
        </Accordion>
      </OrderSummaryAccordions>
    );
  }

  renderSuccessForm() {
    return (
      <OrderDetailWrapper>
        <Container>
          {this.renderForms()}
        </Container>
      </OrderDetailWrapper>
    );
  }

  renderPage() {
    const {
      currentStep,
      steps,
      forms,
      orderComplete,
      loadingCheckout,
      inventoryErrors,
      shippingError,
    } = this.state;

    const { order : { billingStatus } } = this.props;

    let sequentialStep = currentStep;

    if (currentStep === 3 && billingStatus === 'true') {
      sequentialStep -= 1;
    }

    const currentForm = steps[currentStep];
    const stepTitle = `${sequentialStep}. ${forms[currentForm].name}`;
    const groupId = this.props.match.params.groupId;

    return !orderComplete ? (
      <>
        <OrderDetailWrapper>
          {this.renderHeader()}
          <Container md>
            <OrderDetailMain>
              <OrderDetailCenter>
                <CheckoutInfo>
                  {(shippingError && currentStep === 3) &&
                    <Box classes="bottom3">
                      <ErrorContainer classes="2">
                        The shipping address is undeliverable. Please review your information and try again.
                        <div>
                          <button onClick={() => {
                            this.setState({
                              shippingError: null,
                              currentStep: 1,
                            });
                          }}>
                            <EditLink>
                          Edit Shipping Address
                            </EditLink>
                          </button>
                        </div>
                      </ErrorContainer>
                    </Box>
                  }
                  <Typography variant="h2">{stepTitle}</Typography>
                  {currentStep === 2 && this.renderCardSection()}
                  {this.renderForms()}
                </CheckoutInfo>
              </OrderDetailCenter>
              <OrderDetailSide>
                {currentStep <= 2 &&
                  <Sticky>
                    <StickyTop>
                      <HideTablet>
                        {this.renderSummaryAccordions()}
                      </HideTablet>
                    </StickyTop>
                  </Sticky>
                }
              </OrderDetailSide>
            </OrderDetailMain>
          </Container>
        </OrderDetailWrapper>
        <InventoryCheck
          isOpen={loadingCheckout && !orderComplete}
          failedInventoryItems={inventoryErrors}
          groupId={groupId}></InventoryCheck>

      </>
    ) : this.renderSuccessForm();
  }

  render() {
    const { order } = this.props;
    const { currentStep, steps, forms } = this.state;
    const currentForm = steps[currentStep];

    if (!order || forms[currentForm] === undefined) {
      return null;
    }

    if (order.order.status && order.order.status > 99) {
      return (
        <Redirect push to={`${ROUTES.ORDER}/${this.props.match.params.groupId}`} />
      );
    }

    return this.renderPage();
  }
}

const mapStateToProps = (state, props) => {
  return {
    order: state.selectedOrder.order,
    summary: getSummary(state.selectedOrder.order),
    checkout: state.checkout,
    account: state.account,
    subOrders: getSubOrders(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchOrder: groupId => dispatch(fetchOrder(groupId)),
  addShippingInfo: data => dispatch(addShippingInfo(data)),
  addPaymentInfo: data => dispatch(addPaymentInfo(data)),
  convertToOrder: shippingCost => dispatch(convertToOrder(shippingCost)),
  makePayment: orderId => dispatch(checkout(orderId)),
  applicationError: message => dispatch(applicationError(message)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
