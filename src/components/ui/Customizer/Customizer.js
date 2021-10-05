import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomizerAngles } from '@/store/selectors/subOrder';
import { getLayers } from '@/utils/canvasHelpers';
import  ViewportHelper from '@/utils/viewport';
import { debounce } from 'throttle-debounce';

import { Carousel } from '@/components/ui/Carousel/Carousel';
import { CanvasRendererWrapper } from './CanvasRendererWrapper';

class Customizer extends Component {
  static propTypes = {
    gender: PropTypes.string,
    order: PropTypes.object,
    positionDefault: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };

    this.calculateViewport = debounce(100, this.calculateViewport.bind(this));
  }

  componentDidMount() {
    this.onCreateImage = this.setImage;
    this.calculateViewport();

    window.addEventListener('resize', this.calculateViewport);
  }

  componentWillUnmount() {
    this.onCreateImage = () => {};
    window.removeEventListener('resize', this.calculateViewport);
  }

  setImage(image) {
    this.setState({
      image: image,
    });
  }

  calculateViewport() {
    this.setState({
      height: this.getHeight(),
    });
  }

  renderAngle(angle, key) {
    const config = {
      silentMode: false,
      createImage: false,
      onCreateImage: (image) => this.onCreateImage(image),
      baseImageSrc: '',
      blendedOverlays: [],
      unblendedOverlays: [],
      logoConfig: angle.logoConfig,
      renderLargeImage: angle.angleIndex > 5,
    };

    getLayers(config, angle.files, this.props.colorConfiguration);

    return (
      <CanvasRendererWrapper {...config } key={key} />
    );
  }

  getSidebarWidth() {
    switch(ViewportHelper.getViewportAbbreviation()) {
    case 'xl':
    case 'lg':
      return 380;
    case 'md':
      return 310;
    default:
      return 0;
    }
  }

  getHeight() {
    if (this.props.productDesign) {
      return Math.min(1440, window.innerWidth) * 0.85 * 66.666;
    }
    else {
      return (Math.min(1440, window.innerWidth) * 0.85) - this.getSidebarWidth();
    }
  }

  render() {
    const { angles, colors, positionDefault } = this.props;

    if (!angles || Object.keys(angles) <= 0 || !colors || Object.keys(colors).length <= 0) return null;

    return (
      <Carousel calculatedHeight={this.state.height} positionDefault={positionDefault}>
        {Object.values(angles).map((angle, i) =>
          this.renderAngle(angle, i)
        )}
      </Carousel>
    );
  }
}

const mapStateToProps = (state, props) => ({
  colorConfiguration: state.selectedOrder.order.config.colorConfiguration,
  angles: getCustomizerAngles(state, props),
  colors: state.colors.colors,
});

export default connect(mapStateToProps, null)(Customizer);
