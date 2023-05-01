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
        <img
          :src="'https://www.bungie.net' + column.displayProperties.icon"
          :alt="cleanUpFrameName(column.displayProperties.name)"
          :title="cleanUpFrameName(column.displayProperties.name) + '\n\n' + column.displayProperties.description"
        />
      </div>
    </div>

    <div
      class="row-header"
      v-for="row of elements"
      ref="rowHeaderRefs"
    >
      <div>
        <img
          :src="'https://www.bungie.net' + row.displayProperties.icon"
          :alt="row.displayProperties.name"
          :title="row.displayProperties.name"
        />
      </div>
    </div>

    <div
      class="grid-data"
      v-for="(style, i) of cellStyles"
      :style="style"
    >
      <div v-for="weapon of cellWeapons[i]">
        <img
          :src="weapon.icon"
          :alt="weapon.name"
          :title="weapon.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { AmmoType, Weapon, WeaponType } from './models'
import { getWeaponIconAndName, cleanUpFrameName } from '../utils/weapon-util'
import { useGameStore } from 'src/stores/game-store'

const gameStore = useGameStore()

interface Props {
  weaponType: WeaponType
  ammoType?: AmmoType
  weapons: Weapon[]
}
const props = defineProps<Props>()

const data = computed(
  () => props.weapons.filter(
    (weapon) => weapon.weaponType === props.weaponType &&
      (!props.ammoType || weapon.ammoType === props.ammoType)
  )
)

const frameHashes = computed(
  () => data.value.map(
    (weapon) => weapon.frameHash
  ).filter(
    (value, index, self) => index === self.findIndex((t) => t === value)
  )
)

const frames = computed(
  () => frameHashes.value.map(
    (column) => gameStore.weaponFrameDefinitions[column]
  ).sort(
    (a, b) => a.displayProperties.name < b.displayProperties.name ? -1 : 1
  )
)

const damageTypeOrder = props.ammoType === AmmoType.Heavy
  ? ['Kinetic', 'Void', 'Solar', 'Arc', 'Stasis', 'Strand']
  : ['Kinetic', 'Stasis', 'Strand', 'Void', 'Solar', 'Arc']

const elementHashes = computed(
  () => data.value.map(
    (weapon) => weapon.damageTypeHash
  ).filter(
    (value, index, self) => index === self.findIndex((t) => t === value)
  )
)

const elements = computed(
  () => elementHashes.value.map(
    (row) => gameStore.damageTypeDefinitions[row]
  ).sort((a, b) => {
    const indexA = damageTypeOrder.findIndex((e) => e === a.displayProperties.name)
    const indexB = damageTypeOrder.findIndex((e) => e === b.displayProperties.name)
    return indexA < indexB ? -1 : 1
  })
)

const cellStyles = computed(
  () => elements.value.map(
    (element) => frames.value.map(
      (frame) => ({
        gridColumn: 'c' + frame.hash,
        gridRow: 'r' + element.hash
      })
    )
  ).flat()
)

const cellWeapons = computed(
  () => elements.value.map(
    (element) => frames.value.map(
      (frame) => data.value.filter(
        (weapon) => weapon.frameHash === frame.hash &&
          weapon.damageTypeHash === element.hash
      ).sort((a, b) => a.name < b.name ? -1 : 1)
    )
  ).flat()
)

const resetGrid = () => {
  const cssColumns = '[rows] 80px' + frames.value.map((frame) => `[c${frame.hash}] 1fr`).join(' ')
  const cssRows = '[columns] 1fr' + elements.value.map((element) => `[r${element.hash}] 1fr`).join(' ')
  grid.value!.style.gridTemplateColumns = cssColumns
  grid.value!.style.gridTemplateRows = cssRows
  rowHeaderRefs.value.forEach((div) => {
    div.style.gridColumn = 'rows'
  })
}

watch(gameStore.craftableWeapons, () => {
  resetGrid()
})

onMounted(() => {
  resetGrid()
})

const [weaponIcon, weaponName] = getWeaponIconAndName(props.weaponType, props.ammoType)

const grid = ref<HTMLDivElement | null>(null)
const rowHeaderRefs = ref<HTMLDivElement[]>([])
const columnHeaderRefs = ref<HTMLDivElement[]>([])
</script>

<style scoped lang="sass">
.grid
  display: grid
  background-color: #222
  border: 0.1em solid white
  border-radius: 0.25em
  width: fit-content
  text-align: center

  & > div
    border: 0.1em solid white
    padding: 0.5em
    display: flex
    gap: 0.5em
    justify-content: center

    & > div
      display: flex
      flex-direction: column
      gap: 0.25em
      justify-content: center
      align-items: center
      height: 64px

img
  height: 100%
  border-radius: 0.5em

i
  font-size: 125%
  font-style: normal
</style>