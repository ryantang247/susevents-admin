<template>
  <v-container class="my-8"> <!-- Adding margin top and bottom -->
    <form>
      <div v-if="isEdit">
        <h1>Edit Event</h1>
        <Timeline :status="this.formdata.status" @selected-index="handleSelectedIndex"/>
      </div>
      <v-text-field
          v-model="this.formdata.title"
          label="Event Name"
          required

      ></v-text-field>

      <v-text-field
          v-model="this.formdata.contactName"
          label="Organizer"
          required

      ></v-text-field>
      <v-text-field
          v-model="this.formdata.description"
          label="Description"
          required

      ></v-text-field>
      <VenueSelector :received-venue-id="formdata.venueId" @venue-emit="handleVenue"/>
      <v-container>
        <v-row>
          <!-- Start Date Picker -->
          <v-col cols="12" sm="6">
            <p>Start date</p>
            <DatePicker id="start-date" :received-date="formdata.startDate" @value-emit="handleDate1"  />
          </v-col>

          <!-- End Date Picker -->
          <v-col cols="12" sm="6">
            <p>End date</p>
            <DatePicker id="end-date" :received-date="formdata.endDate" @value-emit="handleDate2"/>
          </v-col>
        </v-row>
      </v-container>
      <v-text-field
          v-model="this.formdata.contact"
          label="Contact Number"
          required

      ></v-text-field>
      <v-text-field
          v-model="this.formdata.videolink"
          label="Live streaming link"
          required

      ></v-text-field>
      <el-select
          v-model="formdata.category"
          placeholder="Select category"
          size="large"
          style="width: 100%; color: grey; margin-bottom: 20px; height: 40px;"
      >
        <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
      <v-file-input @change="onFileChanged($event)" label="Select Event Thumbnail"></v-file-input>
      <div v-if="!isEdit">
        <SeatsIoDrawer @can-submit="handleCanSubmit" @pricing="handlePricing" @seatio-eventkey="handleEventKey" @seatio-chartkey="handleChartKey" @capacity="handleCapacity"/>
      </div>
      <div v-else>
          <SeatsIoManager :eventKey="formdata.seatsioEventsKey"/>
      </div>
      <div v-if="!isWaiting">
      <v-btn
          class="me-4"
          @click="submitEvent"
          :disabled="!canSubmit"
      >
        submit
      </v-btn>
      <v-btn >
        clear
      </v-btn>
      </div>
      <div v-else>
        <v-progress-circular
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>
    </form>


  </v-container>


</template>
<script>
import userconfig from '@/userconfig.json';
import axios from "axios";
import DatePicker from "~/components/forms/DatePicker.vue";
import Timeline from "~/components/forms/Timeline.vue";
import VenueSelector from "~/components/forms/VenueSelector.vue";
import SeatsIoDrawer from "~/components/forms/SeatsIoDrawer.vue";
import {SeatsioEventManager} from "@seatsio/seatsio-vue";
import SeatsIoManager from "~/components/forms/SeatsIoManager.vue";

export default {
  components: {SeatsioEventManager, SeatsIoDrawer, VenueSelector, Timeline, DatePicker,SeatsIoManager},
  props:{
    isEdit: Boolean,
    eventData: Object
  },
  data(){
    return{
      formdata:{
        title: null,
        contactName: null,
        description: null,
        venueId: null,
        contact: null,
        thumbnail: null,
        seatsioChartKey: null,
        seatsioEventsKey: null,
        startDate: null,
        endDate: null,
        videolink: null,
        registrationDate: null,
        price: null,
        category: null,
        capacity: 99999,
        status: 0

      },
      categoryList: [{id: 1, name: "Competition"},
        {id: 2, name: "Fair"}, {id: 3, name: "Performance"},
        {id: 4, name: "Activity"},
        {id: 5, name: "Seminar"}],
      selectedEvent: null,
      isAdmin: false,
      dialogOpen: false,
      isSeated: false,
      key: userconfig.username,
      pricing:[],
      canSubmit: true,
      isWaiting: false
    }
  },
  mounted() {
    // If in edit mode and editUser is provided, autofill the form

    if (this.isEdit) {
        this.formdata.title= this.eventData.title || ''
        this.formdata.contactName=this.eventData.contactName || ''
        this.formdata.description=this.eventData.description ||''
        this.formdata.venueId= this.eventData.venueId|| ''
        this.formdata.contact= this.eventData.contact|| ''
        this.formdata.thumbnail= this.eventData.thumbnail|| null
        this.formdata.price = this.eventData.price || null
        this.formdata.seatsioChartKey= this.eventData.seatsioChartKey|| null
        this.formdata.seatsioEventsKey= this.eventData.seatsioEventsKey|| ''
        this.formdata.registrationDate = this.eventData.registrationDate
        this.formdata.startDate= this.eventData.startDate|| null
        this.formdata.endDate= this.eventData.endDate || null
        this.formdata.category = this.eventData.category || null
        this.formdata.status =  this.eventData.status
        this.formdata.capacity = this.eventData.capacity || null
        this.selectedEvent =  this.eventData.id

    }
  },
  methods:{
    handleSelectedIndex(value){
      this.formdata.status = value
    },
    handleDate1(value){
      this.formdata.startDate = value
    },
    handleDate2(value){
      this.formdata.endDate = value
    },
    handleCanSubmit(canSubmit) {
      // console.log('Can submit:', canSubmit);
      this.canSubmit = canSubmit
    },
    handlePricing(pricing) {
      // console.log('Received pricing:', pricing);
      this.pricing = pricing
    },
    handleVenue(venueID){
      // console.log('Received venue:', venueID);
      this.formdata.venueId = venueID
    },
    handleEventKey(eventKey) {
      // console.log('Received event key:', eventKey);
      this.formdata.seatsioEventsKey = eventKey

    },
    handleChartKey(chartKey) {
      // console.log('Received chart key:', chartKey);
      this.formdata.seatsioChartKey = chartKey

    },
    handleCapacity(capacity){
      // console.log('Received capactiy:', capacity);
      this.formdata.capacity = Number(capacity);
    },
    onFileChanged(event){

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.formdata.thumbnail = reader.result
          // console.log('Uploaded image', base64String); // This is the Base64-encoded image data
        };
        reader.onerror = error => {


          console.error('Error reading file:', error);
        };
      }
    },

    submitEvent(){
      console.log(this.formdata)
      this.isWaiting = true
      if(!this.isEdit){
        // Now you can include pricingString in your formdata or wherever you need it
        console.log("Before conversion: ",this.pricing)
        if (this.pricing.length > 0) {
          const firstPrice = this.pricing[0].price;
          console.log(typeof firstPrice);
        } else {
          console.log('Pricing array is empty');
        }
        this.formdata.price = JSON.stringify(this.pricing);
        this.formdata.registrationDate = new Date().toLocaleDateString();

        axios.post(`https://secourse2024-675d60a0d98b.herokuapp.com/api/createEvent`, this.formdata,{
              withCredentials:true
            }
        )
            .then(() => {
              console.log("Event created successfully");
              this.isWaiting = false
              ElNotification.success({
                title: 'Success',
                message: "Sucessfully created event!",
                offset: 100,
              })
              return navigateTo('/events', { redirectCode: 200 })

            })
            .catch(error => {
              this.isWaiting = false
              ElNotification.error({
                title: 'Error',
                message: "Error creating event: " + error,
                offset: 100,
              })
              console.log("Error creating event:", error);
            });
      }else {
        axios.patch(`https://secourse2024-675d60a0d98b.herokuapp.com/api/updateEvent/${this.selectedEvent}`, this.formdata,{
              withCredentials:true
            }
        )
            .then(() => {
              console.log("Event updated successfully");
              this.isWaiting = false
              ElNotification.success({
                title: 'Success',
                message: "Sucessfully updated event!",
                offset: 100,
              })
              return navigateTo('/events', { redirectCode: 200 })

            })
            .catch(error => {
              this.isWaiting = false
              ElNotification.error({
                title: 'Error',
                message: "Error updating event: " + error,
                offset: 100,
              })
              console.log("Error updating event:", error);
            });
      }


    },

  }
}
</script>