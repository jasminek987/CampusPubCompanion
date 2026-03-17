import menuData from '../data/menuData.js';
import specialsData from '../data/specialsData.js';

export const DataServices = {
  getMenu() {
    return menuData;
  },

  getSpecials() {
    return specialsData;
  }
};

export default DataServices;