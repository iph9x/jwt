export interface IUserRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  user: {
    isActivated: boolean;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type TLogoutResponse = {
  acknowledged: boolean;
  deletedCount: number;
};
