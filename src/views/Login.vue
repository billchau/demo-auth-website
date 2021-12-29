<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <div class="form-floating">
      <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="aaa">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "Login",
  setup() {
    const data = reactive({
      username: '',
      password: ''
    })
    const router = useRouter();
    const store = useStore();
    const submit = async () => {
      console.log(data)
      
      try {
        //  sample response
    // {
    //     "refreshToken": "101b3f71-6ba2-4983-a2a0-7c5f3439ea22",
    //     "id": 1,
    //     "username": "aaa",
    //     "email": "ccc@l.com",
    //     "roles": [
    //         "ROLE_MODERATOR",
    //         "ROLE_ADMIN"
    //     ],
    //     "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWEiLCJpYXQiOjE2NDA3MTU4OTgsImV4cCI6MTY0MDcxNTk1OH0.9Eet0lqUY4Bf8FJhI4FTCrrkL8GW8-152AdJH_OYTqQnNEOCgyN4EvPtvO01UI8ayN-1T4UB0LZAA8uui0FWOg",
    //     "type": "Bearer"
    // }

        await fetch("http://localhost:8000/api/auth/signin", {
          method: "POST",
          headers: {'Content-Type': "application/json"},
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          store.dispatch('setAuth', true)
          store.dispatch('setUserData', response)
        })
        await router.push('/')
      } catch(e) {
        await store.dispatch('setAuth', false)
        await store.dispatch('setUserData', {})
        console.log("failed to login")
      }


    }

    return {
      data,
      submit
    }
  }
}
</script>

<style scoped>

</style>
