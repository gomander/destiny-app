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
        <img
          :src="`/icons/weapons/${weaponType}.png`"
          alt=""
        >
        <h3>{{ weaponType }}s</h3>
      </div>
    </div>

    <div
      class="column-header"
      v-for="column of frames"
    >
      <img
        :src="'https://www.bungie.net' + column.icon"
        :alt="column.name"
        width="64"
        height="64"
      >
      <img
        v-if="column.championType === 'barrier'"
        src="https://www.bungie.net/common/destiny2_content/icons/fcbf6c81f645985e21a2cc7a904c5a20.png"
        alt="Barrier"
        width="32"
        height="32"
        class="champion-icon"
      >
      <img
        v-if="column.championType === 'overload'"
        src="https://www.bungie.net/common/destiny2_content/icons/3c360aff0b37034db4e81e1b8dd06b47.png"
        alt="Overload"
        width="32"
        height="32"
        class="champion-icon"
      >
      <img
        v-if="column.championType === 'unstoppable'"
        src="https://www.bungie.net/common/destiny2_content/icons/2d2dbf4f3c040c20a85d00fe7c37bef7.png"
        alt="Unstoppable"
        width="32"
        height="32"
        class="champion-icon"
      >

      <q-tooltip class="text-body2 text-center" maxWidth="30em">
        <p>{{ column.name }}</p>
        <p>{{ column.description }}</p>
        <p>These weapons can stun {{ column.championType }} champions.</p>
      </q-tooltip>
    </div>

    <div
      class="row-header"
      v-for="row of elements"
      ref="rowHeaderRefs"
    >
      <div>
        <img
          :src="'https://www.bungie.net' + row.icon"
          :alt="row.name || ''"
          width="64"
          height="64"
        >

        <q-tooltip class="text-body2">
          {{ row.name || '' }}
        </q-tooltip>
      </div>
    </div>

    <div
      class="grid-data"
      v-for="(style, i) of cellStyles"
      :style="style"
    >
      <div v-for="weapon of cellWeapons[i]">
        <a
          :href="`https://light.gg/db/items/${weapon.hash}`"
          target="_blank"
        >
          <img
            :src="`https://www.bungie.net${weapon.icon}`"
            :alt="weapon.name"
            width="64"
            height="64"
          >
          <span>{{ weapon.name }}</span>
        </a>

        <q-tooltip class="text-body2">
          {{ weapon.name }}
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { useGameStore } from 'stores'
  import { AmmoType, type Weapon, WeaponType } from 'src/types'

  const gameStore = useGameStore()

  const props = defineProps<{
    weaponType: WeaponType
    ammoType?: AmmoType
    weapons: Weapon[]
  }>()

  const data = computed(() =>
    props.weapons.filter((weapon) =>
      weapon.weaponType === props.weaponType &&
      (!props.ammoType || weapon.ammoType === props.ammoType)
    )
  )

  const frameHashes = computed(() =>
    data.value.map((weapon) => weapon.frameHash).filter((value, index, self) =>
      index === self.findIndex((t) => t === value)
    )
  )

  const frames = computed(() =>
    frameHashes.value
      .map((column) => gameStore.weaponFrames.find((frame) => frame.hash === column))
      .filter((column) => !!column)
      .sort((a, b) => a!.name < b!.name ? -1 : 1)
  )

  const damageTypeOrder = props.ammoType === AmmoType.Heavy
    ? ['Kinetic', 'Void', 'Solar', 'Arc', 'Stasis', 'Strand']
    : ['Kinetic', 'Stasis', 'Strand', 'Void', 'Solar', 'Arc']

  const elementHashes = computed(() =>
    data.value.map((weapon) => weapon.damageTypeHash).filter((value, index, self) =>
      index === self.findIndex((t) => t === value)
    )
  )

  const elements = computed(() =>
    elementHashes.value
      .map((row) => gameStore.damageTypes.find(damageType => damageType.hash === row))
      .filter((row) => !!row)
      .sort((a, b) => {
        const indexA = damageTypeOrder.findIndex((e) => e === a?.name)
        const indexB = damageTypeOrder.findIndex((e) => e === b?.name)
        return indexA < indexB ? -1 : 1
      })
  )

  const cellStyles = computed(() =>
    elements.value.flatMap((element) =>
      frames.value.map((frame) => ({
        gridColumn: 'c' + frame?.hash,
        gridRow: 'r' + element?.hash
      }))
    )
  )

  const cellWeapons = computed(() =>
    elements.value.flatMap((element) =>
      frames.value.map((frame) =>
        data.value.filter((weapon) =>
          weapon.frameHash === frame?.hash && weapon.damageTypeHash === element?.hash
        ).sort((a, b) => a.name < b.name ? -1 : 1)
      )
    )
  )

  function resetGrid() {
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

  const grid = ref<HTMLDivElement | null>(null)
  const rowHeaderRefs = ref<HTMLDivElement[]>([])
</script>

<style scoped>
  .grid {
    display: grid;
    border: 0.1em solid black;
    border-radius: 0.25em;
    width: fit-content;
    text-align: center;
    background-color: #333;
  }
  .grid > div {
    border: 0.1em solid black;
    padding: 0.5em;
    display: flex;
    gap: 0.5em;
    justify-content: center;
  }
  .grid > div > div {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
    height: 64px;
  }
  .grid-data a {
    position: relative;
    height: 64px;
  }
  .grid-data img {
    border: 0.1em solid #aaa;
  }
  .grid-label, .column-header, .row-header {
    color: white;
    background-color: #212121;
  }
  .grid-label > div {
    position: relative;
  }
  .grid-label h3, .grid-data a > span {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    color: transparent;
    pointer-events: none;
  }
  div.column-header {
    flex-direction: row;
    align-items: center;
  }
  img:not(.champion-icon) {
    height: 100%;
  }
  p:last-child {
    margin-bottom: 0;
  }
</style>
