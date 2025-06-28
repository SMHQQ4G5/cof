export interface IGameRoom {
    roomId: string;
    createdBy: string;
    createdDate: Date;
    betAmount: number;
    currency: string;
    minPlayers: number;
    maxPlayers: number;
}