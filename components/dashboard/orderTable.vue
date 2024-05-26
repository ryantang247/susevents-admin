<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I ask it to give me a template for the table
    Heavily modified to use transaction data
-->

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Transaction History
            <v-spacer></v-spacer>
            <v-text-field v-model="search" label="Search" outlined dense></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
                :headers="headers"
                :items="filteredTransactions"
                :search="search"
                :items-per-page="10"
                :footer-props="{itemsPerPageOptions: [5, 10, 25]}"
            >
              <template v-slot:item.exclusive="{ item }">
                <v-checkbox
                    v-model="item.refund"
                    readonly
                ></v-checkbox>
              </template>
              <template v-slot:item.refund="{ item }">
                <v-btn @click="refundItem(item)" v-if="item.refund" color="primary">Refund</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name:'orderTable',
  data() {
    return {
      search: '',
      transactions: [
      ],
      headers: [
        { title: 'Name', value: 'name' },
        { title: 'Date', value: 'date' },
        { title: 'Description', value: 'description' },
        { title: 'Amount', value: 'amount' },
        { title: 'Refund', value: 'refund' }
      ]
    };
  },
  methods:{
    changeDateFormat(isoDateString){

      const date = new Date(isoDateString);

  // Extract the date components
        const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getUTCFullYear()).slice(-2); // Get last 2 digits of the year

  // Format the date as dd/mm/yy
      return `${day}/${month}/${year}`
    },

    refundItem(item){
      axios.post('https://secourse2024-675d60a0d98b.herokuapp.com/api/refundTransaction', {
        orderId: item.id,
        price: Number(item.amount)
      },{
        withCredentials:true
      })
          .then((response) => {
            ElNotification.success({
              title: 'Success',
              message: `Item refunded successfully`,
              offset: 100,
            });
            console.log(response);
          })
          .catch((error) => {
            console.log(error)
            ElNotification.error({
              title: 'Error',
              message: `Cannot do transaction. ${error.message}`,
              offset: 100,
            });
          });

      console.log("Refunding items: ", item)
    }
  },
  mounted(){
    axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllTransaction',{
      withCredentials:true
    })
        .then(response => {
          console.log("Transaction fetch successfully")
          console.log(response.data)
          response.data.forEach(item => {

            if(item.order){
              var transactionType = "unknown";
              if(item.status ===1){
                transactionType = "Purchase"
              }else if(item.status ===2){
                transactionType = "Refunded"

              }else {
                transactionType = "unknown"
              }
              const eventDate = this.changeDateFormat(item.createdAt)

              item.order.forEach((item)=>{
                var name = "Deleted"

                if (item && item.user && item.user.sid) {
                  name = item.user.sid;
                }

                const newData = {
                  name: name,
                  date: eventDate,
                  id: item.id,
                  description: transactionType,
                  amount: item.price,
                  refund: transactionType === 'Purchase'
                }
                console.log(newData)

                this.transactions.push(newData)
              })


            }
            }
        )})
        .catch(error => {
          console.log("Error fetching Events",error)

        });
  },
  computed: {
    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: latest
     * usage: Directly ask it to generate a filter based on the data in table
     */
    filteredTransactions() {
      if (!this.search) {
        return this.transactions;
      }
      const searchTerm = this.search.toLowerCase();
      return this.transactions.filter(transaction => {
        return (
            transaction.name.toLowerCase().includes(searchTerm) ||
            transaction.date.toLowerCase().includes(searchTerm) ||
            transaction.description.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
};
</script>

<style>
/* Add custom styles here */
</style>
