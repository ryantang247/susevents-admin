<template>
  <Header/>
  <div v-if="!this.$vuetify.display.mdAndDown">
  <v-row >
    <v-col cols="auto">
      <MenuList/>
    </v-col>
    <v-col >
      <div class="text-center"> <!-- Apply text-center class to align items at the center -->
        <venue-form/>
      </div>
    </v-col>
  </v-row>

  </div>
  <div v-else>
    <MenuList/>
    <div class="text-center"> <!-- Apply text-center class to align items at the center -->
      <venue-form/>
    </div>
  </div>
</template>




<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import VenueForm from "~/components/forms/venueForm.vue";

export default {
  components: {VenueForm, Header, MenuList},

}
</script>