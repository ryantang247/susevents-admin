<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I directly ask it to give me a login page template
-->

<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6">
      <img style="align-items: center; display: flex;margin: auto; width: 300px;" src="~/assets/logo2.png" alt="Logo"/>
      <v-card class="elevation-12">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-label  class="font-weight-bold mb-1">Student ID</v-label>
              <v-text-field v-model="sid" variant="outlined" hide-details color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label class="font-weight-bold mb-1">Password</v-label>
              <v-text-field v-model="password"  variant="outlined" type="password" hide-details color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
              <div class="d-flex flex-wrap align-center">
                <v-checkbox v-model="checkbox" color="primary" hide-details>
                  <template v-slot:label class="text-body-1">Remember this Device</template>
                </v-checkbox>
                <div class="ml-auto">
                  <NuxtLink to="/" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot Password ?</NuxtLink>
                </div>
              </div>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-btn @click="login" color="orange" size="large" block flat>Sign in</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sid: '',
      password: ''
    }
  },
  devServer: {
    proxy: 'http://10.27.175.123:3453/',
    ws: true,
    changeOrigin: true
  },
  methods: {
    async login() {
      try {
        // Perform login logic here
        console.log('Logging in with:', this.sid, this.password);
        const response = await axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/login', {
          sid: this.sid,
          password: this.password
        }, {
          withCredentials:true
            }
        );


        console.log("User login successfully");
        console.log(response.data);

        // Set cookie asynchronously
        const cookie = await useCookie('secourse');
        cookie.value = response.data.secourse;
        localStorage.setItem("Username", response.data.user.name)
        localStorage.setItem("SID", response.data.user.sid)
        localStorage.setItem("Avatar", response.data.user.avatar)

        // Redirect to another page only after cookie is set
        this.$router.push('/user');
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: `Error logging in. ${error.message}`,
          offset: 100,
        });

      }
    }
  }
}
</script>

