<template>
  <div style="margin-top: 24px">username: {{ username }}</div>
  <div style="margin-top: 24px">email: {{ email }}</div>
  <div style="margin-top: 24px; width: 500px;">roles: {{ roles }}</div>
  <div style="margin-top: 24px; width: 500px; word-wrap: break-word;">token: {{ token }}</div>
  <div style="margin-top: 24px; width: 500px">refreshToken: {{ refreshToken }}</div>
  <div style="margin-top: 24px">
    <button @click="testUserApi">Test user role</button>
  </div>
  <div style="margin-top: 24px">
    <button @click="testAdminApi">Test admin role</button>
  </div>
  <div style="margin-top: 24px">
    <button @click="testModApi">Test mod role</button>
  </div>
  <div style="margin-top: 24px">
    <button @click="refreshTokenApi">Test Refresh token</button>
  </div>
  <div style="margin-top: 24px; width: 500px;  word-wrap: break-word;">
    {{result}}
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from "vue";
import {useStore} from "vuex";

export default {
  name: "Home",
  setup() {
    const store = useStore();


    const { username, email, roles, token, refreshToken } = toRefs(store.state);
    const result = ref('');

    const testUserApi = async () => {
      try {
        await fetch("http://localhost:8000/api/test/user", {
          method: "GET",
          headers: { 'Authorization': "Bearer " + token.value }
        })
        .then(response => response.json())
        .then(response => {
          result.value = response.message
        })
      } catch(e) {
        console.log(e)
        result.value = "Fail to access user content"
      }
    }

    const testAdminApi = async () => {
      try {
        await fetch("http://localhost:8000/api/test/admin", {
          method: "GET",
          headers: { 'Authorization':  "Bearer " + token.value  }
        })
        .then(response => response.json())
        .then(response => {
          result.value = response.message
        })
      } catch(e) {
        console.log(e)
        result.value = "Fail to access admin content"
      }
    }

    const testModApi = async () => {
      try {
        await fetch("http://localhost:8000/api/test/mod", {
          method: "GET",
          headers: { 'Authorization':  "Bearer " + token.value  }
        })
        .then(response => response.json())
        .then(response => {
          result.value = response.message
        })
      } catch(e) {
        console.log(e)
        result.value = "Fail to access mod content"
      }
    }

    const refreshTokenApi = async () => {
      try {
        await fetch("http://localhost:8000/api/auth/refreshtoken", {
          method: "POST",
          headers: { 
            'Content-Type': "application/json",
            'Authorization':  "Bearer " + token.value  
          },
          body: JSON.stringify({"refreshToken": refreshToken.value })
        })
        .then(response => response.json())
        .then(response => {
          
          result.value = "new access token: " + response.accessToken + "\nnew refresh token: " + response.refreshToken
          token.value = response.accessToken
          refreshToken.value = response.refreshToken
        })
      } catch(e) {
        console.log(e)
        result.value = "Fail to refresh token"
      }
    }
    return {
      username, email, roles, token, refreshToken,
      result,
      testUserApi,
      testAdminApi,
      testModApi,
      refreshTokenApi
    }
  }
}
</script>

<style scoped>

</style>
