<template>
  <v-app-bar-nav-icon v-if="$vuetify.display.mdAndDown" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  <v-container v-if="!$vuetify.display.mdAndDown" v-model="drawer" style="margin: 0" >
    <v-row>
      <v-col cols="auto">
        <v-card
            class="mx-auto"
            width="256"
        >
          <v-layout>
            <v-navigation-drawer
                :temporary="$vuetify.display.smAndDown"
                class="nav-drawer"
                location="left"
                :left="0"
            >
              <v-list class="list-style">
                <v-list-item
                    :prepend-avatar="avatar"
                    :title="username"
                    :subtitle="sid"
                    class="custom-background-color"
                >

                  <template v-slot:append>
                    <v-btn
                        size="small"
                        variant="text"
                        icon="mdi-menu-down"
                        class="button-style"


                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list
                  :lines="false"
                  density="compact"
                  nav
              >
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    color="primary"
                    :to="item.link"

                >
<!--                  <NuxtLink :to="item.link" tag="li">-->

                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
<!--                  </NuxtLink>-->

                </v-list-item>
              </v-list>
            </v-navigation-drawer>

            <v-main style="height: calc(100vh - 64px);" class="main-content"></v-main>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-navigation-drawer v-if="$vuetify.display.mdAndDown"
      v-model="drawer"
      location="bottom"
      temporary
  >
    <v-list
        :items="items"
    >
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          :to="item.link"
          color="primary"
      >

        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>

      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.nav-drawer {
  height: 100vh;
  overflow-y: auto; /* Enable scrolling if content exceeds viewport height */
}

.main-content {
  height: calc(100vh - 64px); /* Subtracting the height of any app bars or headers */
  overflow-y: auto; /* Enable scrolling if content exceeds viewport height */
}
.custom-background-color {
  background-color: cornflowerblue; /* Change to the desired color */
  padding: 10px;
}

.list-style{
  padding: 0;
}
</style>


<script>

export default {
  name: 'MenuList',
  mounted () {
    console.log(process.client)
    if (process.client) {
      this.username = localStorage.getItem("Username")
      this.sid = localStorage.getItem("SID")
      this.avatar = localStorage.getItem("Avatar")

    }
  },
  data: () => ({
    drawer: false,
    username: null,
    sid: null,
    avatar: null,
    items: [
      { text: 'Users', icon: 'mdi-account' ,link: '/user'},
      { text: 'Venues', icon: 'mdi-home',link: '/venue' },
      { text: 'Events', icon: 'mdi-ticket',link: '/events' },
      { text: 'Notification', icon: 'mdi-speaker' ,link: '/notification'},
      { text: 'Customer Services', icon: 'mdi-phone-classic' ,link: '/customers'},
      { text: 'Transaction History', icon: 'mdi-cash-multiple',link: '/transaction' },
    ]

  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>