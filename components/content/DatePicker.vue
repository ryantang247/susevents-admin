<template>
  <div>
  <v-text-field
      v-model="dateValue"
      @click="dateMenuStart=true"
      readonly

  ></v-text-field>
  <v-dialog v-model="dateMenuStart" width="auto " content-class="my-custom-dialog">
    <v-card>
      <v-date-picker

          v-model="dateValue"
          @update:modelValue="$emit('value-emit', dateValue)"
          range
      ></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text="Close"
            variant="plain"
            @click="dateMenuStart = false"
        ></v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
  </div>
</template>

<script>
export default  {
  name:'DatePicker',
  emits:['value-emit'],
  props:{
    receivedDate: Date
  },
  data() {
    return {
      dateMenuStart: false,
      dateValue: null

    }
  },
  watch: {
    receivedDate: function(newVal, oldVal) {
      if (newVal !== oldVal ) {
        // Check if newVal is not empty or null
          this.dateValue = newVal
      }
    }
  },
};
</script>

<style>
.my-custom-dialog {
  align-self: flex-end;
}
</style>