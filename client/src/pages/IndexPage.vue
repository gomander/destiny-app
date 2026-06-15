<template>
  <q-page class="q-pa-md">
    <h1>Welcome to DARCI.gg</h1>

    <p
      class="text-caption"
      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
      style="font-size: 100%"
    >
      Thank you for using the Data Analysis, Reconnaissance, and Cooperative Intelligence device.
      You may call me Darci.
    </p>

    <p class="intro-text">
      Hi! I'm Gunnar, a full-stack web developer working on
      <a href="https://wheelofnames.com" target="_blank">Wheel of Names</a>. I don't play Destiny 2
      anymore, but when I did, I made this tiny app in order to visualize the elemental and frame
      coverage of craftable weapons. I later expanded it to show all legendary weapons, and then
      finally added the raid checklists page for easy at-a-glance comparing what raid triumphs you
      and your friends need to get each raid title.
    </p>

    <p class="intro-text">
      Check out the available tools from the left-hand menu!
    </p>

    <p>
      If something isn't working properly, try this button:
    </p>

    <q-btn
      color="primary"
      no-caps
      label="Reset page"
      @click="reset"
    />
  </q-page>
</template>

<script setup lang="ts">
  function reset() {
    localStorage.clear()
    location.reload()
  }
</script>

<style scoped>
  p {
    font-size: 125%;
    max-width: 60em;
  }
</style>
