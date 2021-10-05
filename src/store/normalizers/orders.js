export const createCartSubDetailFromProduct = product => {
  return Object.values(product.features).map(feature => {
    const subDetail = {
      inputContent: '',
      itemNo: feature.item_no,
    };

    const defaultOption = Object.values(feature.options).find(option => {
      return option.is_default_option;
    });

    subDetail.optionNo = defaultOption.option_no;

    return subDetail;
  });
};

const duplicateCartSubDetails = source => source.orderDetails.map( detail => ({
  inputContent: detail.input_content,
  itemNo: detail.item_no,
  optionNo: detail.option_no,
}));

export const createNewOrder = (product, userId, storeId, duplicateSource) => {
  const cartSubDetail = duplicateSource ? duplicateCartSubDetails(duplicateSource) : createCartSubDetailFromProduct(product);
  return {
    isPublic: 1,
    isTop: 1,
    cartUserId: userId,
    storeNo: storeId,
    cartSubs: [{
      styleNo: product.style_no,
      // TODO:// replace image with correct image.
      selectionImg: 'data:img/jpg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAGAAsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzEIFVs9jxUL/eoor83PsD/9k=',
      quantity: 1,
      cartSubDetail,
    }],
  };
};

/**
 * Returns default GroupInfo. Currently Shipping Information is required.
 */
export const defaultGroupInfo = (userId, storeId) => ({
  defaultShippingAddress: "5445 Conestoga Ct suite 200",
  defaultShippingCity: "Boulder",
  defaultShippingName: "Jony Z",
  defaultShippingPhone: "4541235456",
  defaultShippingStateCode: "CO",
  defaultShippingZip: "80301",
  sellerId: userId,
  storeNo: storeId,
});
