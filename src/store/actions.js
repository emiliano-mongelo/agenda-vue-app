import { findAll, findById, update } from '../services/contacts-service';

export default {
  async retrieveContacts({ commit }) {
    try {
      commit('setContacts', await findAll());
    } catch(e) {
      console.error('[Vuex::action::retrieveContacts]', e);
    }
  },
  async retrieveContact({ commit }, { contactId }) {
    try {
      commit('setContact', await findById(contactId));
    } catch(e) {
      console.error('[Vuex::action::retrieveContacts]', e);
    }
  },
  async updateContact({ commit }, payload) {
    try {
      commit('setContacts', await update(payload));
    } catch(e) {
      console.error('[Vuex::action::retrieveContacts]', e);
    }
  },
  async addFavourite({ commit }, { contact, favourite }) {
    try {
      const updatedContact = { ...contact, favourite };
      console.log(updatedContact);
      commit('setContacts', await update(updatedContact));
    } catch(e) {
      console.error('[Vuex::action::retrieveContacts]', e);
    }
  }
}
