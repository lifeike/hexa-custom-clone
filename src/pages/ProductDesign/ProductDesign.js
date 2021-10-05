import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder, updateOptionNumber, saveOrder } from '@/store/actions/orders';
import { StyleNames, featureToAngleMapping } from '@/utils/constants/lookups';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/constants';
import { getLogoOptions } from '@/store/actions/styles';
import { ShowMobile } from '@/components/ui/Utils';
import ProductDesignDesktopHeader from './ProductDesignDesktopHeader';
import Style from './Style';
import CustomizerCarousel from '@/components/ui/Carousel/CustomizerCarousel';
import ProductDesignMoreInfo from './ProductDesignMoreInfo';
import FeatureDesignPanel from '../../components/ui/FeatureDesign/FeatureDesignPanel';
import ProductDesignImages from './ProductDesignImages';

import {
  Wrapper,
  MainContent,
  DesktopHeader,
  JacketImage,
  Items,
  ItemDrawer,
  ItemsWrapper,
  Item,
  LeftColumn,
  LeftColumnHeaders,
  ButtonArea,
  FinishEditingButton,
  BackButton,
  ButtonTypography,
  FadingHeader,
  HelpModalToggle
} from './ProductDesignStyles';
import { windbreakerStyleNames } from '../../utils/constants/lookups';
import {hasChestPocket, hasFlap} from "../../store/selectors/module";


export class ProductDesign extends Component {
  constructor() {
    super();

    this.state = {
      showDrawer: false,
      selectedFeature: null,
      finishedEditing: false,
      toDetails: false,
    };
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;

    this.props.fetchOrder(groupId).then(() => {
      this.props.getLogoOptions();
    });
  }

  closeDrawer() {
    this.setState({
      showDrawer: false,
      selectedFeature: null,
    });
  }

  handleItemClick(feature) {
    this.setState({
      showDrawer: true,
      selectedFeature: feature,
    });
  }

  handleGenderClick() {
    this.setState({ isGenderFemale: !this.state.isGenderFemale });
  }

  handleFinishEditingClick() {
    this.setState({
      finishedEditing: true,
    });
  }

  handleImagesGenerated = (maleImage, femaleImage) => {
    this.props.saveOrder(this.props.match.params.groupId, this.props.order, this.props.order.order.storeNo, maleImage, femaleImage).then(() => {
      this.setState({
        toDetails: true,
      });
    });
  }

  keyPressed(e, feature) {
    if (e.key === "Enter") {
      this.handleItemClick(feature);
    }
  }

  updateOption(feature, optionId, isWindbreaker, optionName) {
    this.props.updateOptionNumber(feature.item_no, optionId, isWindbreaker, optionName);
  }

  getIconPath(cartSubBase, item_no) {
    let path = `${process.env.PUBLIC_URL}/icons/`;
    const { order: { config } } = this.props;

    // If it is not in here, then there is not jacket specific path.
    if (!Object.values(config.imageNameToStyleOption).includes(item_no)) {
      return path;
    }

    const toSubPath = angleName => {
      switch (angleName) {
        case ('synthetic_jacket'): return 'jacket/';
        case ('synthetic_vest')  : return 'vest/';
        default                  : return `${angleName}/`;
      }
    };

    path += toSubPath(config.angleName);

    // If it doesn't support a hood, don't look for a hood path.
    if (!config.supportsHood) {
      return path;
    }

    const hoodOption = cartSubBase.cartSubDetail.find(details => details.itemNo === 'I003');

    const hoodPath = hoodOption && hoodOption.optionNo === '1' ? 'hood' : 'collar';

    return `${path}${hoodPath}/`;

  }

  renderStyle(feature, idx, cartSubBase, styleNo, styleNames) {

    if (!styleNames.hasOwnProperty(feature.item_no)) {
      return null;
    }

    const iconPath = this.getIconPath(cartSubBase, feature.item_no);

    return (
      <Item tabIndex={'0'} key={idx} onClick={(e) => this.handleItemClick(feature)} onKeyPress={(e) => this.keyPressed(e, feature)}>
        <Style iconPath={iconPath} feature={feature} styleNo={styleNo}/>
      </Item>
    );
  }

  render() {
    const { order, styles, logoOptions } = this.props;
    const { finishedEditing, toDetails, selectedFeature } = this.state;

    if (!order || !order.order || !Object.keys(styles.jackets).length > 0 || !order.config) return null;

    if (toDetails || order.isOrder) {
      return (
        <Redirect push to={`${ROUTES.ORDER}/${this.props.match.params.groupId}`} />
      );
    }

    const cartSubBase = order.order.cartSubs[0];

    const product = styles.jackets[cartSubBase.styleNo];

    // Do not show features that have operations such as copy left sleeve length to right.
    // const features = Object.values(product.features).filter(feature => !product.operationAffected.includes(feature.item_no));

    const isWindbreaker = product.style_no === 'STY802';
    const hasPocketFlaps = isWindbreaker && hasFlap(cartSubBase);

    const styleNames = isWindbreaker ? windbreakerStyleNames : StyleNames;

    const features = Object.values(product.features).filter(feature => styleNames[feature.item_no]);

    const featureOrder = Object.keys(styleNames);

    features.sort(function(a, b){
      return featureOrder.indexOf(a.item_no) - featureOrder.indexOf(b.item_no);
    });

    if (!features || features.length <= 0) return null;

    let featureHeader = '';

    let featureId = '';

    let anglePreset = undefined;

    let featurePrice = 0;

    if (selectedFeature) {
      featureId = selectedFeature.item_no;
      featureHeader = styleNames[featureId];
      let jacketKey = 'default';

      switch (order.config.angleName) {
      case 'vest':
        jacketKey = 'vest';
        break;
      case 'rain_jacket':
        jacketKey = 'rain_jacket';
        break;
      case 'synthetic_vest':
        jacketKey = 'vest';
        break;
      case 'windbreaker':
        jacketKey = 'windbreaker';
        break;
      default:
        jacketKey = 'default';
      }

      anglePreset = featureToAngleMapping[jacketKey][featureId];
    }

    let basePrice = Number(cartSubBase.styleBasePrice) + featurePrice;

    basePrice += cartSubBase.cartSubDetail.reduce((addPrice, feature) => {
      const itemNo = feature.itemNo;

      if (!order.config.styleClassifications.personalization[itemNo]) {
        const optionNo = cartSubBase.cartSubDetail.find(details => details.itemNo === itemNo).optionNo;

        const option = product.features[feature.itemNo].options.find(option => option.option_no === optionNo);

        return addPrice += option ? option.add_price || 0 : 0;
      } else {
        const logo = cartSubBase.cartSubDetail.find(details => details.itemNo === feature.itemNo).inputContent;

        if (!logo || !logoOptions || logoOptions.length < 1) return addPrice += 0;
        const logoInfo = logoOptions[feature.itemNo];

        return addPrice += (logoInfo && logoInfo.logo_option) ? logoInfo.logo_option.add_price || 0 : 0;
      }
    }, 0);

    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(basePrice || 0);

    // We do not want to show flap color option ('C020') if windbreaker pocket flaps are not enabled
    // if not windbreaker, show all features
    // if windbreaker has pocket flaps enabled, show all features
    // if windbreaker does not have pocket flaps, show all features except 'C020"

    const flapFilter = feature => !isWindbreaker || hasPocketFlaps || feature.item_no !== 'C020';

    // We do not want to show pocket zipper color option ('C010') if windbreaker pocket flaps are enabled and no chest pockets are enabled
    const pocketZipperFilter = feature => !isWindbreaker || !hasPocketFlaps || hasChestPocket(cartSubBase) || feature.item_no !== 'C010';

    const displayedFeatures = features
      .filter(flapFilter)
      .filter(pocketZipperFilter)
      .map((feature, i) => this.renderStyle(feature, i, cartSubBase, this.props.order.order.cartSubs[0].styleNo, styleNames)
    );

    return (
      <>
        <Wrapper>
          <DesktopHeader><ProductDesignDesktopHeader price={price} saveOrder={() => this.handleFinishEditingClick()}/></DesktopHeader>
          <MainContent>
            <LeftColumn>
              <LeftColumnHeaders classes="textCenter">
                <HelpModalToggle>
                  <ProductDesignMoreInfo helpType={featureId}></ProductDesignMoreInfo>
                </HelpModalToggle>
              </LeftColumnHeaders>
              <ShowMobile>
                <LeftColumnHeaders classes="top2 textCenter">
                  <FadingHeader visible={!this.state.showDrawer} variant="metaTitle">{`Wholesale Unit Price: ${price}`}</FadingHeader>
                  <FadingHeader visible={this.state.showDrawer} variant="metaTitle">{featureHeader}</FadingHeader>
                </LeftColumnHeaders>
              </ShowMobile>
              <JacketImage>
                <CustomizerCarousel
                  isSubmitted={true}
                  order={order}
                  positionDefault={anglePreset}
                  productDesign={true}
                />
              </JacketImage>
            </LeftColumn>
            <Items>
              <ItemsWrapper>
                {displayedFeatures}
              </ItemsWrapper>
            </Items>
            {/* This contains the edit options. */}
            <ItemDrawer showDrawer={this.state.showDrawer}>
              <FeatureDesignPanel
                onOptionSelected={(feature, id, optionName) => this.updateOption(feature, id, isWindbreaker, optionName)}
                feature={selectedFeature}
                handleDrawerBackClick={() => this.closeDrawer()}
              ></FeatureDesignPanel>
            </ItemDrawer>
          </MainContent>
          <ShowMobile>
            <ButtonArea>
              {this.state.showDrawer ?
                <BackButton onClick={() => this.closeDrawer()}>
                  <ButtonTypography
                    letterSpacing=".11"
                  >
                    BACK
                  </ButtonTypography>
                </BackButton>
                :
                <FinishEditingButton onClick={() => this.handleFinishEditingClick()}>
                  <ButtonTypography>Finish Editing</ButtonTypography>
                </FinishEditingButton>
              }
            </ButtonArea>
          </ShowMobile>
        </Wrapper>
        {finishedEditing &&
          <ProductDesignImages onImagesCreated={this.handleImagesGenerated}></ProductDesignImages>
        }
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrder: groupId => dispatch(fetchOrder(groupId)),
  getLogoOptions: () => dispatch(getLogoOptions()),
  updateOptionNumber: (featureId, option, isWindbreaker, optionName) => dispatch(updateOptionNumber(featureId, option, isWindbreaker, optionName)),
  saveOrder: (groupId, order, store, maleImage, femaleImage) => dispatch(saveOrder(groupId, order, store, maleImage, femaleImage)),
});

const mapStateToProps = (state, props) => {
  return {
    order: state.selectedOrder.order,
    styles: state.styles,
    logoOptions: state.logo.options,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDesign);
