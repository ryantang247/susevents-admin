<template>
  <Header/>
  <v-row>
    <v-col cols="auto">
      <MenuList/>
    </v-col>
    <v-col>
<!--      <PrettyChatWindow-->
<!--      />-->
    </v-col>
  </v-row>
</template>

<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import VenueCards from "~/components/dashboard/venueCards.vue";

import { applyReactInVue } from "veaury";
import userconfig from '@/userconfig.json';

export default {
  components: {
    VenueCards,
    Header,
    MenuList,
    // PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    // ChatFeed: applyReactInVue(ChatFeed),
    // ChatEngineWrapper: applyReactInVue(ChatEngineWrapper),
    // ChatSocket:applyReactInVue(ChatSocket)
  },
  data() {
    return {
      projectId: userconfig.chatProjectId

    }
  }

}
</script>