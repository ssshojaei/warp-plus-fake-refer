import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  ListItem,
  Toggle,
} from '@ui-kitten/components'
import {ThemeContext, BackgroundContext} from '../context'
import Notification from 'react-native-android-local-notification'
import SyncStorage from 'sync-storage'

const BackIcon = style => <Icon {...style} name="arrow-back" />

export const SettingsScreen = ({navigation}) => {
  const [runBackground, setRunBackground] = useState(false)
  const [dark, setDark] = useState(false)
  const themeContext = React.useContext(ThemeContext)
  const backContext = React.useContext(BackgroundContext)

  const navigateBack = () => {
    navigation.goBack()
  }
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const handelTheme = value => {
    themeContext.toggleTheme()
    setDark(value)
    SyncStorage.set('theme', value ? 'dark' : 'light')
  }

  const handelBack = value => {
    backContext.toggleBackground()
    setRunBackground(value)
    SyncStorage.set('background', value)
    !backContext.background
      ? Notification.create({
          subject: 'Started',
          message: 'WARP+ fake refer started at background',
        })
      : Notification.create({
          subject: 'Stopped',
          message: 'Successfully stopped background tasks',
        })
  }

  useEffect(() => {
    setDark(themeContext.theme === 'dark')
    setRunBackground(backContext.background)
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Settings"
        alignment="center"
        leftControl={BackAction()}
      />
      <Divider />
      <Layout style={{flex: 1}}>
        <ListItem
          title="Run in background"
          description="auto get fake refer"
          accessory={() => (
            <Toggle
              checked={runBackground}
              onChange={value => handelBack(value)}
            />
          )}
        />
        <ListItem
          title="Dark Theme"
          accessory={() => (
            <Toggle checked={dark} onChange={value => handelTheme(value)} />
          )}
        />
      </Layout>
    </SafeAreaView>
  )
}
