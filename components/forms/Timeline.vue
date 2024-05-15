<template>
  <v-timeline direction="horizontal" line-inset="12" dense>
    <v-timeline-item
        :key="i"
        :dot-color="item.color"
        :icon="item.icon"
        v-for="(item, i) in items"
        @click="setDotColor(i)"
        style=" cursor: pointer">
      <p>{{ item.name }}</p>
    </v-timeline-item>
  </v-timeline>
</template>


<script >
export default {
  props:{
    status:Number
  },
  watch: {
    status: function(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        // Find the venue with the received ID in the venueList and set the venueName
        console.log("New status number",newVal)
        this.selectedIndex = newVal
        this.setDotColor(this.selectedIndex)
      }
    }
  },
  data: () => ({
    selectedIndex: 0,
    items: [
      {
        name: 'On Sale',
        color: 'grey',
        icon: 'mdi-star',
      },
      {
        name: 'On going',
        color: 'grey',
        icon: 'mdi-book-variant',
      },
      {
        name: 'Ended',
        color: 'grey',
        icon: 'mdi-airballoon',
      },
    ],
  }),
  methods: {
    setDotColor(index) {
      // If the index matches the selectedIndices prop, return a different color

        for ( let i =0;i< this.items.length; i++){
            this.items[i].color = 'grey'

        }
        this.items[index].color = 'blue'
        this.$emit('selected-index', index);
    },
  },
}
</script>
<style scoped>

</style>