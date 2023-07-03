<template>
  <q-form
    class="row q-gutter-sm"
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
      label="Group"
      maxlength="7"
      v-model="groupInput"
      dense filled
    />

    <q-btn
      type="submit"
      color="primary"
      no-caps unelevated
      :disable="!/\w\w\w\-\w\w\w/.test(groupInput) || groupInput === groupId"
    >
      Go
    </q-btn>

    <q-btn
      type="reset"
      color="primary"
      no-caps unelevated
      :disable="!groupId"
    >
      Solo
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