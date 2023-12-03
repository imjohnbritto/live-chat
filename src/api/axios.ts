import axios, { AxiosRequestConfig } from 'axios';

//API timeout in seconds
const API_TIMEOUT = 10;

const server = axios.create({
  timeout: API_TIMEOUT * 1000
});

const axiosApiCall = async <ResponseData>(config: AxiosRequestConfig) => {
  return server
    .request<ResponseData>(config)
    .then((response) => response.data)
    .catch((error: any) => {
      let rejectValue;
      if (error.response) {
        rejectValue = {
          status: error.response.status || 500,
          message: error.response.data?.message || 'Unknown error',
          data: error.response.data?.data
        };
      } else {
        rejectValue = {
          status: 500,
          message: 'Unknown error'
        };
      }
      return Promise.reject(rejectValue);
    });
};

export default axiosApiCall;
