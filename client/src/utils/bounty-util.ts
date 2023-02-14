import { ghostMods } from 'src/data/xp-modifiers'

const XP_PER_LEVEL = 100000
const SEASON_PASS_BONUS = 0.2
const DAILY_XP = 6000
const WEEKLY_XP = 12000
const WELL_RESTED_MULTIPLIER = 2
const WELL_RESTED_LEVELS = 5
const SMALL_XP_BOOST_LEVELS = [7, 16, 36, 46, 66, 76]
const SMALL_XP_BOOST = 0.02

const xpToLevel = (xp: number) => {
  return xp / XP_PER_LEVEL + 1
}

const addBounties = (
  bountyCount: number,
  bountyValue: number,
  ghostMod: number,
  wellRested: boolean,
  seasonPass: boolean,
  sharedWisdom: number,
  xpSaved: number
) => {
  for (let i = 0; i < bountyCount; i++) {
    let xpToAdd = bountyValue * (1 + ghostMod) * (1 + sharedWisdom)
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

export const calculateTotal = (
  dailies: number,
  weeklies: number,
  ghostMod?: number,
  seasonPass?: boolean,
  wellRested?: boolean,
  sharedWisdom?: number,
  startLevel?: number
) => {
  if (!ghostMod && ghostMod !== 0) ghostMod = ghostMods[0].value
  if (seasonPass !== true && seasonPass !== false) seasonPass = true
  if (wellRested !== true && wellRested !== false) wellRested = true
  if (!sharedWisdom) sharedWisdom = 0
  if (!startLevel) startLevel = 1
  let xpSaved = 0
  xpSaved = addBounties(dailies, DAILY_XP, ghostMod, wellRested, seasonPass, sharedWisdom, xpSaved)
  xpSaved = addBounties(weeklies, WEEKLY_XP, ghostMod, wellRested, seasonPass, sharedWisdom, xpSaved)
  return xpSaved
}