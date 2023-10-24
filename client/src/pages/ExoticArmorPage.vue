<template>
  <q-page class="q-pa-md">
    <h1>Exotic armor</h1>

    <p>
      Work in progress. Hoping to eventually display each piece's ornaments and
      paywalls. Perhaps even acquisition methods.
    </p>

    <div
      v-for="armorSlot in armorSlots"
      :key="armorSlot"
      class="row q-mt-md"
    >
      <ul
        v-for="characterClass in characterClasses"
        :key="characterClass"
        class="col"
      >
        <li
          v-for="armor in filterArmor(armorSlot, characterClass)"
          :key="armor.hash"
        >
          <img
            :src="armor.icon"
            :alt="armor.name"
            :title="armor.name"
            class="exotic q-mr-sm"
          />

          <img
            v-for="ornament in armor.ornaments"
            :key="ornament"
            :src="getOrnament(ornament)?.icon"
            alt=""
            :title="getOrnament(ornament)?.name"
            class="exotic q-ml-sm"
          />
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from 'src/stores/game-store'
import { DestinyClass, DestinyItemSubType } from 'bungie-api-ts/destiny2'
import seasons from 'src/data/seasons'

const gameStore = useGameStore()

const armorSlots = [
  DestinyItemSubType.HelmetArmor, DestinyItemSubType.GauntletsArmor,
  DestinyItemSubType.ChestArmor, DestinyItemSubType.LegArmor
]

const characterClasses = [
  DestinyClass.Titan, DestinyClass.Hunter, DestinyClass.Warlock
]

const seasonsArray = Array.from(seasons.values())

const filterArmor = (
  armorSlot: DestinyItemSubType, characterClass: DestinyClass
) => gameStore.armor.filter(
  armor => armor.slot === armorSlot && armor.class === characterClass
).sort((a, b) => (seasonsArray.find(
  season => season.icons.includes(a.seasonIcon)
)?.value || 0 ) - (seasonsArray.find(
  season => season.icons.includes(b.seasonIcon)
)?.value || 0))

const getOrnament = (hash: number) => {
  return gameStore.ornaments.find(ornament => ornament.hash === hash)
}
</script>

<style scoped lang="sass">
.exotic
  border: 2px solid #f0f0f0
  border-radius: 1em
  width: 5em
  height: auto
</style>
