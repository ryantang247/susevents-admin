<template>
  <Header/>
  <v-row>
    <v-col cols="auto">
      <MenuList/>
    </v-col>
    <v-col >
      <form style="margin-top: 20px">
        <h2 style="margin-bottom:20px">Publish notification</h2>
        <v-text-field
            v-model="this.formdata.title"
            label="Notification title"
            required

        ></v-text-field>

        <v-text-field
            v-model="this.formdata.description"
            label="Description"
            required

        ></v-text-field>
        <el-select
            v-model="formdata.category"
            placeholder="Select category"
            size="large"
            style="width: 100%; color: grey; margin-bottom: 20px; height: 40px; color: grey"
        >
          <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
        <div v-if="formdata.category === 1">
          <EventSelector :received-venue-id="formdata.venueId" @event-emit="handleEvent"/>
        </div>

        <div v-if="!isWaiting">
          <v-btn
              class="me-4"
              @click="submitNotification"
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
    </v-col>
  </v-row>
</template>


<script>
import MenuList from "~/components/dashboard/MenuList.vue";
import Header from "~/components/dashboard/Header.vue";
import EventCards from "~/components/dashboard/eventCards.vue";
import OrderTable from "~/components/dashboard/orderTable.vue";
import Timeline from "~/components/forms/Timeline.vue";
import axios from "axios";
import EventSelector from "~/components/forms/EventSelector.vue";

export default {
  components: {
    EventSelector,
    Timeline,
    ElNotification,
    OrderTable, EventCards, Header, MenuList},

  data: () => ({

    formdata:{
      title: '',
      description: '',
      eventID:'',
      category: '',

    },
    categoryList: [{id: 0, name: "All users"},
      {id: 1, name: "One event"},],
    canSubmit: true,
    isWaiting: false
  }),
  methods:{
    handleEvent(eventID){
      console.log('Received event:', eventID);
      this.formdata.eventId = eventID
    },
    submitNotification(){
      this.isWaiting = true
      this.canSubmit = false
      axios.post(`https://secourse2024-675d60a0d98b.herokuapp.com/api/postNotification`, this.formdata,{
            withCredentials:true
          }
      )
          .then(response => {
            console.log("Notifcation created successfully");
            this.isWaiting = false
            ElNotification.success({
              title: 'Success',
              message: "Sucessfully notified!",
              offset: 100,
            }
            );
            this.canSubmit = true

            return navigateTo('/events', { redirectCode: 200 })

          })
          .catch(error => {
            this.isWaiting = false
            this.canSubmit = true
            console.log("Error creating notification:", error);
            ElNotification.error({
              title: 'Error',
              message: "Error sending notification" + error,
              offset: 100,
            });
          });
    }
  }

}
</script>