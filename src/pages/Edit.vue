<template>
  <div class="view-container mt2">
    <!-- Avatar -->
    <section class="relative pa3 w-100 tc bg-light-gray">
      <div class="favourite-wrapper" @click="toggleFavorite">
        <md-icon class="absolute right-1">{{
          contact.favourite ? "star" : "star_border"
        }}</md-icon>
      </div>
      <div>
        <md-avatar class="md-large md-primary white">
          <img v-if="contact.avatar" :src="contact.avatar" />
          <md-ripple v-else>{{ getInitials(contact.fullName) }}</md-ripple>
        </md-avatar>
      </div>
    </section>
    <!-- Information -->
    <section class="pv3">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <!-- Full Name -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('fullName')">
                  <label for="full-name">Full Name</label>
                  <md-input
                    name="full-name"
                    id="full-name"
                    autocomplete="given-name"
                    v-model="form.fullName"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.fullName.required"
                    >The full name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.fullName.minlength"
                    >Invalid full name</span
                  >
                </md-field>
              </div>
              <!-- Mobile -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('mobile')">
                  <label for="mobile">Mobile</label>
                  <md-input
                    name="mobile"
                    id="mobile"
                    autocomplete="given-mobile"
                    v-model="form.mobile"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.mobile.required"
                    >The mobile phone is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.mobile.numeric"
                    >Invalid mobile</span
                  >
                </md-field>
              </div>
              <!-- Home -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('home')">
                  <label for="home">Home</label>
                  <md-input
                    name="home"
                    id="home"
                    autocomplete="given-home"
                    v-model="form.home"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.home.numeric"
                    >Invalid mobile</span
                  >
                </md-field>
              </div>
              <!-- Work -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('work')">
                  <label for="work">Work</label>
                  <md-input
                    name="work"
                    id="work"
                    autocomplete="given-work"
                    v-model="form.work"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.work.numeric"
                    >Invalid number</span
                  >
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <!-- Organization -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('organization')">
                  <label for="organization">Organization</label>
                  <md-input
                    name="organization"
                    id="organization"
                    autocomplete="organization-name"
                    v-model="form.organization"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.organization.minlength"
                    >Invalid organization name</span
                  >
                </md-field>
              </div>
              <!-- Title -->
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="title">Title</label>
                  <md-input
                    name="title"
                    id="title"
                    autocomplete="title-name"
                    v-model="form.title"
                    :disabled="loading"
                  />
                  <span class="md-error" v-if="!$v.form.title.minlength"
                    >Invalid title name</span
                  >
                </md-field>
              </div>
            </div>

            <!-- Email -->
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="loading"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>
          </md-card-content>

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="loading"
              >Save</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved"
          >The user {{ lastUser }} was saved with success!</md-snackbar
        >
      </form>
    </section>
  </div>
</template>

<script>
import { compose, join, map, head, split } from "ramda";
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

const getInitials = compose(
  join(""),
  map(head),
  split(" ")
);

export default {
  name: "Edit",
  mixins: [validationMixin],
  created() {
    this.getContact();
  },
  mounted() {
    this.$store.commit("setSection", "edit");
  },
  data () {
    return {
      userSaved: false,
      lastUser: null
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    form() {
      return {
        id: this.contact.id,
        fullName: this.contact.fullName,
        mobile: this.contact.phones.mobile,
        home: this.contact.phones.home,
        work: this.contact.phones.work,
        title: this.contact.title,
        email: this.contact.email,
        address: this.contact.address,
        organization: this.contact.organization
      };
    },
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
  validations: {
    form: {
      fullName: {
        required,
        minLength: minLength(3)
      },
      mobile: {
        required,
        minLength: minLength(7)
      },
      work: {
        minLength: minLength(7)
      },
      home: {
        minLength: minLength(7)
      },
      organization: {
        maxLength: minLength(3)
      },
      title: {
        maxLength: minLength(3)
      },
      address: {
        maxLength: minLength(3)
      },
      email: {
        email
      }
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
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    saveContact() {
      this.$store.commit("setLoading", true);
      this.$store.dispatch("updateContact", this.form).then(() => {
        this.userSaved = true;
        this.$store.commit("setLoading", false);
        this.$router.push('/');
      });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveContact();
      }
    },
    toggleFavorite() {
      this.$store.commit("setLoading", true);
      this.$store.dispatch("addFavourite", { contact: this.contact, favourite: !this.contact.favourite }).then(() => {
        this.$store.commit("setLoading", false);
      });
    }
  }
};
</script>
