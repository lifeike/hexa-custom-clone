import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { HideMobile } from '@/components/ui/Utils';
import { getSelectedLogoUrl } from '@/store/selectors/subOrder';

import DesignOption from './DesignOption';
import { DesignOptionContainer } from './DesignOptionContainer';
import Box from '@/components/ui/Layout/Box/Box';
import { OptionGrid, Chevron } from './FeatureDesignStyles';
import { Breadcrumb } from '@/components/ui/Buttons/Buttons';
import LogoDesignOptions from './Logo/LogoDesignOptions';
import { VisibleColorOrder } from '../../../utils/constants/lookups';
import { toFeatureTitle } from '../../../pages/ProductDesign/module';

const SYNTHETIC_DOWN_TYPE_INFO = 'Our 60-g Synthetic Polyester Insulation retains warmth when wet. ' +
  'Select either our Standard or 100% Postconsumer Recycled Insulation.';


const FeaturePanel = styled(Box)`
  overflow: auto;
`;

const Title = styled.div`
  color: ${props => props.theme.color_darkest};
  font-size: 2rem;
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.font_weight_bold};
`;

const MoreInfo = styled.div`
  line-height: 1.4;
  text-align: justify;
  padding: 20px;
`;

const toFeatureInfo = (featureId, jacketId) =>
  featureId === 'I002' && (jacketId === 'STY701' || jacketId === 'STY702') //down type and synthetic jacket
    ? SYNTHETIC_DOWN_TYPE_INFO
    : null;


class FeatureDesignPanel extends Component {
  static propTypes = {
    feature: PropTypes.object,
    onOptionSelected: PropTypes.func,
    handleDrawerBackClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    };
  }

  isLogo(featureId) {
    return featureId.startsWith('L');
  }

  isColor(featureId) {
    const { styleClassifications } = this.props.order.config;

    return !!{...styleClassifications.colors, ...styleClassifications.zippers}[featureId];
  }

  handleDrawerBackClick() {
    this.props.handleDrawerBackClick();
  }

  renderOption(option, featureId, key) {
    const { order: { config } } = this.props;

    if (this.isLogo(featureId)) {
      if (key > 1) return;

      if (!option.name.trim()) {
        option.name = 'Add Logo';
      }
    }

    if (option.name.trim() === 'Recycle Synthetic') {
      option.name = 'Recycled Synthetic';
    }

    //TODO: here we are going to need to change the lookup to look by name perhaps?
    const selected = option.option_no === Object.values(this.props.order.order.cartSubs[0].cartSubDetail).find(feature => feature.itemNo === featureId).optionNo;
    // Is it a color option?
    const isInline = !Object.values(config.imageNameToStyleOption).includes(featureId);

    const color = option.color_id && config.colorConfiguration[option.color_id] ? `#${config.colorConfiguration[option.color_id].buttonColor}` : null;

    return (
      <DesignOptionContainer
        key={key}
        selected={selected}
        inline={isInline}
        color={color}
        onOptionSelected={() => this.props.onOptionSelected(this.props.feature, option.option_no, option.name)}
        outOfInventory={option.outOfInventory}
      >
        {!isInline ?
          <DesignOption
            color={color}
            label={option.name}
          />
          :
          <DesignOption
            label={option.name}
            inline={isInline}
            addPrice={option.add_price}
          />
        }
      </DesignOptionContainer>
    );
  }

  renderStandardOptions(options, id, info, styleNo) {

    return (
      <FeaturePanel classes="left2Md">
          <Box classes="top3Md">
            <Title>
              {toFeatureTitle(id, styleNo)}
            </Title>
          </Box>

        {info && <MoreInfo>{info}</MoreInfo>}

        <OptionGrid>
          {
            options
              .filter(option => !option.outOfInventory)
              .map((option, idx) => this.renderOption(option, id, idx))
          }
        </OptionGrid>
      </FeaturePanel>
    );
  }

  renderLogoOptions(options, id, styleNo) {
    const { order } = this.props;

    const selectedOption = getSelectedLogoUrl(order, id);

    return (
      <LogoDesignOptions
        selectedOption={selectedOption}
        options={options}
        id={id}
        styleNo={styleNo}
      />
    );
  }

  render() {
    const {feature, order} = this.props;

    if ( !feature || !this.props.colors ) {
      return null;
    }

    const id = feature.item_no;
    const jacketId = order.order.cartSubs[0].styleNo;
    const info = toFeatureInfo(id, jacketId);

    let options = feature.options;

    if (this.isColor(id)) {
      options.sort((a, b) => {
        return VisibleColorOrder.indexOf(`${a.color_id}`) - VisibleColorOrder.indexOf(`${b.color_id}`);
      });
    }

    return (
      <>
        <HideMobile>
          <Box classes="top2 left2">
            <Breadcrumb onClick={() => this.handleDrawerBackClick()}>
              <Chevron size={24} name="chevron"/>
              Back
            </Breadcrumb>
          </Box>
        </HideMobile>
        {this.isLogo(id) ? this.renderLogoOptions(options, id, jacketId): this.renderStandardOptions(options, id, info, jacketId)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.selectedOrder.order,
  colors: state.colors.colors,
});

export default connect(mapStateToProps, null)(FeatureDesignPanel);
