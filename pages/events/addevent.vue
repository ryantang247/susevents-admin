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

}
</script>