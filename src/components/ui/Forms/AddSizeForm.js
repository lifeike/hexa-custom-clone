import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GetString, SizeTranslations } from '@/utils/constants/lookups';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';
import { addSize, } from '@/store/actions/orders';

import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import Radio from '@/components/ui/Inputs/RadioInput';
import { PrimaryButton } from '@/components/ui/Buttons/Buttons';
import Container from '@/components/ui/Layout/Container';
import ProductDesignImages from '@/pages/ProductDesign/ProductDesignImages';
import { LINKS } from '@/utils/constants/constants';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: space-between;

  ${media.md`
    height: auto;
  `}
`;

const RadioList = styled.div`
  padding-bottom: ${rhythm(3)};

  ${media.md`
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
  `}

  > * {
    padding-top: ${rhythm(3)};

    ${media.md`
      padding-right: ${rhythm(2)};
      padding-top: 0;
    `};

    ${media.lg`
      padding-right: ${rhythm(6)};
    `};

    > * {
      padding-top: ${rhythm(1)};
    }
  }
`;

const AddSizeButton = styled(PrimaryButton)`
  ${media.md`
    width: 15.3rem;
  `};
`;

const ErrorText = styled.span`
  color: ${props => props.theme.color_red};
  font-size: 1.4rem;
  line-height: 1.29;
`;

const ErrorBox = styled(Box)`
  align-items: center;
  background-color: ${props => props.theme.color_light_red_1};
  display: flex;
  margin-top: 1.6rem;
`;

class AddSizeForm extends Component {

  static propTypes = {
    styleId: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      submitted: false,
      maleImage: null,
      femaleImage: null,
      imagesGenerated: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      gender: this.form.gender.value,
    });
  }

  handleChange() {
    this.setState({
      error: '',
      submitted: false,
      gender: this.form.gender.value,
    });
  }

  tryAddSize() {
    const {loading, submitted, imagesGenerated} = this.state;

    if ( loading || !submitted || !imagesGenerated ) return;

    this.setState({
      loading: true,
    });

    const selectedOptions = {
      'I015': this.form.size.value,
      'I012': this.form.fit.value,
      'G001': this.form.gender.value,
    };

    // Don't update sleeve for vests
    if (this.form.hasOwnProperty('sleeveLength')) {
      selectedOptions['I013'] = this.form.sleeveLength.value;
    }

    const image = this.form.gender.value === "1" ? this.state.maleImage : this.state.femaleImage;

    this.props.addSize(selectedOptions, image).then(() => {
      if (this.props.onAdd) {
        this.props.onAdd();
      }
    }).catch(() => {
      this.setState({
        error: 'This size has already been added to the cart.',
      });
    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  }

  handleImagesGenerated(maleImage, femaleImage) {
    this.setState({
      maleImage: maleImage,
      femaleImage: femaleImage,
      imagesGenerated: true,
    },this.tryAddSize);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    },this.tryAddSize);
  }

  renderSizeCategory(header, category, options) {
    if (options === null) return;

    const items = options.map((option, i) => {
      const disabled = (GetString(option.name, SizeTranslations) === 'XXS' && this.state.gender === '1')
        || (this.state.gender === '2' && '5,6,7'.includes(option.name.substring(0,1)));

      if (disabled && this.sizeDefault && this.form && (this.form.size.value === option.option_no)) {
        this.form.size.value = this.sizeDefault.props.value;
      }

      if (disabled) return null;

      return (
        <Radio
          key={`${category}-${option.option_no}`}
          ref={radio => {
            if (radio && radio.props.defaultChecked && header === 'Size') {
              this.sizeDefault = radio;
            }
          }}
          id={`${category}-${option.option_no}`}
          name={category}
          value={option.option_no}
          label={GetString(option.name, SizeTranslations)}
          defaultChecked={option.is_default_option ? true : false}
          disabled={disabled}
        />
      );
    });

    return (
      <div>
        <Typography variant="h3">{header}</Typography>
        {items}
      </div>
    );
  }

  renderFitGuideLink() {
    return (
      <a
        href={LINKS.FIT_GUIDE}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="link">View Fit Guide</Typography>
      </a>
    );
  }

  render() {
    const features = this.props.styles.jackets[this.props.styleId].features;
    const { error } = this.state;

    if (!features || features.length <= 0) return null;

    const sizes = features['I015'].options;
    const fit = features['I012'].options;
    const genderOptions = features['G001'].options;

    let sleeveLength = null;

    if (features['I013']) {
      sleeveLength = features['I013'].options;
    }

    return (
      <>
        <StyledForm
          ref={form => this.form = form}
          onSubmit={(e) => this.handleFormSubmit(e)}>
          <Container leftAligned>
            <Box classes="top6 top3Md">
              <Typography variant="h1">Add Size</Typography>
              {this.renderFitGuideLink()}
            </Box>
            <Box classes="top1 top3Lg bottom10 bottom5Md">
              <Box classes="bottom5Md">
                <RadioList onChange={() => this.handleChange()}>
                  {this.renderSizeCategory('Gender', 'gender', genderOptions)}
                  {this.renderSizeCategory('Size', 'size', sizes)}
                  {this.renderSizeCategory('Fit', 'fit', fit)}
                  {this.renderSizeCategory('Sleeve Length', 'sleeveLength', sleeveLength)}
                </RadioList>
              </Box>
              <AddSizeButton onClick={(e) => this.handleFormSubmit(e) }>Save</AddSizeButton>
              {error &&
                <ErrorBox classes='2'>
                  <ErrorText>
                    {error}
                  </ErrorText>
                </ErrorBox>
              }
            </Box>
          </Container>
        </StyledForm>
        <ProductDesignImages onImagesCreated={(male, female) => this.handleImagesGenerated(male, female)}></ProductDesignImages>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addSize: (groupId, cartId, options) => dispatch(addSize(groupId, cartId, options)),
});

const mapStateToProps = state => ({
  styles: state.styles,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSizeForm);
