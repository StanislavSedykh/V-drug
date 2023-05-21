export type CountGameType = {
  count: string;
};

export type GameType = {
  id: number;
  pin: number;
} & CountGameType; 
