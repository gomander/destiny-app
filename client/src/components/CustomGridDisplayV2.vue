<template>
  <div
    class="grid"
    ref="grid"
  >
    <div
      class="grid-label"
      ref="label"
    >
      {{ weaponType }}
    </div>

    <div
      class="column-header"
      v-for="column of frames"
      ref="columnHeaderRefs"
    >
      {{ column.displayProperties.name }}
    </div>

    <div
      class="row-header"
      v-for="row of elements"
      ref="rowHeaderRefs"
    >
      {{ row.displayProperties.name }}
    </div>

    <div
      class="grid-data"
      v-for="style of cellStyles"
      :style="style"
    ></div>

    <div
      class="grid-data"
      v-for="weapon of data"
      :style="{ gridRow: 'r' + weapon.damageTypeHash, gridColumn: 'c' + weapon.frameHash }"
    >
      <img :src="weapon.icon"><br/>
      {{ weapon.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmmoType, WeaponType } from './models'
import { useGameStore } from 'src/stores/game-store'

const gameStore = useGameStore()

interface Props {
  weaponType: WeaponType
  ammoType?: AmmoType
}
const props = defineProps<Props>()

const data = gameStore.craftableWeapons.filter(
  (weapon) => weapon.weaponType === props.weaponType &&
    (!props.ammoType || weapon.ammoType === props.ammoType)
)

const frameHashes = data.map(
  (weapon) => weapon.frameHash
).filter(
  (value, index, self) => index === self.findIndex((t) => t === value)
)

const frames = frameHashes.map(
  (column) => gameStore.weaponFrameDefinitions[column]
)

const elementHashes = data.map(
  (weapon) => weapon.damageTypeHash
).filter(
  (value, index, self) => index === self.findIndex((t) => t === value)
)

const elements = elementHashes.map(
  (row) => gameStore.damageTypeDefinitions[row]
)

const cellStyles = ref(
  elements.map(
    (element) => frames.map(
      (frame) => ({
        gridColumn: 'c' + frame.hash,
        gridRow: 'r' + element.hash
      })
    )
  ).flat()
)

const grid = ref<HTMLDivElement | null>(null)
const rowHeaderRefs = ref<HTMLDivElement[]>([])
const columnHeaderRefs = ref<HTMLDivElement[]>([])

onMounted(() => {
  const cssColumns = '[rows] 1fr ' + frames.map((frame) => `[c${frame.hash}] 1fr`).join(' ')
  const cssRows = '[columns] 1fr ' + elements.map((element) => `[r${element.hash}] 1fr`).join(' ')
  grid.value!.style.gridTemplateColumns = cssColumns
  grid.value!.style.gridTemplateRows = cssRows
  rowHeaderRefs.value.forEach((div) => {
    div.style.gridColumn = 'rows'
  })
})
</script>

<style scoped lang="sass">
.grid
  display: grid
  background-color: #222
  border: 0.1rem solid white
  border-radius: 0.25rem

  & > div
    border: 0.1rem solid white
    padding: 0.25rem
    text-align: center
</style>