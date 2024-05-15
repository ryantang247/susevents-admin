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
  flex-direction: row;
  height: 100vh;
}

</style>