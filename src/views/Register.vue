<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
    <div class="form-floating">
      <input v-model="data.name" type="text" class="form-control" id="floatingInputName" placeholder="bill">
      <label for="floatingInputName">Name</label>
    </div>
    <div class="form-floating">
      <input v-model="data.email" type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com">
      <label for="floatingInputEmail">Email address</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import {useRouter} from "vue-router";
export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: ''
    });

    const router = useRouter();

    const submit = async () => {
      console.log(data)
      await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
      })

      await router.push('/login')
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
