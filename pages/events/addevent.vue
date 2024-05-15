<template>
  <Header/>
  <div >
    <v-row >
      <v-col cols=auto>
        <MenuList/>
      </v-col>
      <v-col >
        <div class="text-center"> <!-- Apply text-center class to align items at the center -->
          <event-form/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import VenueForm from "~/components/forms/venueForm.vue";
import UserForm from "~/components/forms/userForm.vue";
import {SeatsioDesigner, SeatsioEventManager, SeatsioSeatingChart} from '@seatsio/seatsio-vue';
import EventForm from "~/components/forms/eventForm.vue";
import axios from "axios";
const username = '5f4908aa-ff2b-42c5-ad29-62a8d60b8207';

// Website provided automatic base64 encoding
// const authString = btoa(username+':')

const sampleEvent = '4bf8d9e1-3724-44b8-9a35-6578224d1539'

export default {

  components: {SeatsioSeatingChart ,SeatsioEventManager, EventForm, SeatsioDesigner, UserForm, VenueForm, Header, MenuList},
  data: () => ({
    pricing:[
      { category: 1, price: 30 },
      { category: 2, price: 40 },

    ],
    currentChartKey: null,
    objects:[]
  }),

  mounted() {

    // axios.get('https://api-oc.seatsio.net/charts', {
    //   auth: {
    //     username: username,
    //     password: password
    //   }
    // })
    //     .then(response => {
    //       console.log("Get chart successfully")
    //       console.log(response.data)
    //     })
    //     .catch(error => {
    //       console.error("An error occurred:", error);
    //     });


  }

}
</script>