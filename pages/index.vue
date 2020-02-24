<template>                                              <!-- TEMPLATE -->
  <no-ssr>
  <div>
    <v-app-bar fixed style="background-color:DarkOrange">
    <v-toolbar-title>XKCD 2.0</v-toolbar-title>
    </v-app-bar>

    <div v-if="menu == false">
      <div id="start"></div>
      <div class="page-handler">
        <v-btn @click="prevComic()" style="margin-left: 10px">Prev Page</v-btn>
        <v-card class="d-inline-flex pa-2 mx-auto">{{comic + 1}}</v-card>
        <v-btn @click="nextComic()" style="margin-right: 10px">Next Page</v-btn>
      </div>
      <div v-if="apiTab[0] != null">
        <div v-for="index in 3" :key="index" class="container">
          <div v-if="comic + index <= max_comic">
            <v-card width="350px">
              <v-img :src="apiTab[index - 1].data.img"></v-img>
              <v-card-title>{{apiTab[index - 1].data.title}}</v-card-title>
              <v-card-text>{{apiTab[index - 1].data.alt}}</v-card-text>
              <v-card-actions>
                <v-spacer>
                  <v-card-text>Comic n°{{apiTab[index - 1].data.num}}</v-card-text>
                </v-spacer>
              </v-card-actions>
            </v-card>
          </div>
        </div>
        <div class="page-handler">
          <v-btn @click="prevComic()" style="margin-left: 10px">Prev Page</v-btn>
          <v-card class="d-inline-flex pa-2 mx-auto">{{comic + 1}}</v-card>
          <v-btn @click="nextComic()" style="margin-right: 10px">Next Page</v-btn>
        </div>
        <v-btn href="#start">
          Top of the page
        </v-btn>
      </div>
      <div v-else>
      <v-card>
        <v-card-title>XKCD's API is not responding</v-card-title>
        <v-card-text>F12 for precise error.</v-card-text>
      </v-card>
      </div>
    </div>



    <div v-else>
      <div style="margin-top: 100px">
        <v-card width="500px">
          <v-card-title class="justify-center">Renewed XKCD</v-card-title>
          <v-card-subtitle>Made by Alec Ferrari aka Primarter</v-card-subtitle>
          <v-card-text>If you aren't familiar with xkcd yet, feel free to check it out <a href="https://xkcd.com/">here!</a></v-card-text>
          <v-img :src="require('../assets/XKCD.png')">XKCD</v-img>
          <v-card-text class="justify-center">This Website was made as a tribute to the great comics made by the floks at XKCD.
            As such, its goal is to show how talented they are and by no means to take advantage of their work.
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn primary @click="init()">START BROWSING</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
  </no-ssr>
</template>



<script>                                              /* SCRIPT */
  import axios from 'axios';
  export default {
    data() {
      return {
        menu: true,
        errored: false,
        max_comic: 900,
        info: null,
        stInfo: this.$store.state.info,
        apiTab: this.$store.state.apiTab,
        comic: 0,
      }
    },

    mounted () {
      for (let idx = 0; idx < this.apiTab.length; idx++) {
        this.getApi(idx)
        console.log("Mounting...")
      }
      this.getCurrentComic()
    },
    methods: {
      async init () {
        console.log("Initiating...")
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx)
        }
        this.getCurrentComic()
        this.menu = false;
        if (this.info != null)
          this.max_comic = this.info.data.num / 3;
      },
      async getCurrentComic() {
        await axios
        .get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
        .then(response => (this.info = response, this.$store.commit('setInfo', response)))
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      },
      async getApi(idx) {
        await axios
        .get('https://cors-anywhere.herokuapp.com/http://xkcd.com/' + (this.comic * 3 + idx + 1) + '/info.0.json')
        .then(response => (this.$store.commit('setTab', {"info":response, "index": idx}), this.$set(this.$store.state.apiTab, idx, this.$store.state.apiTab[idx])))
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      },
      prevComic() {
        if (this.comic - 1 >= 0)
          this.comic -= 1;
        console.log(this.comic)
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx);
          console.log(this.comic * 3 + idx + 1);
        }
      },
      nextComic() {
        if (this.comic + 1 <= this.max_comic)
          this.comic += 1;
        console.log(this.comic)
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx);
          console.log(this.comic * 3 + 1);
        }
      },
      printItem(item) {
        console.log(item);
      }
    }
  }
</script>



<style>                                                      /* STYLE */
  .container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .page-handler {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    margin-bottom: 10px;
  }
</style>