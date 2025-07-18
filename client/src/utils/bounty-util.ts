import { ghostMods } from '../data/xp-modifiers'

const XP_PER_LEVEL = 100000
const SEASON_PASS_BONUS = 0.2
const DAILY_XP = 6000
const WEEKLY_XP = 12000
const WELL_RESTED_MULTIPLIER = 2
const WELL_RESTED_LEVELS = 5
const SMALL_XP_BOOST_LEVELS = [7, 16, 36, 46, 66, 76]
const SMALL_XP_BOOST = 0.02

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
        if (xpSaved / XP_PER_LEVEL + 1 >= level) {
          seasonPassBonus += SMALL_XP_BOOST
        }
      }
      xpToAdd *= seasonPassBonus
    }
    xpSaved += xpToAdd
  }
  return xpSaved
}

/**
 * Calculate XP saved from a previous season
 * @param dailies The number of daily bounties saved
 * @param weeklies The number of weekly bounties saved
 * @param ghostMod The XP ghost mod value, defaults to 0.12
 * @param seasonPass Whether to use the season pass, defaults to true
 * @param wellRested Whether to use Well Rested, defaults to true
 * @param sharedWisdom The Shared Wisdom buff value, defaults to 0
 * @returns The total XP saved with all multipliers factored in
 */
export const calculateXp = (
  dailies: number,
  weeklies: number,
  ghostMod = ghostMods[0].value,
  seasonPass = true,
  wellRested = true,
  sharedWisdom = 0
) => {
  const xpSaved = addBounties(dailies, DAILY_XP, ghostMod, wellRested, seasonPass, sharedWisdom, 0)
  return addBounties(weeklies, WEEKLY_XP, ghostMod, wellRested, seasonPass, sharedWisdom, xpSaved)
}
