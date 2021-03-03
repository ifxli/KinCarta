import React, { FunctionComponent, useMemo } from 'react'
import { Text, View, Image, Dimensions, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import styled from "styled-components"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { updateContact } from '@store/toolkit/contacts'
import { getContactsList } from '@store/selectors/contacts'

const photo_width = Dimensions.get('window').width * 2 / 5

const DetailItem: FunctionComponent<{
  detail: any
}> = ({
  detail
}) => {
  return (
    <DetailItemContainer>
      <DetailTitle>{detail.title}</DetailTitle>
      <DetailDataRow>
        <Text>{detail.data}</Text>
        <DetailType>{detail.type}</DetailType>
      </DetailDataRow>
    </DetailItemContainer>
  )
}

type DetailsScreenParams = {
    Details: { contactId: number }
}

const Details: FunctionComponent<StackScreenProps<DetailsScreenParams, 'Details'>> = ({
    route: { params: { contactId } },
    navigation
}) => {
  const dispatch = useDispatch()
  const contacts = useSelector(getContactsList)
  const contact: any = useMemo(() => {
    return contacts.find(contact => contact.id === contactId)
  }, [contacts])

  const onClickFavoriate = () => {
    dispatch(updateContact({
      id: contact.id,
      changes: {
        isFavorite: !contact.isFavorite
      }
    }))
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onClickFavoriate}>
          <TextFavoriateIcon isFavorite={contact.isFavorite}>★</TextFavoriateIcon>
        </TouchableOpacity>
      ),
    });
  }, [navigation, contact]);
  
  const details: {title: string, data: string, type: string}[] = []

  if (contact.phone) {
    Object.keys(contact.phone).sort().map((key) => {
      details.push({ 
        title: 'PHONE:',
        data: contact.phone[key] as string,
        type: key
      })
    })
  }

  contact.address && details.push({
    title: 'ADDRESS:',
    data: contact.address.street + '\n'
      + contact.address.city
      + ', ' + contact.address.state
      + ' ' + contact.address.zipCode
      + ', ' + contact.address.country,
    type: ''
  })

  contact.birthdate && details.push({
    title: 'BIRTHDATE:',
    data: contact.birthdate,
    type: ''
  })
  
  contact.emailAddress && details.push({
    title: 'EMAIL:',
    data: contact.emailAddress,
    type: ''
  })

  return (
    <ContactContainer
      ListHeaderComponent={
        <View>
          <UserPhoto source={{ uri: contact.largeImageURL }}/>
          <UserHeader>
            <TextUserName>{ contact.name }</TextUserName>
            {contact.companyName && <TextCompanyName>{ contact.companyName }</TextCompanyName>}
          </UserHeader>
          <Separator/>
        </View>
      }
      data={details}
      keyExtractor={(item: any, index) => index.toString()}
      ItemSeparatorComponent={() => <Separator/>}
      renderItem={({ item }) => (<DetailItem detail={item as any}/>)}
    />
  )
}

const TextFavoriateIcon = styled(Text)<{ isFavorite?: boolean }>`
  color: ${({ isFavorite }) => (isFavorite ? '#fdca6a' : 'grey')};
  font-size: 20px;
  text-align: center;
  width: 30px;
`

const ContactContainer = styled(FlatList)`
  background-color: white;
`

const UserHeader = styled(View)`
  margin-bottom: 30px;
`

const UserPhoto = styled(Image)`
  width: ${photo_width};
  height: ${photo_width};
  align-self: center;
  background-color: grey;
  margin: 15px;
`

const TextUserName = styled(Text)`
  font-size: 22px;
  text-align: center;
`

const TextCompanyName = styled(Text)`
  font-size: 15px;
  text-align: center;
  color: grey;
  margin-top: 5px;
`

const Separator = styled(View)`
  margin-left: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #dadde1
`

const DetailItemContainer = styled(View)`
  padding-vertical: 25px;
  padding-horizontal: 20px
`

const DetailTitle = styled(Text)`
  color: grey;
`

const DetailDataRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`

const DetailType = styled(Text)`
  color: grey;
  text-transform: capitalize
`

export default Details