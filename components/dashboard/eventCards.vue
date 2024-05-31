<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I ask it to give me a template to display grid like cards
    Heavily modified to use event/venue data
-->

<template>
  <div v-if="!isEdit">
    <v-container>
      <v-row>
        <v-col v-for="(event, index) in eventList" :key="index" cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" class="card-limit">
              <v-img :src="event.thumbnail" alt="Avatar">
                <v-expand-transition>
                  <div
                      v-if="isHovering"
                      class="d-flex align-center justify-center transition-fast-in-fast-out"
                      style="height: 100%; background-color: rgba(0, 0, 0, 0.5);"
                  >
                    <v-btn @click="editItem(event)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteItem(event)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>

              </v-img>
              <v-card-text>
                <div>Name: {{ event.title }}</div>
                <div>{{ event.description }}</div>
                <div>{{ event.startDate }} {{event.endDate}}}</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" class="card-limit" href="/events/addevent">
              <img src="~/assets/plus.png" alt="Avatar">
              <v-card-text>
                <div>Add Event</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <event-form :is-edit="isEdit" :event-data="selectedEvent"/>
  </div>
</template>

<script>
import axios from "axios";
import EventForm from "~/components/forms/eventForm.vue";
import { ElLoading, ElNotification } from 'element-plus';

export default {
  name:'venueCards',
  components: {EventForm,},
  data() {
    return {
      eventList:[],
      selectedEvent: null,
      isEdit: false,
      isDelete: false,
    }
  },
  methods:{
    getItems(){
      axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllEvents')
          .then(response => {
            console.log("Event fetch successfully")
            // console.log(response.data)
            response.data.forEach(item => {

              this.eventList.push(item)

            });
            console.log(this.eventList)
          })
          .catch(error => {
            ElNotification.error({
              title: 'Error',
              message: `Error getting events. ${error.message}`,
              offset: 100,
            });
            console.log("Error fetching Events")
            ElNotification.error({
              title: 'Error',
              message: `Error fetching events. ${error.message}`,
              offset: 100,
            });    
          });
    },

    editItem(item){
      this.isEdit =true
      this.selectedEvent = item
    },

    deleteItem(item) {
      // Show confirmation dialog
      console.log(item)
      if (confirm("Are you sure you want to delete this item?")) {
        // User confirmed, proceed with deletion
        axios
            .delete(`https://secourse2024-675d60a0d98b.herokuapp.com/api/deleteEvent/${item.id}`,{
              withCredentials: true
            })
            .then((response) => {
              console.log("Event deleted successfully ",response);
              ElNotification.success({
                title: 'Success',
                message: `Sucess deleting event.`,
                offset: 100,
              });
              this.eventList = this.eventList.filter((venue) => venue.id !== item.id);
              // Refresh the venue list or update UI as needed
            }, )
            .catch((error) => {
              ElNotification.error({
                title: 'Error',
                message: `Error deleting event. ${error.message}`,
                offset: 100,
              });
              console.log("Error deleting event ",error);
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