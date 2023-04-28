<template>
  <div
    class="grid"
    ref="grid"
  >
    <div
      class="grid-label"
      ref="label"
    >
      <div>
        <h3>{{ weaponName }}</h3>
        <i>{{ weaponIcon }}</i>
      </div>
    </div>

    <div
      class="column-header"
      v-for="column of frames"
      ref="columnHeaderRefs"
    >
      <div>
        <img :src="'https://www.bungie.net' + column.displayProperties.icon" alt=""><br/>
        {{ column.displayProperties.name }}
      </div>
    </div>

    <div
      class="row-header"
      v-for="row of elements"
      ref="rowHeaderRefs"
    >
      <div>
        <img :src="'https://www.bungie.net' + row.displayProperties.icon" alt=""><br/>
        {{ row.displayProperties.name }}
      </div>
    </div>

    <div
      class="grid-data"
      v-for="(style, i) of cellStyles"
      :style="style"
    >
      <div
        v-for="weapon of cellWeapons[i]"
      >
        <img :src="weapon.icon" alt=""><br/>
        {{ weapon.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmmoType, WeaponType } from './models'
import { getWeaponIconAndName } from '../utils/weapon-util'
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

const cellWeapons = ref(
  elements.map(
    (element) => frames.map(
      (frame) => data.filter(
        (weapon) => weapon.frameHash === frame.hash &&
          weapon.damageTypeHash === element.hash
      )
    )
  ).flat()
)

const [weaponIcon, weaponName] = getWeaponIconAndName(props.weaponType, props.ammoType)

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
  border: 0.1em solid white
  border-radius: 0.25em

  & > div
    border: 0.1em solid white
    padding: 0.5em
    text-align: center
    display: flex
    gap: 1em
    justify-content: center

img
  width: 96px
  height: 96px

i
  font-size: 250%
  font-style: normal
</style>