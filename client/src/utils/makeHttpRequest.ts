import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConflictError, UnauthorizedError } from '../errors/http_errors';

async function makeHttpRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error:any) {
      if (error.isAxiosError) {
        const axiosError: AxiosError = error;
        const statusCode = axiosError.response?.status || 500;
        if(statusCode === 401) {
            throw new UnauthorizedError(axiosError.message);
        } else if(statusCode === 409) {
            throw new ConflictError(axiosError.message);
        } else {
            throw new Error(axiosError.message);
        }
      }
      throw error;
    }
  }