import { contactsAdapter } from '@store/toolkit/contacts'
import { createSelector } from 'reselect'
import rootStore from '../'

type RootState = ReturnType<typeof rootStore.getState>

export const getState = (state: RootState) => state

const contactsSelector = contactsAdapter.getSelectors<RootState>(
  (state) => state.contacts
)

export const getContactsList = createSelector(
  getState,
  state => contactsSelector.selectAll(state)
)