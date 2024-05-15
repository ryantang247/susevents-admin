<template>
  <Header/>
  <v-row>
    <v-col cols="auto">
      <MenuList/>
    </v-col>
    <v-col>
      <event-cards/>
    </v-col>
  </v-row>
</template>




<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import VenueForm from "~/components/forms/venueForm.vue";
import VenueCards from "~/components/dashboard/venueCards.vue";
import EventCards from "~/components/dashboard/eventCards.vue";

export default {
  components: {EventCards, VenueCards, VenueForm, Header, MenuList},

}
</script>