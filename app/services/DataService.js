import menuData from '../data/menuData.js';
import eventsData from '../data/eventsData.js';
import specialsData from '../data/specialsData.js';

export const DataServices = {
  getMenu() {
    return menuData;
  },

  getEvents() {
    return eventsData;
  },

  getSpecials() {
    return specialsData;
  }
};

export default DataServices;