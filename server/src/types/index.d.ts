interface Player { id: string, type: number }

export interface CreateGroupData {
  creator: Player,
  players: Player[]
}