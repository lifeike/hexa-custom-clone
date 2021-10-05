import createCachedSelector from 're-reselect';

export const logoSelector = state => state.logo.library;
const groupSelector = state => state.selectedOrder.order.groupId;

export const validLogos = createCachedSelector(
  [logoSelector, groupSelector],
  (logos, group) => {
    if (!logos) return null;
    const allLogos = Object.values(logos);
    const orderLogos = allLogos.filter(logo => { return logo.type === 2 && logo.status && logo.no === group; }).sort((a, b) => a.createtime > b.createtime ? -1 : 1);
    const companyLogos =  allLogos.filter(logo => { return logo.type === 3 && logo.status; }).sort((a, b) => a.createtime > b.createtime ? -1 : 1);

    return [...orderLogos, ...companyLogos];
  }
)(
  // Cachekey
  (logos, group) => `${group}_logos`
);

export const selectedLogo = createCachedSelector(
  [logoSelector, (state, props) => props.selectedOption, (state, props) => props.id],
  (logos, url, id) => {
    if (!logos) return null;
    const allLogos = Object.values(logos);

    return allLogos.find(logo => logo.url === url);
  }
)(
  // Cachekey
  (logos, id) => `${id}_selectedLogo`
);
