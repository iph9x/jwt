export interface IUser {
  email: string | null;
}

export interface UserState extends IUser {
  email: string | null;
  isActivated: boolean | null;
  users: IUser[];
  isFetching: boolean;
}
