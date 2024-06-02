<template>
  <div v-if="eventKey" style="height: auto">
    <SeatsioEventManager
        :secretKey="key"
        :event="eventKey"
        region="oc"
        mode="manageObjectStatuses"

    />
  </div>
</template>
<script>
import { SeatsioEventManager } from '@seatsio/seatsio-vue';
import userconfig from "~/userconfig.json";
import axios from "axios";
export default {
  name: "SeatsIoManager",
  components: {SeatsioEventManager},
  props:{
    eventKey : String
  },
  data(){
    return {
      key: userconfig.username,
      region: userconfig.region,
    }
  },
  methods:{
    bookEvent: function (e) {
      console.log(this.objects);

      axios.post(`https://api-oc.seatsio.net/events/${sampleEvent}/actions/book`, {
        objects: this.objects

      },{
        auth: {
          username: userconfig.username,
          password: userconfig.password
        }
      })

    },
  }
}
</script>

<style scoped>

</style>