<template>
  <div class="view-container">
    <!-- Avatar -->
    <section class="pa3 w-100 tc bg-light-gray">
      <md-icon class="absolute right-1">{{
        contact.favourite ? "star" : "star_border"
      }}</md-icon>
      <div>
        <md-avatar class="md-large md-primary white">
          <img v-if="contact.avatar" :src="contact.avatar" />
          <md-ripple v-else>{{ getInitials(contact.fullName) }}</md-ripple>
        </md-avatar>
      </div>
      <div class="b pv2 f5">{{ contact.fullName }}</div>
      <div class="gray" v-if="title">{{ title }}</div>
    </section>
    <!-- Information -->
    <section class="pa3">
      <!-- Phone: mobile -->
      <div v-if="contact.phones.mobile" class="pb3">
        <span class="db b gray">Mobile</span>
        <span class="f5">{{ contact.phones.mobile }}</span>
      </div>
      <!-- Phone: home -->
      <div v-if="contact.phones.home" class="pb3">
        <span class="db b gray">Home</span>
        <span class="f5">{{ contact.phones.home }}</span>
      </div>
      <!-- Phone: work -->
      <div v-if="contact.phones.work" class="pb3">
        <span class="db b gray">Work</span>
        <span class="f5">{{ contact.phones.work }}</span>
      </div>

      <!-- Email -->
      <div v-if="contact.email" class="pb3">
        <span class="db b gray">Email</span>
        <span class="f5">{{ contact.email }}</span>
      </div>

      <!-- Address -->
      <div v-if="contact.address" class="pb3">
        <span class="db b gray">Address</span>
        <span class="f5">{{ contact.address }}</span>
      </div>
    </section>
    <!-- Floating windows -->
    <md-button class="md-fab md-mini md-plain md-fab-bottom-right" @click="goEdit">
      <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<script>
import { compose, join, map, head, split } from "ramda";

const getInitials = compose(
  join(""),
  map(head),
  split(" ")
);

export default {
  name: "View",
  created() {
    this.getContact();
  },
  mounted() {
    this.$store.commit("setSection", "view");
  },
  computed: {
    contact() {
      return this.$store.state.contact;
    },
    title() {
      const { organization, title } = this.contact;
      return organization && title
        ? [organization, title].join(", ")
        : organization || title;
    }
  },
  methods: {
    getContact() {
      const contactId = this.$route.params.contactId;
      this.$store.commit("setLoading", true);
      this.$store.dispatch("retrieveContact", { contactId }).then(() => {
        this.$store.commit("setLoading", false);
      });
    },
    getInitials(fullName) {
      return getInitials(fullName);
    },
    goEdit() {
      this.$router.push(`/contact/${this.contact.id}/edit`);
    }
  }
};
</script>
