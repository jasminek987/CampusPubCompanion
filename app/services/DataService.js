import menuData from '../data/menuData.js';
import specialsData from '../data/specialsData.js';
import eventsData from '../data/eventsData.js';

export const DataServices = {
  getMenu() {
    return menuData;
  },

  getSpecials() {
    return specialsData;
  },

  getEvents() {
    return eventsData;
  }

};

export default DataServices;