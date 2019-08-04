<template>
  <div class="contact-list-wrapper">
    <div v-for="(sortedContacts, key) in sortAlphabetically(contacts)" :key="key">
      <span class="pa2 db">{{ key }}</span>
      <div class="shadow-4">
        <div v-for="(contact, cid) in sortedContacts"
             :key="cid"
             :class="{'bb': cid < sortedContacts.length - 1}"
             class="b--light-gray"
             @click="$router.push(`/contact/${contact.id}`)"
        >
          <ContactCard :contact="contact" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { groupBy } from 'ramda';
  import ContactCard from './ContactCard';
  const sortAlphabetically = groupBy(({ fullName }) => fullName[0]);

  export default {
    name: 'ContactList',
    props: {
      contacts: {
        type: Array,
        required: true
      }
    },
    components: {
      ContactCard
    },
    methods: {
      sortAlphabetically(list) {
        return sortAlphabetically(list);
      }
    }
  }
</script>

<style lang="scss">

</style>
