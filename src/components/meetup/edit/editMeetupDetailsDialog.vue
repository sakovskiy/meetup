<template>
    <v-dialog max-width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    label="Title"
                                    v-model="editTitle"
                                    :rules="editTitleRules"
                                    :counter="120"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    label="Description"
                                    v-model="editDescription"
                                    :rules="editDescriptionRules"
                                    textarea
                                    required
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        valid: false,
        editTitle: this.meetup.title,
        editTitleRules: [
          v => !!v || 'Title is required',
          v => v.length <= 120 || 'Title must be less than 120 characters'
        ],
        editDescription: this.meetup.description,
        editDescriptionRules: [v => !!v || 'Description is required'],
        editDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editTitle,
          description: this.editDescription
        })
      }
    },
    name: 'edit-meetup-details-dialog'
  }
</script>

<style scoped>

</style>