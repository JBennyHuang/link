import axios, { AxiosInstance } from "axios";

import React, { useContext } from "react";

class APIContextValue {
  axios: AxiosInstance;

  constructor(
    public readonly IP: string = "http://192.168.2.38:5050",
    public roomAlert: number = 0
  ) {
    this.axios = axios.create({
      withCredentials: true,
    });
  }
  createRoom = async (name: string) => {
    await this.axios.post(`${this.IP}/room/create`, { name: name });
    this.roomAlert += 1;
  };

  joinRoom = async (uuid: string) => {
    await this.axios.post(`${this.IP}/room/join`, { uuid: uuid });
  };

  leaveRoom = async (uuid: string) => {
    await this.axios.post(`${this.IP}/room/leave`, { uuid: uuid });
  };

  getRooms = async () => {
    return await this.axios.get(`${this.IP}/user/rooms`);
  };

  getFriends = async () => {
    return await this.axios.get(`${this.IP}/user/friends`);
  };

  addFriends = async (name: string) => {
    return await this.axios.post(`${this.IP}/friend/add`, { name: name });
  };

  getMessages = async (uuid: string) => {
    return await this.axios.get(`${this.IP}/message?uuid=${uuid}`);
  };

  sendMessage = async (uuid: string, content: string) => {
    const body = {
      uuid: uuid,
      content: content,
    };
    await this.axios.post(`${this.IP}/message`, body);
  };

  searchUsers = async (prefix: string, limit: number = 25) => {
    return await this.axios.get(
      `${this.IP}/user?prefix=${prefix}&limit=${limit}`
    );
  };
}

const defaultValue = new APIContextValue();
const APIContext = React.createContext<APIContextValue>(defaultValue);
const useAPIs = () => useContext(APIContext);
const APIProvider = (props: { children: React.ReactNode }) => {
  return (
    <APIContext.Provider value={defaultValue}>
      {props.children}
    </APIContext.Provider>
  );
};

export { APIProvider, useAPIs, APIContextValue };