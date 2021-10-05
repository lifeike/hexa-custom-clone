import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLayers } from '@/utils/canvasHelpers';

import CanvasRenderer from '@/components/ui/Customizer/CanvasRenderer';
import { getCustomizerAngles } from '@/store/selectors/subOrder';

class ProductDesignImages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: 0,
      mensImage: '',
      womensImage: '',
    };
  }

  handleImageCreation(image, typeName) {
    this.setState({
      [typeName]: image,
    });

    this.increment();
  }

  increment() {
    const count = this.state.loaded + 1;

    this.setState({
      loaded: count,
    });

    if (count === 2) {
      this.props.onImagesCreated(this.state.mensImage, this.state.womensImage);
    }
  }

  getConfigs(images, callback) {
    const baseConfig = {
      invisibleMode: true,
      createImage: true,
      onCreateImage: callback,
      baseImageSrc: '',
      blendedOverlays: [],
      unblendedOverlays: [],
      logoConfig: images.logoConfig,
    };

    getLayers(baseConfig, images.files, this.props.colorConfiguration);

    return baseConfig;
  }

  render() {
    const { mensAngle, womensAngle } = this.props;

    const womensConfig = this.getConfigs(womensAngle, (image) => this.handleImageCreation(image, 'womensImage'));
    const mensConfig = this.getConfigs(mensAngle, (image) => this.handleImageCreation(image, 'mensImage'));

    return (
      <>
        <CanvasRenderer {...mensConfig}></CanvasRenderer>
        <CanvasRenderer {...womensConfig}></CanvasRenderer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    colorConfiguration: state.selectedOrder.order.config.colorConfiguration,
    mensAngle: getCustomizerAngles(state, { gender: 'm' })[0],
    womensAngle: getCustomizerAngles(state, { gender: 'w' })[0],
  };
};

export default connect(mapStateToProps, null)(ProductDesignImages);
