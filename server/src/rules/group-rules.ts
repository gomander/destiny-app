import { body } from 'express-validator'

export const createGroupRules = [
  body('creator').custom(creator => {
    throwBadPlayerObject(creator)
    return true
  }),
  body('players').isArray().bail().custom(players => {
    for (const player of players) {
      throwBadPlayerObject(player)
    }
    return true
  })
]

const throwBadPlayerObject = (player: any) => {
  if (typeof player !== 'object' || Object.keys(player).length !== 4) {
    throw 'invalid player object'
  }
  if (
    typeof player.id !== 'string' ||
    !Number(player.id) ||
    player.id.length < 10 ||
    player.id.length > 30
  ) {
    throw 'invalid player id'
  }
  if (
    typeof player.type !== 'number' ||
    player.type < 1 ||
    player.type > 254
  ) {
    throw 'invalid player type'
  }
  if (
    typeof player.name !== 'string' ||
    player.name.length < 1 ||
    player.name.length > 50
  ) {
    throw 'invalid player name'
  }
  if (
    typeof player.code !== 'number' ||
    player.code < 0 ||
    player.code > 9999
  ) {
    throw 'invalid player name code'
  }
}