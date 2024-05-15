<template>
  <Header/>
  <v-row>
    <v-col cols="auto">
      <MenuList/>
    </v-col>
    <v-col>
      <order-table/>
    </v-col>
  </v-row>
</template>


<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import EventCards from "~/components/dashboard/eventCards.vue";
import OrderTable from "~/components/dashboard/orderTable.vue";

export default {
  components: {OrderTable, EventCards, Header, MenuList},

}
</script>