export const getShippingUrl = (shippingService, id) => {
  if (shippingService === 'UPS') {
    return `https://www.ups.com/track?loc=en_US&tracknum=${id}&requester=WT/`;
  }
  else if (shippingService === 'DHL') {
    return `https://www.dhl.com/en/express/tracking.html?brand=DHL&AWB=${id}`;
  }
};
