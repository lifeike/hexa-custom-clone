export const getLayers = (config, images, colorConfiguration) => {
  images.forEach(image => {
    const image_name = image.imageSrc.split('\\').pop().split('/').pop().split('.').shift();

    if (image_name === 'base_product') {
      config.baseImageSrc = image.imageSrc;
    }
    else if (image_name === 'zipper_pull') {
      config.unblendedOverlays.push(image);
    }
    else if (image_name !== 'label' && image_name !== 'labels') {
      try {
        const hexColor = colorConfiguration[image.color.id].imageColor;

        config.blendedOverlays.push({
          imageSrc: image.imageSrc,
          color: hexColor,
        });
      }
      catch (e) {
        // These errors will greatly help in finding errors in the Customizer tool.
        // eslint-disable-next-line no-console
        console.log(e);
        console.log(image.color);
        console.log(image.imageSrc);
        console.log(image_name);
      }
    }
  });
};
