<template>
  <q-page class="q-pa-md">
    <h1>Welcome to DARCI.gg</h1>

    <p class="flavor-text">
      Thank you for using the Data Analysis, Reconnaissance, and Cooperative
      Intelligence device. You may call me Darci.
    </p>

    <p class="intro-text">
      Hi, my name is Gunnar, and I'm a full-time web dev student. My free time
      is split between working on
      <a href="https://wheelofnames.com" target="_blank">Wheel of Names</a>,
      playing games (mostly Destiny 2), and some fun little side projects like
      this one.
    </p>

    <p class="intro-text">
      DARCI.gg is currently just a playground for me to explore the Bungie API
      and visualize data in ways that I want to see, such as the weapon tables
      and weapon rankings. For now it's all made purely out of my own interest.
      It is not meant to be a product for anyone else, but if you find something
      here interesting, great! This app is still in very early development and
      most things are still only semi-functional.
    </p>

    <div class="row q-gutter-sm q-pb-md">
      <authenticate-button/>

      <q-btn
        label="Get profile data"
        @click="getAuthenticatedProfileData()"
        no-caps
        color="primary"
      />

      <q-btn
        label="Get profile records"
        @click="getProfileRecords()"
        no-caps
        color="primary"
      />
    </div>

    <p class="flavor-text">
      It's necessary to authenticate with Bungie to create groups and use the
      solo view on the raid and dungeon checklists page. To see your own
      completion status, you must also get your profile records.
    </p>
  </q-page>
</template>

<script setup lang="ts">
import {
  getAuthenticatedProfileData,
  getProfileRecords
} from 'src/services/profile-service'
import AuthenticateButton from 'src/components/AuthenticateButton.vue'
</script>

<style scoped lang="sass">
p
  font-size: 125%
  max-width: 60em
.flavor-text
  font-size: 100%
  color: darken(white, 20%)
</style>