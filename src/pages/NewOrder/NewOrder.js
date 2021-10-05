import React, { Component } from 'react';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { connect } from 'react-redux';
import { createOrder, resetNewOrder, applyNewOrderToSelected } from '@/store/actions/orders';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/constants';
import { ProductOrder } from '@/utils/constants/lookups';

import { Tier } from '@/components/ui/Layout/Tier';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import NewOrderCard from './NewOrderCard';
import Box from '@/components/ui/Layout/Box/Box';
import Icon from '@/components/ui/Icons/Icon';
import ProductDesignImages from '@/pages/ProductDesign/ProductDesignImages';
import { fetchOrder } from '../../store/actions/orders';

const LoginHeader = styled.div`
  padding-bottom: ${rhythm(3)};

  ${media.lg`
    padding-bottom: ${rhythm(7)};
  `}
`;

const Products = styled.div`
  ${media.md`
    display: flex;
    flex-direction: row;
    ${props => props.wrap ? 'flex-wrap: wrap;' : ''}
    margin: -${rhythm(2)} -${rhythm(2)};
  `}
`;

const NewOrderTier = styled(Tier)`
  background-color: ${props => props.theme.color_grey_1};
`;

const BackLink = styled(Link)`
  align-items: center;
  display: inline-flex;
`;

export class NewOrder extends Component {
  constructor() {
    super();

    this.state = {
      newOrderPending: false,
      imagesCreated: false,
      maleImage: null,
      femaleImage: null,
      selectedProduct: null,
      loadedDuplicate: false,
    };
  }

  componentWillUnmount() {
    this.props.resetNewOrder();
  }

  handleNewOrder(e, _product, duplicateSource) {
    e && e.preventDefault();

    const product = !duplicateSource ? _product : this.props.products[duplicateSource.style_no];

    this.setState({
      selectedProduct: product,
    }, () => {
      this.props.applyNewOrderToSelected(this.state.selectedProduct, this.props.user.id, this.props.user.storeNo, duplicateSource).finally(() => {
        this.setState({
          newOrderPending: true,
        });
      });
    });
  }

  handleImagesGenerated(male, female) {
    this.setState({
      imagesCreated: true,
      maleImage: male,
      femaleImage: female,
    });

    this.props.createOrder(this.props.order, this.props.user.id, this.props.user.storeNo, male, female);
  }

  renderNewOrder(product, idx) {
    if (!product) return;

    return (
      <NewOrderCard
        key={idx}
        handleNewOrder={(e, product) => this.handleNewOrder(e, product)}
        product={product}
      />
    );
  }

  renderContents(products) {
    return (
      <NewOrderTier height='full'>
        <Container>
          <LoginHeader>
            <BackLink to={ROUTES.ORDERS}>
              <Icon size={24} name="chevron"></Icon>
              <Typography variant="meta1" weight="bold">
                BACK
              </Typography>
            </BackLink>
            <Box classes="top2 bottom3">
              <Typography variant="h1">
                Select a Product
              </Typography>
            </Box>
            <Products wrap={products && Object.keys(products).length > 3}>
              {products && ProductOrder.map((key, i) =>
                this.renderNewOrder(products[key], i)
              )}
              { // if odd number of products we still want the last product to behave as if two products were
                // in the row on desktop
                Object.keys(products).length % 2
                ? <NewOrderCard
                  key={-1}
                  isNegativeSpace={true}
                />
                : null
              }
            </Products>
          </LoginHeader>
        </Container>
      </NewOrderTier>
    )
  }

  render() {
    const { savedOrder, saveOrderSuccess, products, order, dupeGroupId } = this.props;
    const { newOrderPending } = this.state;

    if (!products || Object.keys(products).length < 1) return null;

    if (saveOrderSuccess) {
      return <Redirect push to={`${ROUTES.ORDER}/${savedOrder.groupId}`} />;
    }

    //if duplicate order group id is present, this implies user wants to duplicate that order
    if (dupeGroupId && !newOrderPending) {

      // fetch desired order
      if (!this.state.loadedDuplicate) {
        this.props.fetchOrderForDuplication(dupeGroupId);
        this.setState({loadedDuplicate: true});
      }

      if (!order || !order.order || !order.order.groupId || !order.order.order || order.order.groupId !== dupeGroupId) {
        return null;
      }

      this.handleNewOrder(null, null, order.order.order.orderSubs[0]);
    }

    return (
      <>
        {
          !newOrderPending ? this.renderContents(products) : null
        }
        { newOrderPending && order &&
          <ProductDesignImages onImagesCreated={(male, female) => this.handleImagesGenerated(male, female)} />
        }
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createOrder: (order, userId, storeId, maleImage, femaleImage) => dispatch(createOrder(order, userId, storeId, maleImage, femaleImage)),
  resetNewOrder: () => dispatch(resetNewOrder()),
  applyNewOrderToSelected: (product, userId, storeId, duplicateSource) => dispatch(applyNewOrderToSelected(product, userId, storeId, duplicateSource)),
  fetchOrderForDuplication: groupId => dispatch(fetchOrder(groupId)),
});

const mapStateToProps = state => {
  return {
    products: state.styles.jackets,
    savedOrder: state.newOrder.savedOrder,
    saveOrderSuccess: state.newOrder.saveOrderSuccess,
    user: state.account.user,
    order: state.selectedOrder,
    dupeGroupId: state.dupeDesign.groupId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
