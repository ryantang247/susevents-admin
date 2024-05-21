<template>
  <v-container class="my-8">
    <form>
      <v-text-field
        v-model="this.sid"
        :counter="10"
        label="Student ID"
        required

    ></v-text-field>

      <v-text-field
          v-model="this.name"
          :counter="10"
          label="Name"
          required

      ></v-text-field>

      <v-text-field
          v-model="this.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          hint="At least 8 characters"
          label="Password"
          name="input-10-1"
          counter
          @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
          v-model="this.email"
          label="Email"
          required

      ></v-text-field>
      <v-file-input @change="onFileChanged($event)" label="Select Avatar"></v-file-input>
      <v-radio-group
          v-model="this.isAdmin"
          inline
      >
        <v-radio
            label="User"
            value="0"
        ></v-radio>
        <v-radio
            label="Admin"
            value="1"
        ></v-radio>
      </v-radio-group>
      <v-btn
          class="me-4"
          @click="submitForm"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </v-container>
</template>


<script>
import { email, required } from '@vuelidate/validators'
import VenueForm from "~/components/forms/venueForm.vue";
import Header from "~/components/dashboard/Header.vue";
import MenuList from "~/components/dashboard/MenuList.vue";
import axios from "axios";


const rules = {
  name: { required },
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },

}


export default {
  components: {VenueForm, Header, MenuList},
  props:{
    isEdit: Boolean,
    editUser : Object

  },
  watch: {

    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: latest
     * usage: I've used a function to watch props
     */
    editUser: {
      handler(newVal, oldVal) {

        console.log('editUser prop changed:', newVal, oldVal);

      },
      immediate: true
    },
    isEdit: {
      handler(newVal, oldVal) {
        // This function will be called whenever editUser prop changes
        console.log('isEdit prop changed:', newVal, oldVal);

      },
      immediate: true
    }
  },
  data(){
    return{
      name: '',
      sid: '',
      avatar: null,
      select: null,
      image: null,
      password:'',
      isAdmin: null,
      email: '',
      show1: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',

      },
    }
  },
  mounted() {
    // If in edit mode and editUser is provided, autofill the form
    if (this.isEdit && this.editUser) {
      this.name = this.editUser.name || '';
      this.sid = this.editUser.sid || '';
      this.password = this.editUser.password || '';
      this.isAdmin = this.editUser.isAdmin || null;
      this.email = this.editUser.email || 'null';

    }
  },
  methods:{
    clear () {
      v$.value.$reset()
      this.name= ''
      this.sid =''
      this.email= '',
      this.select= null,
      this.checkbox = null,
      this.isAdmin= false
    },

    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: latest
     * usage: I've used a function to convert the image to base64 for the backend
     */
    onFileChanged(event){

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result;
          this.image = base64String
          console.log(base64String);
        };
        reader.onerror = error => {
          console.error('Error reading file:', error);
        };
      }
    },
    submitForm(){

      if (this.isEdit) {
        axios.patch(`http://localhost:3453/api/updateUser/${this.editUser.id}`, {
              sid: this.sid,
              name: this.name,
              password: this.password,
              status: this.isAdmin,
              email: this.email,
              avatar: this.image
            },{
              withCredentials:true
            }
        )
            .then(response => {
              console.log("User updated successfully");
            })
            .catch(error => {
              console.log("Error updating user:", error);
            });
      } else {
        console.log(
            {
              sid: this.sid,
              name: this.name,
              password: this.password,
              status: this.isAdmin,
              email: this.email,
              avatar: this.image
            }
        )
        axios.post(`http://localhost:3453/api/createUser`, {


          sid: this.sid,
          name: this.name,
          avatar: this.image.toString('base64'),
          password: this.password,
          status: this.isAdmin,
          email: this.email,

        },{
              withCredentials:true
            }
        )
            .then(response => {
              console.log("User created successfully");
            })
            .catch(error => {
              console.log("Error creating user:", error);
            });
      }
    }
  }
}
</script>

<style>
</style>