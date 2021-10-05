import PropTypes from 'prop-types';

export const canvasRendererPropTypes = {
  // Url of base image.
  baseImageSrc: PropTypes.string.isRequired,
  blendedOverlays: PropTypes.arrayOf(
    PropTypes.shape({
      //Url of customization layer image.
      imageSrc: PropTypes.string.isRequired,
      //HEX Value without #.
      color: PropTypes.string,
      noBlend: PropTypes.bool,
    }),
  ),
  unblendedOverlays: PropTypes.arrayOf(
    PropTypes.shape({
      //Url of customization layer image.
      imageSrc: PropTypes.string,
      //HEX Value without #.
      color: PropTypes.string,
      noBlend: PropTypes.bool,
    }),
  ),
};
