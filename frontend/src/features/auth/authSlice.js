// Update logic
// A slice is the portion of Redux code that relates to a specific set of data and actions within the store 's state. 
// A slice reducer is the reducer responsible for handling actions and updating the data for a given slice. 
// This allows for smaller reducer functions that focus on a slice of state.

import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
// What is a "thunk"?
// The word "thunk" is a programming term that means "a piece of code that does some delayed work". Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.
// For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
// Using thunks requires the redux-thunk middleware to be added to the Redux store as part of its configuration.
// Thunks are a standard approach for writing async logic in Redux apps, and are commonly used for data fetching. However, they can be used for a variety of tasks, and can contain both synchronous and asynchronous logic.
import authService from './authService'   // To be able to request to the backend API - authService is an object with the three functions (register, logout, login) from authService.js
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,   // To use the user if there is one otherwise set user to null
  isLoading: false,
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',  // The name of this thunk (it could be anything)
  async (user, thunkAPI) => {   // async function - user comes from the form - with thunkAPI are some methods which can be used
    // console.log(user);
    try {
      return await authService.register(user)   // register() is a function of authService (to be able to request to the backend API)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  // console.log(user);
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

// Logout user
// NOTE: here we don't need a thunk as we are not doing anything async so we can
// use a createAction instead
export const logout = createAction('auth/logout', () => {
  authService.logout()
  // return an empty object as our payload as we don't need a payload but the
  // prepare function requires a payload return
  return {}
})

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { // To set the state back to the default (in this case since async thunk or anything isn't used)
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => { // To do certain things (e.g. to see the status auth/login/pending or auth/login/fulfilled)
    builder
      .addCase(register.pending, (state) => {   // register.pending is the case to look for - it takes in a function which takes in state
        state.isLoading = true  // To set isLoading to true when it's pending
      })
      .addCase(register.fulfilled, (state, action) => { // The case when it is fulfilled  // state is the current (old) state   // action -> dispatch := Versenden
        state.user = action.payload   // payload (Ladegut -> fetched data) (in this case) are the fetched data - payload is a convention
        state.isLoading = false   // To set isLoading to false after the request is fulfilled
      })
      .addCase(register.rejected, (state) => {  // If there is an error
        state.isLoading = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
   },   
})

export default authSlice.reducer
