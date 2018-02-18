<template>
    <v-container fluid class="pa-0">
        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-btn small color="info" dark large to="/meetups">Explore Meetups</v-btn>
                    <v-btn small color="info" dark large to="/meetup/new">Organize Meetup</v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                        indeterminate
                        color="primary"
                        :width="7"
                        :size="70"
                        v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2" v-if="!loading">
            <v-flex sx12>
                <v-carousel style="cursor:pointer">
                    <v-carousel-item v-for="(meetup,i) in meetups"
                                     :src="meetup.imageUrl"
                                     :key="meetup.id"
                                     @click="onLoadMeetup(meetup.id)">
                        <div class="title">
                            {{meetup.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12>
                <div class="text-xs-center">
                    <h3>Join our awesome meetups!</h3>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<style scoped>
    .title{
        position: absolute;
        bottom:50px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        padding: 15px;
    }
</style>