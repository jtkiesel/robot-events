import type {AxiosInstance, AxiosResponse} from 'axios';

export abstract class Client {
  public constructor(private readonly axiosInstance: AxiosInstance) {}

  protected async get<T>(path: string, params?: object) {
    const response = await this.axiosInstance.get<T, AxiosResponse<T>>(path, {
      params,
    });
    return response.data;
  }

  protected async post<T>(path: string, data?: object) {
    const response = await this.axiosInstance.post<T, AxiosResponse<T>>(path, {
      data,
    });
    return response.data;
  }
}
