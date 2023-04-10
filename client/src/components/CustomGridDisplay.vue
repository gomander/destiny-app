<template>
  <div
    class="outer-grid"
    ref="grid"
  >
    <div
      class="grid-label"
      ref="label"
    >
      <div>{{ weaponType }}</div>
    </div>
    <div
      class="top-header"
      ref="top"
    >
      <div
        v-for="frame of frames"
      >
        {{ frame }}
      </div>
    </div>
    <div
      class="left-header"
      ref="left"
    >
      <div
        v-for="element of elements"
      >
        {{ element }}
      </div>
    </div>
    <div
      class="grid-data"
      ref="data"
    >
      <div
        v-for="weapon of weapons"
        :style="{ gridRow: weapon.damageType, gridColumn: weapon.frame }"
      >
        {{ weapon.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { AmmoType, WeaponType } from './models';

const userStore = useUserStore()

interface Props {
  weaponType: WeaponType
  ammoType?: AmmoType
}
const props = defineProps<Props>()

const weapons = userStore.craftableWeapons.filter(
  (weapon) => weapon.weaponType === props.weaponType
)

const frames = weapons.map(
  (weapon) => weapon.frame
).filter(
  (value, index, self) => index === self.findIndex((t) => t === value)
)

const elements = weapons.map(
  (weapon) => weapon.damageType
).filter(
  (value, index, self) => index === self.findIndex((t) => t === value)
)

const grid = ref<HTMLDivElement | null>(null)
const label = ref<HTMLDivElement | null>(null)
const top = ref<HTMLDivElement | null>(null)
const left = ref<HTMLDivElement | null>(null)
const data = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const cssFrames = frames.map((frame) => `[${frame}] 1fr`).join(' ')
  top.value!.style.gridTemplateColumns = cssFrames
  data.value!.style.gridTemplateColumns = cssFrames
  const cssElements = elements.map((element) => `[${element}] 1fr`).join(' ')
  data.value!.style.gridTemplateRows = cssElements
})
</script>

<style scoped lang="sass">
.outer-grid
  display: grid
  grid-template-areas: 'label top' 'left data'
  grid-template-columns: minmax(min-content, 10%) 1fr
  background-color: #222
  border: 0.1rem solid white
  border-radius: 0.25rem

  & > div > div
      border: 0.1rem solid white
      padding: 0.25rem

.grid-label
  grid-area: label
.top-header
  display: grid
  grid-area: top
.left-header
  display: grid
  grid-area: left
.grid-data
  display: grid
  grid-area: data
  background-color: #333
</style>