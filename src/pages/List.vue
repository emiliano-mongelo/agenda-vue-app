<template>
  <div class="contact-list-container">
    <div class="w-100 pv3">
      <md-tabs md-alignment="centered">
        <md-tab id="tab-contacts" md-icon="contacts" @click="favourites = false" />
        <md-tab id="tab-favorites" md-icon="favorite" @click="favourites = true" />
      </md-tabs>

      <div class="ph2">
        <md-field>
          <md-icon>search</md-icon>
          <label>Search</label>
          <md-input v-model="filterText"></md-input>
        </md-field>

        <ContactList :contacts="contacts" />
      </div>

    </div>

  </div>
</template>

<script>
import { compose, where, filter, contains, toUpper, propEq } from "ramda";
import ContactList from "../components/ContactList";

const searchFn = str =>
  where({
    fullName: compose(
      contains(toUpper(str)),
      toUpper
    )
  });

export default {
  name: "List",
  components: {
    ContactList
  },
  data() {
    return {
      filterText: "",
      favourites: false
    };
  },
  computed: {
    contacts() {
      const contacts = filter(searchFn(this.filterText), this.$store.state.contacts);
      return this.favourites ? filter(propEq('favourite', true), contacts) : contacts;
    }
  },
  created() {
    this.getContacts();
  },
  mounted() {
    this.$store.commit("setSection", "list");
  },
  methods: {
    getContacts() {
      this.$store.commit("setLoading", true);
      this.$store.dispatch("retrieveContacts").then(() => {
        this.$store.commit("setLoading", false);
      });
    }
  }
};
</script>
