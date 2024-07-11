<template>
  <q-page class="q-pa-md">
    <h1>Welcome to DARCI.gg</h1>

    <p
      class="flavor-text text-caption"
      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
    >
      Thank you for using the Data Analysis, Reconnaissance, and Cooperative Intelligence device.
      You may call me Darci.
    </p>

    <p class="intro-text">
      Hi! I'm Gunnar, a full-stack web developer. My free time is split between working on
      <a href="https://wheelofnames.com" target="_blank">Wheel of Names</a>, playing games (mostly
      Destiny 2), and some fun little side projects like this one.
    </p>

    <p class="intro-text">
      This app is a playground for me to explore the Bungie API. It's not meant for anyone else, but
      if you find something here interesting, great! It is still in early development and most
      things are still only semi-functional.
    </p>

    <p class="intro-text">
      Check out the available tools from the left-hand menu!
    </p>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
p
  font-size: 125%
  max-width: 60em
.flavor-text
  font-size: 100%
</style>
