import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import { getFeatureInfoList } from '@/store/selectors/subOrder';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import { Hr } from '@/components/ui/Utils';
import { default as ContainerBase } from '@/components/ui/Layout/Container';
import { ReviewOptionTranslations } from '@/utils/constants/lookups';
import { formatCurrency } from '../../../utils/helpers';
import { getUnitPrice } from '@/store/selectors/order';

const SectionWrapper = styled.div`
  ${media.md`
    display: flex;
    flex-wrap: wrap;
  `}
`;

const Feature = styled.div`
  & + & {
    padding-top: ${rhythm(2)};
  }

  ${media.md`
    & + & {
      padding-top: 0;
    }

    flex: 1 1 33%;
  `}
`;

const LogoFeature = styled(Feature)`
  min-width: 50%;
  flex: 1 1 50%;
  margin-bottom: 4rem;

  ${media.md`
    & + & {
      padding-top: 0;
    }

    &:nth-child(even) {
      padding-left: 1rem;
    }
  `}
`;

const ColorOption = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  padding-bottom: 1.6rem;

  & + & {
    padding-top: ${rhythm(2)};
  }

  ${media.md`
    & + & {
      padding-top: 0;
    }

    flex: 1 1 33%;
  `}
`;

const Container = styled(ContainerBase)`
  padding-top: ${rhythm(4)};
  padding-bottom: ${rhythm(4)};
`;

const ColorCircle = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  border: solid .1rem rgba(0, 0, 0, 0.25);
  bottom: ${rhythm(.5)};
  /* box-sizing: border-box; */
  height: ${rhythm(2)};
  margin-right: ${rhythm(1.5)};
  position: relative;
  width: ${rhythm(2)};
`;

const SectionHeader = styled.div`
  padding-bottom: ${rhythm(1.5)};

  ${media.md`
    padding-bottom: ${rhythm(2)};
  `}
`;

const TotalSection = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const LogosWrapper = styled(Container)`
  background-color: ${props => props.theme.color_grey_0};
`;

const Logo = styled.img`
  position: relative;
  max-width: 100%;
`;

class ReviewDesign extends Component {

  renderFeature(feature, header, key) {
    if (!feature || !feature.name) return;

    return (
      <Feature key={key}>
        <Typography block variant="metaTitle">{header}</Typography>
        <Typography block variant="meta1">
          {ReviewOptionTranslations[feature.name] || feature.name}
          {/* {feature.add_price && ` (+ $${feature.add_price})`} */}
        </Typography>
      </Feature>
    );
  }

  renderLogo(header, key, logo) {
    return (
      <LogoFeature key={key}>
        <Typography block variant="metaTitle">{header}</Typography>
        {logo &&
          <Logo crossOrigin="anonymous" src={logo}/>
        }
        {!logo &&
          <Typography block variant="meta1">No Logo</Typography>
        }
      </LogoFeature>
    );
  }

  renderColors(feature, header, key) {
    if (!feature || !feature.name || !feature.color) return;

    return (
      <ColorOption key={key}>
        <ColorCircle color={`#${feature.color}`}></ColorCircle>
        <div>
          <Typography block variant="metaTitle">{header}</Typography>
          <Typography block variant="meta1">{feature.name}</Typography>
        </div>
      </ColorOption>
    );
  }

  renderContentFeatures(featureList) {
    const { styleClassifications } = this.props;

    return (
      <Container>
        {this.renderContentHeader('Features')}
        <SectionWrapper>
          {Object.keys(styleClassifications.features).map((feature, index) => {
            return this.renderFeature(featureList[feature], styleClassifications.features[feature], index);
          })}
        </SectionWrapper>
      </Container>
    );
  }

  renderContentColors(featureList) {
    const { styleClassifications } = this.props;
    const colors = {...styleClassifications.colors, ...styleClassifications.zippers};

    return (
      <Container>
        {this.renderContentHeader('Colors')}
        <SectionWrapper>
          {Object.keys(colors).map((feature, index) => {
            return this.renderColors(featureList[feature], colors[feature], index);
          })}
        </SectionWrapper>
      </Container>
    );
  }

  renderContentLogos(featureList, orderDetails) {
    const { styleClassifications } = this.props;

    return (
      <LogosWrapper>
        {this.renderContentHeader('Logo Placements')}
        <SectionWrapper>
          {Object.keys(styleClassifications.personalization).map((feature, index) => {

            if(!featureList[feature].content) {
              return null;
            }

            return this.renderLogo(
              styleClassifications.personalization[feature],
              index,
              featureList[feature].content,
            );
          })}
        </SectionWrapper>
      </LogosWrapper>
    );
  }

  renderContentHeader(header = '') {
    return (
      <SectionHeader>
        <Typography variant="h3">
          {header}
        </Typography>
      </SectionHeader>
    );
  }

  renderContentSpacer() {
    return (
      <ContainerBase>
        <Hr />
      </ContainerBase>
    );
  }

  renderContentTotal(price = 0) {
    return (
      <TotalSection>
        <Typography variant="h3">
          Item Total
        </Typography>
        <Typography variant="h3">
          {formatCurrency(price)}
        </Typography>
      </TotalSection>
    );
  }

  render() {
    const {
      order,
      featureList,
    } = this.props;

    const price = getUnitPrice(order.order.order, order.order.isOrder);

    if (!this.props.order || !featureList || featureList <= 0) return;

    return (
      <>
        <Box classes="top8 bottom2">
          <ContainerBase>
            <Typography variant="h2">
              Jacket Summary
            </Typography>
          </ContainerBase>
        </Box>
        {this.renderContentFeatures(featureList)}
        {this.renderContentSpacer()}
        {this.renderContentColors(featureList)}
        {this.renderContentLogos(featureList, null)}
        {this.renderContentTotal(price)}
      </>
    );
  }
}

const mapStateToProps = state => ({
  order: state.selectedOrder,
  styleClassifications: state.selectedOrder.order.config.styleClassifications,
  featureList: getFeatureInfoList(state),
});

export default connect(mapStateToProps, null)(ReviewDesign);
