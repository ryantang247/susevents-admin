<template>
  <div>
  <v-text-field
      v-model="this.venueName"
      label="Venue"
      @click="insertVenue();venueDialogOpen = true"
      required

  ></v-text-field>
  <v-dialog v-model="venueDialogOpen">
    <v-card>
      <v-card-title class="headline">Select Venue</v-card-title>
      <v-row style="margin-left: 20px; margin-right: 20px">
        <v-col v-for="venue in venueList" :key="venue.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="selectVenue(venue)" class="mb-3">
            <v-img :src="venue.thumbnail" height="200">
              <!-- You can customize the content here if needed -->
            </v-img>
            <v-card-text>

              <div>{{ venue.name }}</div>
              <div>{{ venue.description}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Dialog actions -->
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="selectVenue">Save</v-btn>
        <v-btn @click="venueDialogOpen = false;venueList = []">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElLoading, ElNotification } from 'element-plus';

export default {
  name: 'VenueSelector',
  emits:['venue-emit'],
  props:{
    receivedVenueId: {
      // provide more specific type to `Object`
      type: String,
      required: true
    },
  },
  data() {
    return {
      venueList:[],
      venueName: '',
      venueDialogOpen: false,
    }
  },
  mounted() {
      // this.insertVenue()
  },

  methods:{
    insertVenue(){
      axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllVenues')
          .then(response => {
            console.log("Venues fetch successfully")
            // console.log(response.data)
            response.data.forEach(item => {

              this.venueList.push(item)

            });
            if (this.receivedVenueId) {
              const foundVenue = this.eventList.find(venue => venue.id === this.receivedVenueId);
              if (foundVenue) {
                this.eventName = foundVenue.name;
              }
            }
            ElNotification.success({
              title: 'Success',
              message: "Sucessfully fetch venues!",
              offset: 100,
            }
            );
          }
          ).catch(error => {
            console.log("Error in Venues", error)
            ElNotification.error({
              title: 'Error',
              message: "Error fetching venues" + error,
              offset: 100,
            });
      });


    },

    selectVenue(venue){
      this.venueDialogOpen = false
      this.venueList = []
      this.venueName = venue.name
      this.$emit('venue-emit', venue.id)
    },
  }
}
</script>