import type { IUserTrack } from './user';

export interface ISearch {
  count: number;
}

export interface IUserTrackResponse {
  user: IUserTrack;
  expire: string;
  token: string;
}
