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
          alt=""
          :title="column.displayProperties.description"
        />
        <div class="weapon-name">{{ cleanUpFrameName(column.displayProperties.name) }}</div>
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
          alt=""
          :title="row.displayProperties.description"
        />
        <div class="weapon-name">{{ row.displayProperties.name }}</div>
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
        <img :src="weapon.icon" alt=""/>
        <div class="weapon-name">{{ weapon.name }}</div>
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
  const cssColumns = '[rows] 120px' + frames.value.map((frame) => `[c${frame.hash}] 1fr`).join(' ')
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
  max-width: fit-content
  text-align: center

  & > div
    border: 0.1em solid white
    padding: 0.75em
    display: flex
    gap: 0.75em
    justify-content: center

    & > div
      display: flex
      flex-direction: column
      gap: 0.25em
      justify-content: center
      align-items: center
      height: 96px
      position: relative

img
  width: 96px
  height: 96px
  border-radius: 0.5em

i
  font-size: 250%
  font-style: normal

.weapon-name
  position: absolute
  bottom: 0em
  left: 0
  right: 0
  border-radius: 0 0 0.5em 0.5em
  background: rgba(0, 0, 0, 0.75)
  word-wrap: break-word
  font-size: 0.8em
</style>