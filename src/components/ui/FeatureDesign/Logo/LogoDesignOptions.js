import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { validLogos, selectedLogo } from '@/store/selectors/logo';
import { HideMobile, HideTablet, HideDesktop, ShowMobile } from '@/components/ui/Utils';
import { fetchLogos, deleteLogo } from '@/store/actions/logo';
import Toggler from '@/components/ui/Toggler';
import { updateOption, updateOptions } from '@/store/actions/orders';

import StandardModal from '@/components/ui/Modal/StandardModal';
import Box from '@/components/ui/Layout/Box/Box';
import { BorderedButton } from '@/components/ui/Buttons/Buttons';
import Typography from '@/components/ui/Typography/Typography';
import { OptionGrid, OptionsTitle } from '../FeatureDesignStyles';
import { LogoOption } from './LogoOption';
import { LogoOptionsContainer } from './LogoOptionsContainer';
import DesignOption from '../DesignOption';
import LogoUploadForm from './LogoUploadForm';
import Container from '@/components/ui/Layout/Container';
import { ModalCancelButton, ModalConfirmButton, HorizontalButtonContainer } from '@/components/ui/Buttons/Buttons';
import media from '@/utils/media';
import { isInViewport } from '@/utils/helpers';
import { toFeatureTitle } from '../../../../pages/ProductDesign/module';

const AddLogoButton = styled(BorderedButton)`
  font-size: 1.4rem;
`;

const LogoOptionsGrid = styled(OptionGrid)`
  border-top: 0.1rem solid ${props => props.theme.color_grey_5};
  flex-direction: column;
  height: auto;
  overflow-y: auto;

  ${media.md`
    border-top: 0.1rem solid ${props => props.theme.color_grey_5};
  `}
`;

const AddLogoTitle = styled.div`
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.5;
`;

const AddLogoCopy = styled.div`
  font-size: 1.4rem;
  font-weight: ${props => props.font_weight_regular};
  line-height: 1.47;
`;

const LogoOptionContainer = styled(HideMobile)`
  overflow: auto;
  padding-left: 1.6rem;
`;

const DisabledOverlay = styled.div`
  background: rgba(255, 255, 255, 0.7);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`;

const ButtonText = styled.span`
  font-size: 1.6rem;

  ${media.md`
    width: 9.5rem;
  `}
`;

const CancelButtonText = styled.span`
  font-size: 1.4rem;
  letter-spacing: .1rem;
`;

const LogoOptionsTitle = styled(OptionsTitle)`
  padding-left: 0;
`;

class LogoDesignOptions extends Component {
  constructor(props) {
    super(props);

    this.grid = React.createRef();

    this.state = {
      selectedOption: null,
      noLogo: null,
      showLogoUpload: false,
      canChangeSelection: false,
      showChangeModal: false,
    };
  }

  componentDidMount() {
    this.setup();
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.ensureSelectedIsVisible();
    }, 420);
  }

  setSelectedLogo(element, isSelected) {
    if (isSelected) {
      this.selectedLogo = element;
    }
  }

  setup = () => {
    this.props.fetchLogos();

    //TODO: This should come from the api aet some point.
    this.setState({
      noLogo: this.props.options.find(option => (option.name === 'no image' || option.is_default_option)),
    });
  }

  showLogoUpload() {
    this.setState({
      showLogoUpload: true,
    });
  }

  handleDrawerBackClick(e) {
    e && e.preventDefault();

    this.setState({showLogoUpload: false});
  }

  onLogoAdded(logo) {
    this.onOptionSelected(logo);
    this.handleDrawerBackClick();
    this.ensureSelectedIsVisible();
  }

  onOptionSelected(logo, isDeleted, confirmed) {
    let { logoChoice } = this.state;

    if (isDeleted && !confirmed) {
      this.setState({
        showChangeModal: true,
        logoChoice: logo,
      });

      return;
    }

    if (isDeleted) {
      logo = logoChoice;
      this.setState({
        showChangeModal: false,
      });
    }

    const selectedOption = this.props.logoOptions[this.props.id];
    const option = {
      ...selectedOption.logo_option,
      inputContent: logo.url,
      optionNo: selectedOption.logo_option.option_no,
      inputType: selectedOption.logo_option.input_type,
      item_no: selectedOption.item_no,
    };

    this.props.updateOption(this.props.id, option);
  }

  ensureSelectedIsVisible() {
    if (!this.selectedLogo) return;
    if (isInViewport(this.selectedLogo)) return;
    // if ((this.selectedLogo.offsetTop + this.grid.current.offsetTop) - this.grid.current.scrollTop < this.grid.current.height)  return;
    this.selectedLogo.scrollIntoView({
      behavior: 'smooth',
    });
  }

  removeSelections() {
    const { config } = this.props;

    this.props.updateOptions(Object.keys(config.styleClassifications.personalization), this.getNoLogoOption());
  }

  removeSelection() {
    this.props.updateOption(this.props.id, this.getNoLogoOption());
  }

  getNoLogoOption() {
    const { noLogo } = this.state;

    return {
      inputContent: '',
      optionName: noLogo.name,
      optionNo: noLogo.option_no || 100,
    };
  }

  /**
   * Deletes logo for user by calling delete action
   * @param {Object} logo
   */
  async deleteLogo(logo) {
    const { selectedOption } = this.props;

    await this.props.deleteLogo(logo.id);

    if (selectedOption === logo.url) {
      // clear selection if deleting selected icon
      this.removeSelections();
    }

    this.setup();
  }

  renderEmptyMessage() {
    return (
      <>
        <Typography variant="meta1" weight="bold">No logos Available</Typography>
        <div>
          <Typography variant="meta2">Upload your first logo to start adding artwork to your orders</Typography>
        </div>
      </>
    );
  }

  closeModal() {
    this.setState({
      showChangeModal: false,
    });
  }

  renderChangeSelectionModal() {
    return (
      <StandardModal
        toggle={this.state.showChangeModal}
        hideClose={true}
        onAfterClose={() => this.closeModal()} >
        <Container>
          <Box classes="top5 bottom2 bottom4Md">
            <Typography variant="h1">{`Confirm Logo Change?`}</Typography>
            <Box classes="top2">
              <Typography variant="body">
                You are currently using a logo that has been deleted. You can checkout with this logo applied, but if you change your selection, the current logo will be lost forever (or until you re-upload it).
              </Typography>
              <Box classes="top2">
                <Typography variant="body">
                  Are you sure you want to change your logo selection?
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box classes="top1 bottom2 bottom4Md">
            <HorizontalButtonContainer>
              <ModalCancelButton onClick={() => this.closeModal() }>
                <CancelButtonText>
                  CANCEL
                </CancelButtonText>
              </ModalCancelButton>
              <ModalConfirmButton onClick={() =>  this.onOptionSelected(null, true, true) }>
                <ButtonText>
                  Yes, Change the Logo
                </ButtonText>
              </ModalConfirmButton>
            </HorizontalButtonContainer>
          </Box>
        </Container>
      </StandardModal>
    );
  }

  renderLogos() {
    const logos = Object.values(this.props.logos);
    const { selectedOption, selectedLogo } = this.props;
    const isDeleted = selectedLogo && !selectedLogo.status;

    return (
      <LogoOptionsGrid ref={this.grid}>
        <LogoOptionsContainer
          inline={true}
          height="auto"
          key="noLogo"
          onOptionSelected={() => this.removeSelection()}
          selected={!selectedOption}
        >
          <DesignOption
            label="No Logo"
            inline={true}
            addPrice={0}
            alignText="left"
          />
        </LogoOptionsContainer>

        {isDeleted &&
          <>
            <LogoOptionsContainer
              inline={true}
              height="auto"
              key="selected"
              onOptionSelected={() => {}}
              selected={true}
            >
              <LogoOption
                logo={selectedLogo}
              >
              </LogoOption>
              <DisabledOverlay></DisabledOverlay>
            </LogoOptionsContainer>
          </>
        }

        {logos.map((logo, idx) => {
          if (!logo.url) return null;

          const isSelected = logo.url === selectedOption;

          return (
            <div ref={elem => this.setSelectedLogo(elem, isSelected)}
              key={idx}>
              <LogoOptionsContainer
                inline={true}
                height="auto"
                onOptionSelected={() => this.onOptionSelected(logo, isDeleted)}
                selected={isSelected}
              >
                <LogoOption
                  logo={logo}
                  handleDelete={logo => this.deleteLogo(logo)} />
              </LogoOptionsContainer>
            </div>
          );
        })}
      </LogoOptionsGrid>
    );
  }

  formatPrice(val, precision = 2) {
    let num = Number(val) || Number(0);
    const fixed = num.toFixed(precision);

    return `$${fixed}`;
  }

  renderOptions() {
    const { id, logoOptions, styleNo } = this.props;

    if (!logoOptions) return;

    const formattedPrice = this.formatPrice(logoOptions[id].logo_option.add_price);

    return (
      <>
        <Box classes="bottom2 top8 top3Md">
          <LogoOptionsTitle>
            {`${toFeatureTitle(id, styleNo)} (+${formattedPrice})`}
          </LogoOptionsTitle>
        </Box>
        <HideTablet>
          <AddLogoButton
            onClick={() => {this.showLogoUpload();}}
          >
            ADD LOGO
          </AddLogoButton>
        </HideTablet>
        <Box classes="flats2">
          {!this.props.logos || Object.keys(this.props.logos).length <=0
            ? this.renderEmptyMessage()
            : this.renderLogos()}
        </Box>
        <HideDesktop>
          <Box classes="top4 bottom12 bottom0Md">
            <AddLogoTitle>Want to add more logos?</AddLogoTitle>
            <AddLogoCopy>You can only upload new logos on a laptop or desktop.</AddLogoCopy>
          </Box>
        </HideDesktop>
      </>
    );
  }

  renderMobile() {
    return (
      <ShowMobile>
        <Toggler>
          {([toggled, onToggle]) => (
            <ShowMobile>
              <div>
                <Box classes="textCenter">
                  <AddLogoButton onClick={() => onToggle(true)}>SELECT LOGO</AddLogoButton>
                </Box>
                <StandardModal
                  toggle={toggled}
                  onAfterClose={() => onToggle(false)}
                >
                  <Box classes="sides2">
                    {this.renderOptions()}
                  </Box>
                </StandardModal>
              </div>
            </ShowMobile>
          )}
        </Toggler>
      </ShowMobile>
    );
  }

  render() {
    const { showLogoUpload, showChangeModal } = this.state;

    return (
      <>
        <LogoUploadForm
          visible={showLogoUpload}
          handleDrawerBackClick={e => this.handleDrawerBackClick(e)}
          onLogoAdded={logoId => this.onLogoAdded(logoId)}></LogoUploadForm>
        <LogoOptionContainer ref={this.grid}>
          {this.renderOptions()}
        </LogoOptionContainer>
        {this.renderMobile()}
        {showChangeModal && this.renderChangeSelectionModal() }
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLogos: () => dispatch(fetchLogos()),
  deleteLogo: logoId => dispatch(deleteLogo(logoId)),
  updateOptions: (features, option) => dispatch(updateOptions(features, option)),
  updateOption: (feature, option) => dispatch(updateOption(feature, option)),
});

const mapStateToProps = (state, props) => {
  return {
    logos: validLogos(state),
    logoOptions: state.logo.options,
    selectedLogo: selectedLogo(state, props),
    config: state.selectedOrder.order.config,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoDesignOptions);
