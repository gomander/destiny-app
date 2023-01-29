<template>
  <q-table
    :rows="tableRows"
    :columns="columns"
    row-key="damageType"
    separator="cell"
    hide-bottom
    dense
  />
</template>

<script setup lang="ts">
import { WeaponType, Weapon, AmmoType } from './models'
import { weapons } from 'src/data/weapons'
import {
  getTableTitle, capitalizeText, getAvailableDamageTypes, getAvailableFrames
} from 'src/utils/weapon-util'

interface Props {
  label?: string
  weaponType: WeaponType
  ammoType?: AmmoType
}
const props = defineProps<Props>()

const columns = [
  {
    name: 'damageType',
    label: props.label || getTableTitle(props.weaponType, props.ammoType),
    field: 'damageType',
    sortable: false
  }
]
const frameType = getAvailableFrames(props.weaponType, props.ammoType)!
const frames = Object.keys(frameType).map((frame: string) => ({
  key: frame.toLowerCase(),
  displayText: capitalizeText((frameType as any)[frame]),
  value: (frameType as any)[frame]
}))
for (const frame of frames) {
  columns.push({
    name: frame.key,
    label: frame.displayText,
    field: frame.key,
    sortable: false
  })
}
const myWeapons = weapons.filter(weapon => {
  if (weapon.weaponType !== props.weaponType) return false
  if (props.ammoType) return weapon.ammoType === props.ammoType
  return true
})
interface WeaponsOfFrame {
  frame: string,
  weapons: Weapon[]
}
interface WeaponTableRow {
  damageType: string
  frames: WeaponsOfFrame[]
}
const rows: WeaponTableRow[] = []
for (const damageType of getAvailableDamageTypes(props.weaponType, props.ammoType)) {
  const row: WeaponTableRow = {
    damageType: damageType,
    frames: []
  }
  for (const frame of frames) {
    row.frames.push({
      frame: frame.key,
      weapons: []
    })
  }
  const weaponsOfDamageType = myWeapons.filter(
    weapon => weapon.damageType === damageType
  )
  for (const frame of frames) {
    row.frames.find(f => f.frame === frame.key)?.weapons.push(
      ...weaponsOfDamageType.filter(
        weapon => weapon.frame === frame.value
      )
    )
  }
  rows.push(row)
}
const tableRows = rows.map(row => {
  const tableRow: any = {
    damageType: capitalizeText(row.damageType)
  }
  for (const frame of frames) {
    tableRow[frame.key] = row.frames.find(
      f => f.frame === frame.key
    )?.weapons.map(weapon => weapon.name).join(', ')
  }
  return tableRow
})
</script>