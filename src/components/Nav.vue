<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>

      <div v-if="!auth">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/login" >Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/register" >Register</router-link>
          </li>
        </ul>
      </div>

      <div v-if="auth">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/login" @click="logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated)

    const logout = async () => {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        credentials: 'include', // <--- get the cookie
      })
    }

    return {
      auth,
      logout,
    }
  }
}
</script>

