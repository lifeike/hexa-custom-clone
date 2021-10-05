import { MONTHS } from '@/utils/constants/constants';

const month = MONTHS[new Date().getMonth()];
const day = new Date().getDate();
const year = new Date().getFullYear();

export const todaysDate = `${month} ${day}, ${year}`;
