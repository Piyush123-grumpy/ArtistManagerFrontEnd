import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  id: number | undefined;
  first_name: string | undefined;
  last_name:string | undefined;
  email: string | undefined;
  gender:string|undefined;
  dob:string|undefined;
  address:string|undefined;
  token?: string;
  refresh_token?:string;
  isAuthenticated: boolean;
  globalLoading: boolean;
}

const initialState: AuthState = {
  id: undefined,
  first_name:  undefined,
  last_name: undefined,
  email: undefined,
  gender:undefined,
  dob:undefined,
  address:undefined,
  token: undefined,
  refresh_token:undefined,
  isAuthenticated: false,
  globalLoading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    signOut: (state) => {
      state.first_name=undefined;
      state.last_name=undefined;
      state.email=undefined;
      state.refresh_token=undefined;
      state.token = undefined;
      state.isAuthenticated = false;
    },
    signIn: (state, action) => {
      const { token, id, email, first_name,last_name,refresh_token } = action.payload;
      state.id=id;
      state.email=email;
      state.first_name=first_name;
      state.last_name=last_name;
      state.token = token;
      state.isAuthenticated = true;
      state.refresh_token=refresh_token;
    },
    setTokens: (state, action) => {
      const { accessToken,refresh_token } = action.payload;
      state.token = accessToken;
      state.refresh_token=refresh_token
    },
  },
});

export const { signIn, signOut, setTokens ,setGlobalLoading} = AuthSlice.actions;
export default AuthSlice.reducer;