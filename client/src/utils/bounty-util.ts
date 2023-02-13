import ghostShellXpMods from 'src/data/ghost-shell-xp-mods'

const XP_PER_LEVEL = 100000
const SEASON_PASS_BONUS = 0.2
const DAILY_XP = 6000
const WEEKLY_XP = 12000
const WELL_RESTED_MULTIPLIER = 2
const WELL_RESTED_LEVELS = 5
const SMALL_XP_BOOST_LEVELS = [7, 16, 36, 46, 66, 76]
const FIRETEAM_XP_BOOST_LEVELS = [5, 26, 56, 86]
const SMALL_XP_BOOST = 0.02

export const calculateXp = (
  weeklies: number,
  dailies: number,
  seasonPass?: boolean,
  wellRested?: boolean,
  ghostMod?: number,
  startLevel?: number
) => {
  if (seasonPass !== true && seasonPass !== false) seasonPass = true
  if (wellRested !== true && wellRested !== false) wellRested = true
  if (!ghostMod && ghostMod !== 0) ghostMod = ghostShellXpMods[0].value
  if (!startLevel) startLevel = 1

  const ghostMultiplier = 1 + ghostMod
  let passMultiplier = 1 + SEASON_PASS_BONUS
  let xpSaved = 0
  for (let i = 0; i < dailies; i++) {
    passMultiplier = getPassMultiplier(seasonPass, xpSaved, startLevel)
    let xpToAdd = DAILY_XP * passMultiplier * ghostMultiplier
    xpToAdd = useWellRested(xpToAdd, wellRested, startLevel, xpSaved)
    xpSaved += xpToAdd
  }
  for (let i = 0; i < weeklies; i++) {
    passMultiplier = getPassMultiplier(seasonPass, xpSaved, startLevel)
    let xpToAdd = WEEKLY_XP * passMultiplier * ghostMultiplier
    xpToAdd = useWellRested(xpToAdd, wellRested, startLevel, xpSaved)
    xpSaved += xpToAdd
  }
  return {
    xp: xpSaved,
    levels: xpToLevel(xpSaved),
    endLevel: startLevel + xpToLevel(xpSaved)
  }
}

const getPassMultiplier = (seasonPass: boolean, xp: number, startLevel: number) => {
  if (!seasonPass) return 1
  let multiplier = 1 + SEASON_PASS_BONUS
  for (const boost of SMALL_XP_BOOST_LEVELS) {
    if (xpToLevel(xp) >= boost) {
      multiplier += SMALL_XP_BOOST
    }
  }
  return multiplier
}

const xpToLevel = (xp: number) => {
  return xp / XP_PER_LEVEL + 1
}

const useWellRested = (xp: number, wellRested: boolean, startLevel: number, totalXp: number) => {
  if (!wellRested || xpToLevel(totalXp) >= startLevel + WELL_RESTED_LEVELS) return xp
  return xp * WELL_RESTED_MULTIPLIER
}

export const calculateTotal = (
  dailies: number,
  weeklies: number,
  ghostMod?: number,
  seasonPass?: boolean,
  wellRested?: boolean,
  startLevel?: number
) => {
  if (!ghostMod && ghostMod !== 0) ghostMod = ghostShellXpMods[0].value
  if (seasonPass !== true && seasonPass !== false) seasonPass = true
  if (wellRested !== true && wellRested !== false) wellRested = true
  if (!startLevel) startLevel = 1
  let xpSaved = 0

  for (let i = 0; i < dailies; i++) {
    let xpToAdd = DAILY_XP * (1 + ghostMod)
    if (wellRested && xpSaved < WELL_RESTED_LEVELS * XP_PER_LEVEL) {
      xpToAdd *= WELL_RESTED_MULTIPLIER
    }
    if (seasonPass) {
      let seasonPassBonus = 1 + SEASON_PASS_BONUS
      for (const level of SMALL_XP_BOOST_LEVELS) {
        if (xpToLevel(xpSaved) >= level) {
          seasonPassBonus += SMALL_XP_BOOST
        }
      }
      xpToAdd *= seasonPassBonus
    }
    xpSaved += xpToAdd
  }

  for (let i = 0; i < weeklies; i++) {
    let xpToAdd = WEEKLY_XP * (1 + ghostMod)
    if (wellRested && xpSaved < WELL_RESTED_LEVELS * XP_PER_LEVEL) {
      xpToAdd *= WELL_RESTED_MULTIPLIER
    }
    if (seasonPass) {
      let seasonPassBonus = 1 + SEASON_PASS_BONUS
      for (const level of SMALL_XP_BOOST_LEVELS) {
        if (xpToLevel(xpSaved) >= level) {
          seasonPassBonus += SMALL_XP_BOOST
        }
      }
      xpToAdd *= seasonPassBonus
    }
    xpSaved += xpToAdd
  }
  return xpSaved
}