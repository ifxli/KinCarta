import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchContacts = createAsyncThunk(
  'contacts/list',
  async () => await (await fetch('https://s3.amazonaws.com/technical-challenge/v3/contacts.json')).json()
)

export const contactsAdapter = createEntityAdapter<KCContact.Contact>({
  selectId: contact => contact.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const slice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState({
    isLoading: false,
    error: null
  }),
  reducers: {
    updateContact: contactsAdapter.updateOne
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      contactsAdapter.setAll(state, payload)
    })
  },
})

const reducer = slice.reducer
export default reducer

export const { updateContact } = slice.actions