<template>
  <div>
  {{info}}
    <v-app-bar fixed style="background-color:DarkOrange">
    <v-toolbar-title>XKCD 2.0</v-toolbar-title>
    <v-menu offset-y >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on=" on ">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>
    </v-menu>
    </v-app-bar>
    <div v-for="index in 3" :key="index" class="container">
      <v-card width="350px">
        <v-img :src="require('../assets/' + pics[index - 1 + (3 * comic)])"></v-img>
        <v-card-title>{{table[index - 1 + (3 * comic)]}}</v-card-title>
        <v-card-text>{{desc[index - 1 + (3 * comic)]}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="likeItem(index)" icon>
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
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => {
      return {
        info: null,
        errored: false,
        max_comic: 1,
        comic: 0,
        liked: [false, false, false, false, false, false],
        table: ["SITH EMPIRE", "REBEL ALLIANCE", "GALACTIC EMPIRE", "Such incident", "Such irony", "Such style"],
        pics: ["Sith.png", "Rebel_alliance.png", "The_empire.png", "Incident-Reddit.png", "ironic-KonwYourMeme.jpg", "QuigonBeach-YT.jpg"],
        desc: ["ex: Darth Revan", "ex: Luke Skywalker", "ex: Palpatine", "reddit.com", "know your meme", "youtube"],
      }
    },
    mounted () {
      axios({ method: "GET", "url": ('http://xkcd.com/' + this.comic + 'info.0.json')}).then(result => {
        this.info = result.data.origin;
      }, error => {
        console.error(error);
      });
      //axios
      //  .get('http://xkcd.com/' + this.comic + 'info.0.json')
      //  .then(response => (this.info = response))
      //  .catch(error => {
      //    console.log(error)
      //    this.errored = true
      //  })
    },
    methods: {
      prevComic() {
        if (this.comic -1 >= 0)
          this.comic -= 1;
      },
      nextComic() {
        if (this.comic + 1 <= this.max_comic)
          this.comic += 1;
      },
      likeItem(index) {
        this.liked[index - 1] = !this.liked[index - 1];
        this.$set(this.liked, index, this.liked[index])
      }
    }
  }
</script>

<style>
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