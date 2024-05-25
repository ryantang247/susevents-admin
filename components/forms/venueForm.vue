<template>
  <v-container class="my-8"> <!-- Adding margin top and bottom -->
    <form>
      <v-text-field
          v-model="name"
          label="Name"
          required

      ></v-text-field>

      <v-text-field
          v-model="description"

          label="Description"
          required

      ></v-text-field>
      <v-row cols="auto">
        <v-col >
          <v-text-field id="xcoord" type="number" v-model="xcoord"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field id="ycoord" type="number" v-model="ycoord"></v-text-field>
        </v-col>
      </v-row>
      <v-file-input @change="onFileChanged($event)" label="Select Thumbnail"></v-file-input>
      <location-getter id="getloc" @coordinates-selected="handleCoordinates"/>

      <v-btn
          class="me-4"
          @click="submitVenue()"
      >
        submit
      </v-btn>
      <v-btn >
        clear
      </v-btn>
    </form>
  </v-container>
</template>
<script>
import axios from "axios";
import LocationGetter from "~/components/map/LcoationGetter.vue";

export default {
  components: {LocationGetter},
  props:{
    isEdit: Boolean,
    venueData: Object
  },
  data: () => ({
    name:  '',
    description:  '',
    image: '',
    xcoord:  null,
    ycoord:  null,
    selectedVenue: null
  }),
  async mounted() {
    // If in edit mode and editUser is provided, autofill the form
    if (this.isEdit) {
      try{

      this.name = this.venueData.name || '';
      this.description = this.venueData.description || '';
      this.image = this.venueData.thumbnail || '';
      this.xcoord = this.venueData.coordinateX || null;
      this.ycoord = this.venueData.coordinateY || 'null';
      this.selectedVenue = this.venueData.id
      } catch (error) {
        console.error('Error fetching image:', error);
        ElNotification.error({
          title: 'Error',
          message: `Error fetching image. ${error.message}`,
          offset: 100,
        });
      }
    }
  },
  methods:{
    handleCoordinates({ lng, lat }){
      this.xcoord = lng
      this.ycoord = lat
    },
    onFileChanged(event){

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result;
          this.image = base64String
          // console.log('Uploaded image', base64String); // This is the Base64-encoded image data
        };
        reader.onerror = error => {
          ElNotification.error({
            title: 'Error parsing image',
            message: "There is problem in image parsing!",
            offset: 100,
          })
          console.error('Error reading file:', error);
        };
      }
    },
    submitVenue(){

      if(!this.isEdit){
        axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/createVenue',
            {
              name: this.name,
              description: this.description,
              thumbnail: this.image,
              coordinateX: this.xcoord,
              coordinateY: this.ycoord,

            }
            ,{withCredentials:true})
            .then(response => {
              console.log("Venue created successfully")
              console.log(response)
              ElNotification.success({
                title: 'Success',
                message: "Venue created successfully!",
                offset: 100,
              })
              navigateTo('/venue')
            },)
            .catch(error => {
              ElNotification.error({
                title: 'Error',
                message: "Error creating events: " + error,
                offset: 100,
              })
              console.log("Error creating venue")

            });
      }else {
        // console.log("Current image ",this.image)
        axios.patch(`https://secourse2024-675d60a0d98b.herokuapp.com/api/updateVenue/${this.selectedVenue}`,
            {
              name: this.name,
              description: this.description,
              thumbnail: this.image,
              coordinateX: this.xcoord,
              coordinateY: this.ycoord,

            }
            ,{withCredentials:true})
            .then(response => {
              console.log("Venue updated successfully")
              console.log(response)
              ElNotification.success({
                title: 'Success',
                message: "Venue updated successfully!",
                offset: 100,
              })
              navigateTo('/venue')
            },)
            .catch(error => {
              console.log("Error updating venue")
              ElNotification.error({
                title: 'Error',
                message: "Error updating events: " + error,
                offset: 100,
              })
            });
      }

    },

  },

}
</script>