import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/constants';
import styled from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

import { toggleShowError } from '@/store/actions/accountError';
import Box from '@/components/ui/Layout/Box/Box';
import StandardModal from '@/components/ui/Modal/StandardModal';
import Toggler from '@/components/ui/Toggler';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import Checkbox from '@/components/ui/Inputs/CheckboxInput';

const ListHeading = styled.span`
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_bold};
`;

const List = styled.ul`
  line-height: 1.5;
  padding-left: ${rhythm(2)};

  ${media.md`
    padding-left: 0;
  `}
`;

const ListItem = styled.li`
  list-style: initial;
`;

const Terms = styled.span`
  color: ${props => props.theme.color_dark};
  text-decoration: underline;
`;

const ContinueCheckoutButton = styled.div`
`;

const LIST_ITEMS = {
  myOrder: [
    'All sizes are correct',
    'Fabric colors look good – note: colors on screen may vary slightly from actual fabric',
  ],
  artwork: [
    'All artwork follows the Hexa|Custom Artwork Guidelines',
    'Text and graphics are legible',
    'Colors stand out against the background fabric',
    'The applied artwork is correct',
  ],
};

class Legal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      approved: false,
    };
  }

  canProceed() {
    const { accountError, toggleShowError } = this.props;

    if (accountError) {
      toggleShowError(true);

      return false;
    }

    return true;
  }

  handleCheckboxToggle(checked) {
    this.setState({
      approved: checked,
    });
  }

  renderListItems(type) {
    return LIST_ITEMS[type].map ((item, index) => {
      return (
        <ListItem key={`${type}-${index}`}>
          <Typography variant="body" fontSize="1.6rem">
            {item}
          </Typography>
        </ListItem>
      );
    });
  }

  renderList(heading, type) {
    return (
      <Box classes="top3">
        <Box classes="bottom1">
          <ListHeading>{heading}</ListHeading>
        </Box>
        <Container>
          <List>
            {this.renderListItems(type)}
          </List>
        </Container>
      </Box>
    );
  }

  renderTermsAndConditionsLink() {
    return (
      <a onClick={e => {e.stopPropagation();}} href={'https://hexacustompromo.com/privacy-policy'} rel="noopener noreferrer" target="_blank">
        <Terms>terms and conditions</Terms>
      </a>
    );
  }

  renderContinueCheckoutCta() {
    const { disabled } = this.props;
    const { approved } = this.state;

    return (
      <ContinueCheckoutButton>
        <Box classes="top5 textRight">
          <Link
            to={`${ROUTES.ORDER}/${this.props.groupId}/checkout`}
            onClick={
              e => {
                // Stop the event from bubbling up
                e.stopPropagation();
                document.body.classList.remove('modalOpen');
              }
            }
          >
            <PrimaryButton disabled={disabled || !approved}>
              Continue
            </PrimaryButton>
          </Link>
        </Box>
      </ContinueCheckoutButton>
    );
  }

  renderCheckbox() {
    return (
      <Box classes="top3">
        <Checkbox
          onChange={checked => this.handleCheckboxToggle(checked)}
          label={<p>I have reviewed and approve my custom order design, verify that I have permission to use all artwork, and agree to the {this.renderTermsAndConditionsLink()}.</p>}
          id="confirmDesign"
          name="confirmDesign"
          value="confirm">
        </Checkbox>
      </Box>
    );
  }

  render() {
    return(
      <Toggler>
        {([toggled, onToggle]) => (
      <>
        <PrimaryButton
          fullMd
          disabled={this.props.disabled}
          onClick={() => {
            if (this.canProceed()) {
              onToggle(true);
            }
          }}
        >
          Checkout
        </PrimaryButton>
        <StandardModal
          toggle={toggled}
          onAfterClose={() => onToggle(false)}
          width="7"
        >
          <Container>
            <Box classes="top5 bottom12 flats5Md">
              <Box classes="right6Lg">
                <Typography variant="h1">Before you checkout</Typography>
                <Box classes="top1Md">
                  <Typography variant="h3">Please Approve Your Order</Typography>
                </Box>
                <Box classes="top2">
                  <Typography variant="body" fontSize="1.6rem">
                    As soon as your order is submitted, we’ll review and then begin production! There won’t be time for changes, so please be sure you feel great about all of your features, colors, sizes, and artwork.
                  </Typography>
                </Box>
                {this.renderList('My Order', 'myOrder')}
                {this.renderList('Artwork', 'artwork')}
                {this.renderCheckbox()}
              </Box>
              {this.renderContinueCheckoutCta()}
            </Box>
          </Container>
        </StandardModal>
      </>
        )}
      </Toggler>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleShowError: showError => dispatch(toggleShowError(showError)),
});

const mapStateToProps = state => ({
  accountError: state.selectedOrder && state.selectedOrder.order && state.selectedOrder.order.billingStatus === 'block',
});

export default connect(mapStateToProps, mapDispatchToProps)(Legal);
