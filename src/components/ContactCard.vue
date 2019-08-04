<template>
  <div class="contact-card flex flex-auto items-center justify-between w-100 bg-white pv3">
    <section class="w-30 tc">
      <img v-if="contact.avatar" class="mw3 br-pill" :src="contact.avatar"/>
      <span v-else class="br-pill w-100 b--gray ba pa3">{{ getInitials(contact.fullName) }}</span>
    </section>
    <section class="w-70">
      <span class="db b">{{ contact.fullName }}</span>
      <span class="db f6" v-if="contact.organization">{{ contact.organization }}</span>
      <span class="db f7" v-if="contact.phones.mobile">Mobile: {{ contact.phones.mobile }}</span>
      <span class="db f7" v-if="contact.phones.Home">Home: {{ contact.phones.home }}</span>
    </section>
  </div>
</template>

<script>
  import { compose, join, map, head, split } from 'ramda';

  const getInitials = compose(
    join(''),
    map(head),
    split(' ')
  );

  export default {
    name: 'ContactCard',
    props: {
      contact: {
        type: Object,
        required: true
      }
    },
    methods: {
      getInitials(fullName) {
        return getInitials(fullName);
      }
    }
  }
</script>

<style>
  .contact-card {
    min-height: 100px;
  }
</style>
