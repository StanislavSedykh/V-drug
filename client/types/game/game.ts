export type CountGameType = {
  count: string;
};

export type PinPartType = {
  pinPart: string;
}
export type GameType = {
  id: number;
  pin: number;
} & CountGameType; 
