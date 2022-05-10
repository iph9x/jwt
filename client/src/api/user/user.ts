import { AxiosResponse } from 'axios';

import { ENDPOINTS } from 'src/shared/constants';

import { agent } from '../agent';

import { IUserResponse } from './types';

export function registration(email: string, password: string): Promise<AxiosResponse<IUserResponse>> {
  return agent.post(ENDPOINTS.registration, { email, password });
}

export function login(email: string, password: string): Promise<AxiosResponse<IUserResponse>> {
  return agent.post(ENDPOINTS.login, { email, password });
}

export function register(email: string, password: string): Promise<AxiosResponse> {
  return agent.post(ENDPOINTS.registration, { email, password });
}

export function fetchUsers(): Promise<AxiosResponse<string[]>> {
  return agent.get(ENDPOINTS.users);
}

export function logoutUser(): Promise<AxiosResponse> {
  return agent.post(ENDPOINTS.logout, {});
}
