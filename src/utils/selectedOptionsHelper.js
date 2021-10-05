export const isMale = (cartSubDetail) => {
  return cartSubDetail.find(option => option.itemNo === 'G001').optionNo === "1";
};
