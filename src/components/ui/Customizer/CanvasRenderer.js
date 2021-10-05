import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { applicationError } from '@/store/actions/error';
import { ERRORS } from '@/utils/constants/constants';
import media from '@/utils/media';
import { isLoading } from '@/store/selectors/loading';
import { canvasRendererPropTypes } from './CanvasRendererPropTypes';
import { Loader } from '@/components/ui/PageLoader/Loader';
import queryString from 'query-string';


const StyledCanvas = styled.canvas`
  ${props => props.invisibleMode ? 'display: none': null};
  margin-top: -0.2rem;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 500ms ease;
  max-width: ${props => props.renderLargeImage ? '80%' : '90%'};
  max-height: 100%;

  ${media.md`
    max-width: ${props => props.renderLargeImage ? '70%' : '80%'};
  `}
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-44%) translateX(-1%);
  width: 100%;
`;

class CanvasRenderer extends PureComponent {
  static propTypes = {
    ...canvasRendererPropTypes,
    createImage: PropTypes.bool,
    invisibleMode: PropTypes.bool,
    renderLargeImage: PropTypes.bool,
    onCreateImage: function(props, propName) {
      if ((props['createImage'] === true && (props[propName] === undefined || typeof(props[propName]) !== 'function'))) {
        return new Error('Error creating Image');
      }
    },
    aspectRatio: PropTypes.number,
    sizeInPercentage: PropTypes.number,
  };

  static defaultProps = {
    aspectRatio: 0.80,
    sizeInPercentage: 85,
    transitionTime: 200,
    timeline: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      loaded: 0,
      isLoading: true,
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.logo = [];
    this.onImagesLoaded = () => this.draw();
    // The visible canvas
    this.mainCtx = this.canvasRef.current.getContext('2d');
    // The merging/offscreen canvas
    this.overlayCtx = this.canvasRef.current.cloneNode().getContext('2d');
    this.loadImages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.baseImageSrc !== this.props.baseImageSrc || this.isLayerUpdate(prevProps.blendedOverlays) || this.isLogoUpdate(prevProps.logoConfig)) {
      this.loadImages();
      this.logo = [];
    }
  }

  componentWillUnmount() {
    this.onImagesLoaded = () => {};
  }

  isLogoUpdate(prev) {
    const logoUpdate = (prev !== this.props.logoConfig);

    //might need to deeply compare logconfig array

    return logoUpdate;
  }

  isLayerUpdate(prev) {
    if (prev.length !== this.props.blendedOverlays.length) {
      return true;
    }

    for (let i=0; i < prev.length; i++) {
      if (prev[i].imageSrc !== this.props.blendedOverlays[i].imageSrc || prev[i].color !== this.props.blendedOverlays[i].color) {
        return true;
      }
    }

    return false;
  }

  loadImages() {
    this.setState({
      isLoading: true,
    });

    this.mainCtx.clearRect(0, 0, this.mainCtx.canvas.width, this.mainCtx.canvas.height);

    const mainLoaded = this.createImage(this.props.baseImageSrc).then(img => {
      this.baseImage = img;
    });

    let logoLoaded = null;

    if (this.props.logoConfig) {
      logoLoaded = this.props.logoConfig.map(logoConfig => {
        return this.createImage(logoConfig.url).then(img => {
          const logo = {
            ...logoConfig,
            logo: img,
          };

          this.logo.push(logo);
        });
      });
    }
    else {
      logoLoaded = [Promise.resolve()];
    }

    this.blendedImages = [];
    this.unblendedImages = [];

    const blendedLoaded = this.props.blendedOverlays.map(overlay => this.waitForImageLoaded(overlay, this.blendedImages));
    const unblendedLoaded = this.props.unblendedOverlays.map(overlay => this.waitForImageLoaded(overlay, this.unblendedImages));

    Promise.all([mainLoaded, ...blendedLoaded, ...unblendedLoaded, ...logoLoaded]).then(() => {
      this.onImagesLoaded();
    }).catch(e => {
      console.log("CANVAS ERROR");
      console.log(e);
      this.props.applicationError(ERRORS.CANVAS_ERROR);
    });
  }

  waitForImageLoaded(overlay, destinationArray) {
    return this.createImage(overlay.imageSrc).then(img => {
      destinationArray.push({
        src: img,
        color: overlay.color,
      });
    });
  }

  createImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.crossOrigin = 'Anonymous'; // Allow for images hosted elsewhere.
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject();
    });
  }

  draw() {
    // we need to resize both canvases
    const dimensions = {
      height: this.mainCtx.canvas.height = this.overlayCtx.canvas.height = this.baseImage.height,
      width: this.mainCtx.canvas.width = this.overlayCtx.canvas.width = this.baseImage.width,
    };

    this.mainCtx.drawImage(this.baseImage, 0, 0, dimensions.width, dimensions.height);
    this.mainCtx.globalCompositeOperation = 'hard-light';
    // then do the compositing on each overlay

    this.drawOverlays(dimensions, this.blendedImages);
    this.drawOverlays(dimensions, this.unblendedImages);
    const previousOpacity = this.mainCtx.globalAlpha;

    this.mainCtx.globalAlpha = 0.75;
    this.mainCtx.drawImage(this.baseImage, 0, 0, dimensions.width, dimensions.height);
    this.mainCtx.globalAlpha = previousOpacity;
    this.drawLogos();
    // Let the caller handle mapping to a product and angle.
    if (this.props.createImage) {
      this.props.onCreateImage(this.createDataImage());
    }

    this.setState({
      isLoading: false,
    });
  }

  drawLogos() {
    if (!this.logo || this.logo.length <= 0) return;
    this.logo.forEach(logo => {
      this.mainCtx.setTransform(Number(logo['X Scale'])/100, 0, 0, Number(logo['Y Scale'])/100, logo['X Coordinate'], logo['Y Coordinate']); // set scale and origin
      this.mainCtx.rotate(Number(logo.Angle) * Math.PI / 180);

      // which will be blended on the main context
      this.mainCtx.globalCompositeOperation = 'source-over';
      this.mainCtx.globalAlpha = 1;
      this.mainCtx.drawImage(logo.logo, -logo.logo.width / 2, -logo.logo.height / 2);
      this.mainCtx.setTransform(1,0,0,1,0,0);
    });
  }

  drawOverlays(dimensions, images) {
    images.forEach((img) => {
      this.overlayCtx.globalCompositeOperation = 'hard-light';
      this.overlayCtx.clearRect(0, 0, dimensions.width, dimensions.height);
      this.overlayCtx.drawImage(img.src, 0, 0, dimensions.width, dimensions.height);
      this.overlayCtx.globalCompositeOperation = 'source-atop';

      //Translate colors for better display.
      if (img.color) {
        //For testing
        const values = queryString.parse(this.props.location.search);

        const color = values.hextest || img.color.toUpperCase() || img.color;

        this.overlayCtx.fillStyle = `#${color}`;
        this.overlayCtx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      // which will be blended on the main context
      this.mainCtx.drawImage(this.overlayCtx.canvas, 0, 0, dimensions.width, dimensions.height + 1);
    });
  }

  createDataImage() {
    // Api only accept img/jpg, canvas can only build image/jpeg, but it is same.
    return this.canvasRef.current.toDataURL("image/jpeg", 0.25).replace('image/jpeg', 'img/jpg');
  }

  render() {
    const {invisibleMode, pageLoading, renderLargeImage} = this.props;
    const { isLoading } = this.state;

    return (
      <>
      <LoaderContainer>
        <Loader loading={isLoading && !pageLoading} />
      </LoaderContainer>
      <StyledCanvas isLoading={isLoading} ref={this.canvasRef} invisibleMode={invisibleMode} renderLargeImage={renderLargeImage} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageLoading: isLoading(state),
  };
};

const mapDispatchToProps = dispatch => ({
  applicationError: (error) => dispatch(applicationError(error)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasRenderer));
