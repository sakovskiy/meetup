<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-2>
                <h1 class="primary--text">Create a new Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
           <v-flex xs12>
               <v-form v-model="valid" @submit.prevent="onCreateMeetup">
                   <v-flex xs12 sm6 offset-sm3>
                       <v-text-field
                               label="Title"
                               v-model="title"
                               :rules="titleRules"
                               :counter="120"
                               required
                       ></v-text-field>
                   </v-flex>
                   <v-flex xs12 sm6 offset-sm3>
                       <v-text-field
                               label="Location"
                               v-model="location"
                               :rules="locationRules"
                               required
                       ></v-text-field>
                   </v-flex>
                   <v-flex xs12 sm6 offset-sm3>
                       <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                       <input
                           type="file"
                           style="display:none"
                           ref="fileInput"
                           accept="image/*"
                           @change="onFilePicked">
                   </v-flex>
                   <v-flex xs12 sm6 offset-sm3>
                       <img :src="imageUrl" height="150px">
                   </v-flex>
                   <v-flex xs12 sm6 offset-sm3>
                       <v-text-field
                               label="Description"
                               v-model="description"
                               :rules="DescriptionRules"
                               textarea
                               required
                       ></v-text-field>
                   </v-flex>
                   <v-flex xs12 sm-6 offset-sm3>
                       <h4>Chose a Data and Time</h4>
                   </v-flex>
                   <v-flex xs12 sm-6 offset-sm3 class="mb-2">
                       <v-date-picker v-model="date"></v-date-picker>
                   </v-flex>
                   <v-flex xs12 sm-6 offset-sm3>
                       <v-time-picker v-model="time" format="24hr"></v-time-picker>
                   </v-flex>
                   <v-flex xs12 sm-6 offset-sm3>
                       <v-btn class="primary" :disabled="!valid" type="submit">Create Meetup</v-btn>
                   </v-flex>
               </v-form>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length <= 120 || 'Title must be less than 120 characters'
      ],
      location: '',
      locationRules: [
        v => !!v || 'Location is required'
      ],
      imageUrl: '',
      description: '',
      DescriptionRules: [
        v => !!v || 'Description is required'
      ],
      date: new Date().toISOString(),
      time: new Date(),
      image: null
    }),
    computed: {
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.valid) return
        if (!this.image) return
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style scoped>

</style>