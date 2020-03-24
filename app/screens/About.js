import React from 'react'
import {SafeAreaView, Linking} from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  ListItem,
  Avatar,
  Button,
} from '@ui-kitten/components'
import salehImage from '../assets/images/saleh.jpg'
import hadiImage from '../assets/images/hadi.jpg'

const BackIcon = style => <Icon {...style} name="arrow-back" />

export const AboutScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack()
  }
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )
  const salehProfile = style => {
    delete style.tintColor
    return <Avatar style={style} source={salehImage} />
  }
  const hadiProfile = style => {
    delete style.tintColor
    return <Avatar style={style} source={hadiImage} />
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="About us"
        alignment="center"
        leftControl={BackAction()}
      />
      <Divider />
      <Layout style={{flex: 1}}>
        <ListItem
          title="Hadi"
          accessory={() => (
            <Button
              onPress={() =>
                Linking.openURL('https://github.com/samimifar/warp-plus')
              }
              size="tiny"
              status="basic">
              Github
            </Button>
          )}
          icon={hadiProfile}
        />
        <ListItem
          title="Saleh"
          accessory={() => (
            <Button
              onPress={() =>
                Linking.openURL(
                  'https://github.com/ssshojaei/warp-plus-fake-refer',
                )
              }
              size="tiny"
              status="basic">
              Github
            </Button>
          )}
          icon={salehProfile}
        />
      </Layout>
    </SafeAreaView>
  )
}
