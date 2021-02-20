<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      {{ !user ? "Login" : `Welcome, ${user.displayName}` }}
    </h1>

    <button
      v-if="!user"
      type="button"
      class="button is-outlined is-rounded is-primary mb-0"
      @click="login"
    >
      Log in
    </button>
    <template v-else>
      <router-link
        tag="button"
        to="/bets"
        class="button is-outlined is-rounded is-info mb-0"
        >Go to bets</router-link
      >
      <button
        type="button"
        class="button is-outlined is-rounded is-danger mb-0"
        @click="logOut"
      >
        Log out
      </button>
    </template>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { login, logOut } from "~/endpoints/auth";
export default {
  name: "Login",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    login,
    logOut,
  },
};
</script>