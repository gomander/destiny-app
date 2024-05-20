interface Player {
  id: string,
  type: number,
  name: string,
  code: number
}

export interface CreateGroupData {
  creator: Player,
  players: Player[]
}
