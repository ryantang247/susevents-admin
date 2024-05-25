<template>
  <div class="center">
    <LoginForm/>
  </div>
</template>

<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import LoginForm from "~/components/auth/LoginForm.vue";

export default {
  components: {LoginForm, Header, MenuList},
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh;
}
</style>