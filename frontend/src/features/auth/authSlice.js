// import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers: () => { },
})

export default authSlice.reducer
