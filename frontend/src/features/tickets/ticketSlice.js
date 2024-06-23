import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'  // Redux slice is a concept within the React Redux Toolkit that represents a portion of the Redux state. It is typically organized around a particular feature or domain within an application.
// NOTE: use a extractErrorMessage function to save some repetition

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise resolved or rejected messages at
// component level
const initialState = {
  tickets: null,
  ticket: null,
}

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => { },
})

export default ticketSlice.reducer
