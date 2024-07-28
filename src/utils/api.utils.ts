import store from "../store";
import { useAppSelector } from "../store/hooks";
import { AxiosRequestConfig } from "axios";
import {
  setGlobalLoading,
  setTokens,
  signOut,
} from "../store/slicers/auth.slicer";
import axios from "axios";

// import { useState } from "react";
import { useDispatch } from "react-redux";


interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

export const useApiClient = () => {

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const useApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers,
  });

  const refreshAccessToken = async () => {
    try {
      const { data } = await useApiClient.get(
        `/users/refresh?token=${store.getState().auth.refresh_token}`
      );
      dispatch(
        setTokens({
          accessToken: data.access_token,
          refresh_token: data.refresh_token,
        })
      );
      return data;
    } catch (err: any) {
      dispatch(signOut());
    }
  };

  useApiClient.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      dispatch(setGlobalLoading(true));
     

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );


  useApiClient.interceptors.response.use(
    (response) => {
      dispatch(setGlobalLoading(false));
      return response;
    },
    async (error) => {
      dispatch(setGlobalLoading(false));

      const originalRequest: AxiosRequestConfig = error.config;
      if (error.response.status === 401) {
      
        
        if (error.response.detail === "Refresh Tokens do not match") {
          dispatch(signOut());
        } else {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              console.log('here WITH ME');
              
              const newAccessToken = await refreshAccessToken();
              error.config.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken.access_token}`;
              refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                useApiClient
                  .request(config)
                  .then((response) => resolve(response))
                  .catch((err) => reject(err));
              });
              refreshAndRetryQueue.length = 0;
              // Retry the original request
              return useApiClient(originalRequest);
            } catch (refreshError) {
              // Handle token refresh error
              // You can clear all storage and redirect the user to the login page
              throw refreshError;
            } finally {
              isRefreshing = false;
            }
          }
          return new Promise<void>((resolve, reject) => {
            refreshAndRetryQueue.push({
              config: originalRequest,
              resolve,
              reject,
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return useApiClient;
};

export const makeParams = (params: object) => {
  Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
  return params;
};