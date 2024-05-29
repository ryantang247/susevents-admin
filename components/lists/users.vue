<template>
  <div v-if="!isEdit">
    <v-container >
      <v-data-table
          :headers="headers"
          :items="users"
          item-key="name"
          :items-per-page="15"

          style="margin-top: 15px; "
      >
        <template  v-slot:top>
          <v-toolbar color="cyan-lighten-1">
            <v-toolbar-title>Users</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <div>
            <v-btn icon  @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:[`item.avatar`]="{ item }">
          <v-avatar>
            <v-img :src="item.avatar" alt="Avatar"/>
          </v-avatar>
        </template>

      </v-data-table>
    </v-container>
    <v-list-item class="custom-background-color">
      <v-btn href="/user/newuser" variant="text" icon="mdi-account-plus"></v-btn>
      <v-list-item-title>New User</v-list-item-title>
    </v-list-item>
  </div>
  <div v-else>
    <user-form :is-edit="isEdit" :edit-user="editedItem"></user-form>
  </div>
</template>
<script>
import {ElMessageBox } from "element-plus";
import axios from "axios";
import Newuser from "~/pages/user/newuser.vue";
import UserForm from "~/components/forms/userForm.vue";
export default {
  components: {UserForm, Newuser},
  devServer: {
    proxy: 'http://10.27.175.123:3453/',
    ws: true,
    changeOrigin: true
  },
  data: () => ({
    headers: [
      { title: 'Avatar', key:'avatar' ,align: 'center'},
      { title: 'Name', key: 'name',align: 'center' },
      { title: 'ID', key: 'sid',align: 'center' },
      { title: 'Edit', key: 'edit',align: 'center' }

    ],
    users:[],
    isEdit: false,
    editedItem: null
  }),
  methods:{
    editItem(item){
      this.editedItem = this.users.find(user => user.id === item.id);
      this.isEdit = true
    },

    deleteItem(item){
      console.log("Deleting ", item.id)

      axios.delete(`https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteUser/${item.id}`,{
        withCredentials:true
      })
          .then(response => {
            ElNotification.success({
              title: 'Success!',
              message: `User successfully deleted!`,
              offset: 100,
            });

          })
          .catch(error => {
            ElNotification.error({
              title: 'Error',
              message: `Error deleting users. ${error.message}`,
              offset: 100,
            });
            console.log("Error deleting users")

          });
    }
  },
  mounted() {
    axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllUsers')
        .then(response => {
          console.log("User fetch successfully")
          // console.log(response.data)
          response.data.forEach(item => {

            this.users.push(item)

          });
          console.log(this.users)
        })
        .catch(error => {
          ElNotification.error({
            title: 'Error',
            message: `Error fetching users list. ${error.message}`,
            offset: 100,
          });

        });

  }
}
</script>