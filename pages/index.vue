<template>
  <div>
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
        <v-img :src="require('../assets/' + pics[index - 1])"></v-img>
        <v-card-title>{{table[index - 1]}}</v-card-title >
        <v-card-text>{{desc[index - 1]}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="nextComic()">Next ({{comic}})</v-btn>
          <v-btn @click="likeItem(index)" icon>
            <v-icon v-if="liked[index - 1]==true" color="red darken-1">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        max_comic: 10,
        comic: 0,
        liked: [false, false, false],
        table: ["SITH EMPIRE", "REBEL ALLIANCE", "GALACTIC EMPIRE"],
        pics: ["Sith.png", "Rebel_alliance.png", "The_empire.png"],
        desc: ["ex: Darth Revan", "ex: Luke Skywalker", "ex: Palpatine"],
      }
    },
    methods: {
      nextComic() {
        if (comic + 1 <= max_comic)
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
</style>