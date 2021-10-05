import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { GetString, SizeTranslations } from '@/utils/constants/lookups';
import { updateQuantity, deleteCartSub } from '@/store/actions/orders';

import Toggler from '@/components/ui/Toggler';
import StandardModal from '@/components/ui/Modal/StandardModal';
import Container from '@/components/ui/Layout/Container';
import Typography from '@/components/ui/Typography/Typography';
import Box from '@/components/ui/Layout/Box/Box';
import OrderDetailItemOptions from './OrderDetailItemOptions';
import { ModalConfirmButton, ModalCancelButton, HorizontalButtonContainer } from '@/components/ui/Buttons/Buttons';
// import ProductDesignImages from '@/pages/ProductDesign/ProductDesignImages';
import TextInput from '@/components/ui/Inputs/TextInput';
import createInitialInputState from '@/utils/input';
import { INPUTS } from '@/utils/constants/constants';


const OrderItem = styled.div`
  background-color: ${props => props.theme[props.backgroundColor] || props.theme.color_white};
  margin-top: .2rem;
  padding: ${rhythm(2.5)} ${rhythm(2)};

  ${media.md`
    padding: ${rhythm(2)} ${rhythm(3)};
  `}
`;

const GenderHeader = styled(Typography)`
  display: inline-block;
`;

const MaxWidth = styled.div`
  width: ${props => props.width}rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  position: relative;
`;

const HeaderContent = styled(Box)`
  align-items: center;
  display: flex;
`;

const UpdateButton = styled.button`
  bottom: -3.8rem;
  padding: 1rem 0;
  position: absolute;
  right: 0;
  text-decoration: underline;
`;

const QuantityInput = styled(TextInput)`
  border: none;
  color: ${props => props.theme.color_grey_dark_1};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
  padding: .7rem 0;
  text-align: center;
  width: 4.6rem;
`;

const QuantityInputwrapper = styled.div`
`;

const ButtonText = styled.span`
  font-size: 1.6rem;
  font-weight: bold;

  ${media.md`
    width: 9.5rem;
  `}
`;

class OrderDetailItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: +props.item.cartSub.quantity || 0,
      originalValue: +props.item.cartSub.quantity || 0,
      maleImage: null,
      femaleImage: null,
      imagesGenerated: true,
      loading: false,
      submitted: false,
      'formIsValid': false,
      'formIsActive': false,
      'formInputs': {
        'quantity': createInitialInputState(this, {
          'name': 'quantity',
          'type': INPUTS.NUMBER,
          'label': '',
          'defaultValue': +props.item.cartSub.quantity,
          'validationRules': {
            'isRequired': false,
            'numbersOnly': true,
            'positiveNumber': true,
          },
        }),
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        value: +this.props.item.cartSub.quantity || 0,
        originalValue: +this.props.item.cartSub.quantity || 0,
      });
    }
  }

  quantityBoundary(val = 0) {
    return Math.round(Math.abs(val));
  }

  handleChange(e) {
    this.setState({
      value: this.quantityBoundary(e.target.value.replace(/^0+/, '')) || 1,
      submitted: false,
    });
  }

  handleBlur(e) {
    // set input back to safe value
    e.target.value = this.state.value;
  }

  handleDelete (callback) {
    this.props.deleteCartSub(this.props.match.params.groupId, this.props.item.id, this.props.item.cartSub.cartSubNo).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  tryAddSize() {
    this.props.updateQuantity(this.props.match.params.groupId, this.props.item.id, this.props.item.cartSub.cartSubNo, this.state.value).then(() => {
      this.setState({
        originalValue: this.state.value,
      });
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    // Copy temp value to subOrder.
    this.props.item.cartSub.quantity = this.state.value;

    // only submit if form is valid
    if (this.state.value > 0) {
      this.setState({
        submitted: true,
      }, this.tryAddSize);
    }
  }

  genderName(gender) {
    let genderName = gender.replace('?',"'");

    if (!genderName.includes("'")) {
      genderName = `${gender}'s`;
    }

    return genderName;
  }

  render() {
    const { item: {viewData}, isSubmitted, canDelete, backgroundColor } = this.props;
    const {
      formInputs: {
        quantity: quantityInputProps,
      },
      value,
      originalValue,
    } = this.state;

    return (
      <>
        <OrderItem backgroundColor={backgroundColor}>
          <Header>
            <HeaderContent classes="bottom3">
              <GenderHeader display="inlineBlock" variant="h3">
                {this.genderName(viewData.gender.name)} - {GetString(viewData.size.name, SizeTranslations)}
              </GenderHeader>
              {!isSubmitted &&
                <Toggler>
                  {([toggled, onToggle]) => (
                    <>
                      <Box classes="inlineBlock left2">
                        <OrderDetailItemOptions handleDelete={() => onToggle(true)}/>
                      </Box>
                      <StandardModal
                        toggle={toggled}
                        onAfterClose={() => onToggle(false)}
                      >
                        <Container>
                          <Box classes="top3 top5Md bottom2">
                            <Typography variant="h1">
                              Delete Size?
                            </Typography>
                          </Box>
                          {canDelete ?
                            <Typography variant="body">
                              Are you sure you want to remove this size?
                            </Typography>
                            :
                            <Typography variant="body">
                              You must add a different size before deleting this size.
                            </Typography>
                          }
                          <Box classes="top4 bottom2 bottom4Md">
                            <HorizontalButtonContainer>
                              <ModalCancelButton onClick={() => onToggle(false)}>
                                <ButtonText>
                                  Cancel
                                </ButtonText>
                              </ModalCancelButton>
                              {canDelete &&
                                <ModalConfirmButton onClick={() => this.handleDelete(onToggle(false))}>
                                  <ButtonText>
                                    Delete
                                  </ButtonText>
                                </ModalConfirmButton>
                              }
                            </HorizontalButtonContainer>
                          </Box>
                        </Container>
                      </StandardModal>
                    </>
                  )}
                </Toggler>
              }
            </HeaderContent>
            {!isSubmitted &&
            <QuantityInputwrapper>
              <Form onSubmit={e => {e.preventDefault();}}>
                <Box inline classes="right1">
                  <label>
                    <Typography variant="metaTitle">Quantity:</Typography>
                  </label>
                </Box>
                <QuantityInput {...quantityInputProps} onChange={ e => this.handleChange(e) } onBlur={ e => this.handleBlur(e) }/>
                {value !== originalValue &&
                <UpdateButton onClick={(e) => this.handleUpdate(e)}>
                  <Typography variant="link">Update</Typography>
                </UpdateButton>
                }
              </Form>
            </QuantityInputwrapper>
            }
          </Header>
          <Content>
            <MaxWidth width="6.5">
              <Typography variant="metaTitle">Fit</Typography>
              <Typography block variant="meta1">{GetString(viewData.fit.name, SizeTranslations)}</Typography>
            </MaxWidth>
            <Box classes="left4 left7Lg">
              { viewData.sleeve.name &&
                <MaxWidth width="8.5">
                  <Typography variant="metaTitle">Sleeve</Typography>
                  <Typography block variant="meta1">{GetString(viewData.sleeve.name, SizeTranslations)}</Typography>
                </MaxWidth>
              }
            </Box>
            {isSubmitted &&
            <Box classes="left4 left7Lg">
              <MaxWidth width="8.5">
                <Typography variant="metaTitle">Quantity</Typography>
                <Typography block variant="meta1">{viewData.quantity}</Typography>
              </MaxWidth>
            </Box>
            }
          </Content>
        </OrderItem>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateQuantity: (groupId, cartId, cartSubId, quantity) => dispatch(updateQuantity(groupId, cartId, cartSubId, quantity)),
  deleteCartSub: (groupId, cartId, cartSubId) => dispatch(deleteCartSub(groupId, cartId, cartSubId)),
});

export default withRouter(connect(null, mapDispatchToProps)(OrderDetailItem));
