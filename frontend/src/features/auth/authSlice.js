// Update logic
// A slice is the portion of Redux code that relates to a specific set of data and actions within the store 's state. 
// A slice reducer is the reducer responsible for handling actions and updating the data for a given slice. 
// This allows for smaller reducer functions that focus on a slice of state.

// import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// What is a "thunk"?
// The word "thunk" is a programming term that means "a piece of code that does some delayed work". Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.
// For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
// Using thunks requires the redux-thunk middleware to be added to the Redux store as part of its configuration.
// Thunks are a standard approach for writing async logic in Redux apps, and are commonly used for data fetching. However, they can be used for a variety of tasks, and can contain both synchronous and asynchronous logic.

const initialState = {
  user: null,
  isLoading: false,
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',  // The name of this thunk (it could be anything)
  async (user, thunkAPI) => {   // async function - user comes from the form - with thunkAPI are some methods which can be used
    console.log(user);
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers: () => { },
})

export default authSlice.reducer
