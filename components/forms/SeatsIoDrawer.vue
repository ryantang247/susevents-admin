<template>
  <v-container>
  <v-row>
    <v-col cols="3">
      <v-switch color="primary" @click="enableSeat" label="Enable Seating Mechanism"></v-switch>
    </v-col>
    <v-col v-if="seatsioChartKey && isSeated" cols="2">
      <v-btn @click="dialogOpen=true">Open Chart</v-btn>
    </v-col>
  </v-row>
  </v-container>
  <v-container v-if="!isSeated">
    <div>
    <v-list-item
        v-if="pricing"
        v-for="n in pricing"
        :key="n.category"
        :title="'Item ' + n.category"
        :subtitle="n.price"
    ></v-list-item>
    <v-text-field
        v-model="capacity"
        label="Enter capacity"
        type="number"
        placeholder="Enter capacity"
        @update:modelValue="$emit('capacity', capacity)"

    ></v-text-field>
    <v-row>
      <v-col>
        <v-text-field
            v-model="placeholder.category"
            label="Enter category"
            placeholder="Enter category"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            v-model="placeholder.price"
            label="Enter price"
            type="number"
            placeholder="Enter price"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addItem" color="primary">Add Item</v-btn>
      </v-col>
    </v-row>
    </div>
  </v-container>
  <v-container v-if="seatsioEventsKey">
    <v-card-text>Enter pricing</v-card-text>
    <v-row>
      <v-col
          v-for="(item, index) in pricing"
          :key="index"
          cols="12"
          sm="6"
          md="4"
      >
        <v-text-field
            v-model="item.price"
            :label="item.category"
            type="number"
            placeholder="Enter price"
            @input="item.price = Number(item.price.trim()); $emit('pricing', pricing)"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogOpen">
    <v-card>
      <v-card-title class="headline">Seating Mechanism Configuration</v-card-title>
      <div style="height: 700px">
        <SeatsioDesigner
            :secretKey="key"
            :chartKey="seatsioChartKey"
            region="oc"
            style="height: 700px"
            @chartCreated="onChartCreated"
        />
      </div>
      <v-card-actions class="d-flex justify-center"> <!-- Add classes to center-align -->
        <v-btn color="primary" @click="saveSeatingMechanism">Save</v-btn>
        <v-btn @click="dialogOpen = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import userconfig from "~/userconfig.json";
import {SeatsioDesigner} from "@seatsio/seatsio-vue";

export default {
  name: 'SeatsIoDrawer',
  emits:['can-submit', 'pricing', 'seatio-eventkey',  'seatio-chartkey','capacity'],
  components: {SeatsioDesigner},
  data() {
    return {
      dialogOpen: false,
      formdata: {},
      key: userconfig.username,
      pricing: [],
      eventCategories:[],
      seatsioChartKey: null,
      seatsioEventsKey: null,
      isSeated:false,
      capacity: 0,
      placeholder:{
        category: null,
        price: null
      },
      categoryList: [{id: 1, name: "Competition"},
        {id: 2, name: "Fair"}, {id: 3, name: "Performance"},
        {id: 4, name: "Activity"},
        {id: 5, name: "Seminar"}],
    }
  },
  methods:{
    onChartCreated(key){

      console.log("Current Chart Key: ", key)
      this.seatsioChartKey = key
      this.$emit('seatio-chartkey', this.seatsioChartKey)

    },
    enableSeat(){
      if(this.isSeated){
        this.isSeated = !this.isSeated
        this.seatsioChartKey = null
        this.seatsioEventsKey = null
        this.$emit('seatio-chartkey', this.seatsioChartKey)
        this.$emit('seatio-eventkey', this.seatsioEventsKey)


      } else {
        this.isSeated = !this.isSeated
        this.dialogOpen = true
        this.pricing = []
        this.$emit('seatio-eventkey', null)

      }
    },
    addItem() {
      // Add a new item to the items array
      this.pricing.push({
        category: this.placeholder.category,
        price: this.placeholder.price,
      });
      this.$emit('pricing', this.pricing)
      // Clear the placeholder
      this.placeholder.category = '';
      this.placeholder.price = null;
    },

    saveSeatingMechanism(){
      if (this.seatsioChartKey) {
        this.$emit('can-submit', false)
        this.dialogOpen = false;
        axios.post(
            'https://api-oc.seatsio.net/events',
            {
              "chartKey": this.seatsioChartKey,

            },
            {
              auth: {
                username: userconfig.username,
                password: userconfig.password
              }
            }
        )
            .then(response => {

              this.seatsioEventsKey = response.data.key
              this.$emit('seatio-eventkey', this.seatsioEventsKey)
              axios.get(
                  `https://api-oc.seatsio.net/reports/events/${this.seatsioEventsKey}/byAvailabilityReason/summary`,
                  {
                    auth: {
                      username: userconfig.username,
                      password: userconfig.password
                    }
                  }
              ).then(response => {
                  console.log("Summary of event, " ,response)
                  this.capacity = response.data.available.count
                  this.$emit('capacity',  this.capacity)

              })

              axios.get(
                  `https://api-oc.seatsio.net/events/${this.seatsioEventsKey}`,
                  {
                    auth: {
                      username: userconfig.username,
                      password: userconfig.password
                    }
                  }
              )
                  .then(response => {
                    console.log("Loading event category",response.data)
                    response.data.categories.forEach(item => {
                      this.eventCategories.push(item.label)
                    });
                    this.pricing = this.eventCategories.map(category => ({ category, price: null }));
                    this.$emit('pricing', this.pricing)
                    this.$emit('can-submit', true)
                    console.log(this.pricing)
                  })
              ElNotification.success({
                title: 'Success',
                message: "Sucessfully created event!",
                offset: 100,
              }
              );
            })
            .catch(error => {
              console.log("Error ",error )
              ElNotification.error({
              title: 'Error',
              message: "Error in save Seating Mechanism" + error,
              offset: 100,
            });
            });


      } else {
        this.$emit('can-submit', true)

        console.log('Chart not complete!');
      }
    },
  }
}
</script>