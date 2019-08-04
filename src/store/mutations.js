export default {
  setLoading(state, loading) {
    state.loading = loading
  },
  setContacts(state, contacts) {
    state.contacts = contacts;
  },
  setContact(state, contact) {
    state.contact = contact;
  },
  setSection(state, title) {
    state.section = title;
  }
}
