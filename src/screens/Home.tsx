import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { Text, View, SectionList, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import styled from "styled-components"

import { fetchContacts } from '@store/toolkit/contacts'
import { getContactsList } from '@store/selectors/contacts'

const Contact: FunctionComponent<{
  contact: KCContact.Contact,
  navigation: any
}> = ({
  contact,
  navigation
}) => {
  const handleOpen = () => {
    navigation.navigate('Details', { contactId: contact.id })
  }

  return (
    <ContactItemContainer onPress={handleOpen}>
      <ContactUserPhoto source={{ uri: contact.smallImageURL }}/>
      <ContactItemDescription>
        <ContactUserNameContainer>
          <TextFavoriateIcon>{contact.isFavorite ? '★' : ''}</TextFavoriateIcon>
          <TextUserName>{ contact.name }</TextUserName>
        </ContactUserNameContainer>
        <TextCompanyName>{ contact.companyName }</TextCompanyName>
      </ContactItemDescription>
    </ContactItemContainer>
  )
}

const SectionHeader: FunctionComponent<{
  title: string
}> = ({
  title
}) => (
  <SectionHeaderContainer>
    <Text>{ title } CONTACTS</Text>
  </SectionHeaderContainer>
)

const Home: FunctionComponent<StackScreenProps<{}>> = ({
  navigation
}) => {
  const dispatch = useDispatch()
  const contacts = useSelector(getContactsList)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])


  const sections: {title: string, data: KCContact.Contact[]}[] = useMemo(() => {
    const favorites = contacts.filter(contact => contact.isFavorite)
    const others = contacts.filter(contact => !contact.isFavorite)

    const sections: {title: string, data: KCContact.Contact[]}[] = []
    if (favorites.length > 0) {
      sections.push({
        title: 'FAVORITE',
        data: favorites
      })
    }
    if (others.length > 0) {
      sections.push({
        title: 'OTHER',
        data: others
      })
    }
    return sections
  }, [contacts])
  
  return (
      <Container
        sections={sections}
        keyExtractor={(item: any, index) => item.id + index}
        renderSectionHeader={({ section: { title } }) => (<SectionHeader title={title}/>)}
        ItemSeparatorComponent={() => <ContactitemSeparator/>}
        renderItem={({ item }) => (<Contact navigation={navigation} contact={item as any}/>)}/>
  )
}

const Container = styled(SectionList)`
  flex: 1;
  background-color: #fff;
`

const SectionHeaderContainer = styled(View)`
  background-color: #dadde1;
  padding-vertical: 8px;
  padding-left: 15px;
`

const ContactItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`

const ContactItemDescription = styled(View)`
  flex-direction: column;
  flex: 1;
`

const ContactUserNameContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`

const TextFavoriateIcon = styled(Text)`
  color: #fdca6a;
  font-size: 20px;
  text-align: center;
  width: 30px;
`

const TextUserName = styled(Text)`
  font-size: 18px;
`

const TextCompanyName = styled(Text)`
  font-size: 15px;
  margin-left: 30px;
  color: grey
`

const ContactitemSeparator = styled(View)`
  margin-left: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #dadde1
`

const ContactUserPhoto = styled(Image)`
  width: 50px;
  height: 50px;
  background-color: grey;
  margin: 15px;
`

export default Home