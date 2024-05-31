<template>
  <div v-if="!isEdit">
  <v-container>
    <v-row>
      <v-col v-for="(user, index) in venueList" :key="index" cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props" class="card-limit">
          <v-img :src="user.thumbnail" alt="Avatar">
            <v-expand-transition>
              <div
                  v-if="isHovering"
                  class="d-flex align-center justify-center transition-fast-in-fast-out"
                  style="height: 100%; background-color: rgba(0, 0, 0, 0.5);"
              >
                <v-btn :id="'edit-'+index"  @click="editItem(user)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn :id="'delete-'+index"  @click="deleteItem(user)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>

          </v-img>
          <v-card-text>
            <div>Name: {{ user.name }}</div>
            <div>{{ user.description }}</div>
          </v-card-text>
        </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card v-bind="props" class="card-limit" >
            <img src="~/assets/plus.png" alt="Avatar">
            <v-card-text>
              <NuxtLink to="/venue/form">
              <div>Add Venue</div>
              </NuxtLink>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
  </div>
  <div v-else>
    <venue-form :is-edit="isEdit" :venue-data="selectedVenue"/>
  </div>
</template>

<script>
import axios from "axios";
import VenueForm from "~/components/forms/venueForm.vue";
import { ElLoading, ElNotification } from 'element-plus';

export default {
  name:'venueCards',
  components: {VenueForm},
  data() {
    return {
      venueList:[],
      selectedVenue: null,
      isEdit: false,
      isDelete: false,
      userList: [
        { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Bob Johnson', avatar: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },

        // Add more users as needed
      ]
    }
  },
  methods:{
    getItems(){
      axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllVenues')
          .then(response => {
            console.log("Venues fetch successfully")
            // console.log(response.data)
            response.data.forEach(item => {

              this.venueList.push(item)

            });
            console.log(this.venueList)
            ElNotification.success({
              title: 'Success',
              message: "Sucessfully fetch venues!",
              offset: 100,
            }
            );
          })
          .catch(error => {
            console.log("Error fetching Venues")
            ElNotification.error({
              title: 'Error',
              message: "Error fetching venues" + error,
              offset: 100,
            });
          });
    },

    editItem(item){
      this.isEdit =true
      this.selectedVenue = item
    },

    deleteItem(item) {
        // Show confirmation dialog
      console.log(item)
        if (confirm("Are you sure you want to delete this item?")) {
          // User confirmed, proceed with deletion
          axios
              .delete(`https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteVenue/${item.id}`,{
                withCredentials:true
              })
              .then((response) => {
                console.log("Venue deleted successfully ",response);
                this.venueList = this.venueList.filter((venue) => venue.id !== item.id);
                // Refresh the venue list or update UI as needed
                ElNotification.success({
                  title: 'Success',
                  message: "Sucessfully deleted!",
                  offset: 100,
                }
                );
              })
              .catch((error) => {
                console.log("Error deleting venue ",error);
                ElNotification.error({
                  title: 'Error',
                  message: "Error deleting venue" + error,
                  offset: 100,
                });
              });
        }
      },
  },

  mounted(){
    this.getItems()
  }
}
</script>

<style scoped>
.card-limit {
  max-width: 500px; /* Adjust the maximum width as needed */
}
</style>