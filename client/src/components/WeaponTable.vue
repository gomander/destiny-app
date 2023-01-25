<template>
  <q-table
    :rows="tableRows"
    :columns="columns"
    row-key="damageType"
    separator="cell"
    hide-bottom
  >
  </q-table>
</template>

<script setup lang="ts">
import { DamageType, WeaponType, BowFrame, Weapon } from './models'
import { weapons } from 'src/data/weapons'
import { getFrameTypeFromWeaponType } from 'src/utils/weapon-util'

interface Props {
  weaponType: WeaponType
}
const props = defineProps<Props>()

const frameType = getFrameTypeFromWeaponType(props.weaponType)

const columns = [
  {
    name: 'damageType',
    label: 'Damage Type',
    field: 'damageType',
    sortable: false
  }
]
for (const frame in frameType) {
  columns.push({
    name: frame.toLowerCase(),
    label: frame,
    field: frame.toLowerCase(),
    sortable: false
  })
}

const myWeapons = weapons.filter(
  weapon => weapon.weaponType === props.weaponType
)

interface WeaponsOfFrame {
  frame: string,
  weapons: Weapon[]
}
interface WeaponTableRow {
  damageType: string
  frames: WeaponsOfFrame[]
}
const rows: WeaponTableRow[] = []

for (const damageType in DamageType) {
  const row: WeaponTableRow = {
    damageType: damageType,
    frames: []
  }
  for (const frame in frameType) {
    row.frames.push({
      frame: frame.toLowerCase(),
      weapons: []
    })
  }
  const weaponsOfDamageType = myWeapons.filter(
    weapon => weapon.damageType === damageType.toLowerCase()
  )
  for (const frame in frameType) {
    const lowerFrame = frame.toLowerCase()
    row.frames.find(frame => frame.frame === lowerFrame)?.weapons.push(
      ...weaponsOfDamageType.filter(
        weapon => weapon.frame === lowerFrame
      )
    )
  }
  rows.push(row)
}

const tableRows = rows.map(row => {
  const tableRow: any = {
    damageType: row.damageType
  }
  for (const frame in frameType) {
    const lowerFrame = frame.toLowerCase()
    tableRow[lowerFrame] = row.frames.find(frame => frame.frame === lowerFrame)?.weapons.map(weapon => weapon.name).join(', ')
  }
  return tableRow
})
</script>