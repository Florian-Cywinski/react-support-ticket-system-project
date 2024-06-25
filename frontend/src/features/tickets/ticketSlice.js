import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'  // Redux slice is a concept within the React Redux Toolkit that represents a portion of the Redux state. It is typically organized around a particular feature or domain within an application.
import ticketService from './ticketService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise resolved or rejected messages at
// component level
const initialState = {
  tickets: null,
  ticket: null,
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',   // The name of this thunk (it could be anything)
  async (ticketData, thunkAPI) => {   // async function - ticketData comes from the form - with thunkAPI are some methods which can be used and we can get what we want from other states (e.g. from the authSlice (user state))
    try {
      const token = thunkAPI.getState().auth.user.token   // To fetch the user token from the user state (authSlice)
      return await ticketService.createTicket(ticketData, token)  // createTicket is a function of ticketService.js
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => {},
})

export default ticketSlice.reducer
