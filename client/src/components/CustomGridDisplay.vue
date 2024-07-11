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
      <div v-if="column">
        <img
          :src="'https://www.bungie.net' + column.icon"
          :alt="column.name"
          :title="column.name + '\n\n' + column.description"
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
          :src="'https://www.bungie.net' + row?.icon"
          :alt="row?.name"
          :title="row?.name"
        />
      </div>
    </div>

    <div
      class="grid-data"
      v-for="(style, i) of cellStyles"
      :style="style"
    >
      <div v-for="weapon of cellWeapons[i]">
        <a
          :href="`https://d2foundry.gg/w/${weapon.hash}`"
          target="_blank"
        >
          <img
            :src="weapon.icon"
            :alt="weapon.name"
            :title="weapon.name"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from 'src/stores/game-store'
import { getWeaponIconAndName } from 'src/utils/weapon-util'
import { AmmoType, Weapon, WeaponType } from 'src/types'

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
    (column) => gameStore.weaponFrames.find(frame => frame.hash === column)
  ).sort(
    (a, b) => a!.name < b!.name ? -1 : 1
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
    (row) => gameStore.damageTypes.find(damageType => damageType.hash === row)
  ).sort((a, b) => {
    const indexA = damageTypeOrder.findIndex((e) => e === a?.name)
    const indexB = damageTypeOrder.findIndex((e) => e === b?.name)
    return indexA < indexB ? -1 : 1
  })
)

const cellStyles = computed(
  () => elements.value.map(
    (element) => frames.value.map(
      (frame) => ({
        gridColumn: 'c' + frame?.hash,
        gridRow: 'r' + element?.hash
      })
    )
  ).flat()
)

const cellWeapons = computed(
  () => elements.value.map(
    (element) => frames.value.map(
      (frame) => data.value.filter(
        (weapon) => weapon.frameHash === frame?.hash &&
          weapon.damageTypeHash === element?.hash
      ).sort((a, b) => a.name < b.name ? -1 : 1)
    )
  ).flat()
)

const resetGrid = () => {
  const cssColumns = '[rows] 80px' + frames.value.map((frame) => `[c${frame?.hash}] 1fr`).join(' ')
  const cssRows = '[columns] 1fr' + elements.value.map((element) => `[r${element?.hash}] 1fr`).join(' ')
  grid.value!.style.gridTemplateColumns = cssColumns
  grid.value!.style.gridTemplateRows = cssRows
  rowHeaderRefs.value.forEach((div) => {
    div.style.gridColumn = 'rows'
  })
}

watch(data, () => {
  resetGrid()
})

watch(gameStore.weaponFrames, () => {
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
  border: 0.1em solid black
  border-radius: 0.25em
  width: fit-content
  text-align: center

  & > div
    border: 0.1em solid black
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

      & > a
        height: 64px

  &-data
    background-color: $grey-9

    & img
      border: 0.1em solid $grey-6

.grid-label, .column-header, .row-header
  color: white
  background-color: $grey-10

img
  height: 100%
  border-radius: 0.5em

i
  font-size: 125%
  font-style: normal
</style>
