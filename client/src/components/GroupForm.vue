<template>
  <q-form
    class="flex gap-sm"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="goToGroup"
    @reset="goToSolo"
  >
    <q-input
      class="group-input"
      type="text"
      placeholder="Group ID"
      maxlength="7"
      v-model="groupInput"
      dense filled
    >
      <q-tooltip>
        Group IDs are 7 characters long with a dash in the middle, like abc-123
      </q-tooltip>
    </q-input>

    <q-btn
      type="submit"
      color="primary"
      no-caps unelevated
      :disable="!/\w\w\w\-\w\w\w/.test(groupInput) || groupInput === groupId"
      icon="fas fa-search"
    >
      <q-tooltip>
        Search
      </q-tooltip>
    </q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props { groupId: string }
const props = defineProps<Props>()

const emit = defineEmits(['goToGroup', 'goToSolo'])

const groupInput = ref(props.groupId)
watch(props, () => groupInput.value = props.groupId)

const goToGroup = (e: Event) => {
  e.preventDefault()
  emit('goToGroup', groupInput.value)
}

const goToSolo = () => {
  emit('goToSolo')
}
</script>
