import menuData from '../app/data/menuData.js';
import specialsData from '../app/data/specialsData.js';
import eventsData from '../app/data/eventsData.js';

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