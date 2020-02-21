<template>                                              <!-- TEMPLATE -->
  <no-ssr>
  <div>
    <v-app-bar fixed style="background-color:DarkOrange">
    <v-toolbar-title>XKCD 2.0</v-toolbar-title>
    </v-app-bar>


    <div v-if="menu == false">
      <div v-for="index in 3" :key="index" class="container">
        <v-card width="350px">
          <v-img :src="apiTab[comic + index - 1].data.img"></v-img>
          <v-card-title>{{apiTab[comic + index - 1].data.title}}</v-card-title>            <!-- {{table[index - 1 + (3 * comic)]}} -->
          <v-card-text>{{apiTab[comic + index - 1].data.alt}}</v-card-text>                   <!-- {{desc[index - 1 + (3 * comic)]}} -->
          <v-card-actions>
            <v-spacer>
              <v-card-text>Comic n°{{apiTab[comic + index - 1].data.num}}</v-card-text>
            </v-spacer>
            <v-btn @click="likeItem(index)" icon>
              {{index}}
              <v-icon v-if="liked[index - 1 + (3 * comic)]==true" color="red darken-1">mdi-heart</v-icon>
              <v-icon v-else>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="page-handler">
        <v-btn @click="prevComic()" style="margin-left: 10px">Prev Page</v-btn>
        <v-card class="d-inline-flex pa-2 mx-auto">{{comic + 1}}</v-card>
        <v-btn @click="nextComic()" style="margin-right: 10px">Next Page</v-btn>
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
        apiTab: this.$store.state.apiTab,
        errored: false,
        max_comic: 1,
        comic: 0,
        liked: this.$store.state.liked,
        table: ["SITH EMPIRE", "REBEL ALLIANCE", "GALACTIC EMPIRE", "Such incident", "Such irony", "Such style"],
        pics: ["Sith.png", "Rebel_alliance.png", "The_empire.png", "Incident-Reddit.png", "ironic-KonwYourMeme.jpg", "QuigonBeach-YT.jpg"],
        desc: ["ex: Darth Revan", "ex: Luke Skywalker", "ex: Palpatine", "reddit.com", "know your meme", "youtube"],
      }
    },


    mounted () {
      for (let idx = 0; idx < this.apiTab.length; idx++) {
        this.getApi(idx)
        console.log("Mounting...")
      }
    },


    methods: {
      async init () {
        console.log("Initiating...")
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx)
        }
        this.menu = false;
      },
      async getApi(idx) {
        axios
        .get('https://cors-anywhere.herokuapp.com/http://xkcd.com/' + (this.comic + 1 + idx) + '/info.0.json')
        .then(response => (this.$store.commit('setTab', {"info":response, "index": idx})))
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      },
      prevComic() {
        if (this.comic - 1 >= 0)
          this.comic -= 1;
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx)
        }
      },
      nextComic() {
        if (this.comic + 1 <= this.max_comic)
          this.comic += 1;
        for (let idx = 0; idx < this.apiTab.length; idx++) {
          this.getApi(idx)
        }
      },
      likeItem(index) {
        this.liked[index - 1] = !this.liked[index - 1];
        this.$set(this.liked, index, this.liked[index])
        this.$store.commit('inverseLike', index);
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