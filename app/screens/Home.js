import React, {useEffect, useState, useContext} from 'react'
import {SafeAreaView} from 'react-native'
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Input,
  Text,
  Spinner,
} from '@ui-kitten/components'
import Axios from 'axios'
import BackgroundTimer from 'react-native-background-timer'
import {BackgroundContext} from '../context'
import SyncStorage from 'sync-storage'

const MenuIcon = style => <Icon {...style} name="more-vertical-outline" />
const SettingIcon = style => <Icon {...style} name="settings-outline" />
const PersonIcon = style => <Icon {...style} name="person-outline" />
const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />
const SettingAction = props => {
  return <TopNavigationAction {...props} icon={SettingIcon} />
}

const genString = length => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const HomeScreen = ({navigation}) => {
  const [value, setValue] = useState('')
  const [count, setCount] = useState(0)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState('')
  const backContext = React.useContext(BackgroundContext)

  const renderRightControls = () => {
    return <SettingAction onPress={() => navigation.navigate('Settings')} />
  }
  const renderLeftControls = () => {
    return <MenuAction onPress={() => navigation.navigate('About')} />
  }
  const getOne = () => {
    const url = 'https://api.cloudflareclient.com/v0a745/reg'
    const install_id = genString(11)
    const postData = JSON.stringify({
      key: `${genString(43)}=`,
      install_id: install_id,
      fcm_token: `${install_id}:APA91b${genString(134)}`,
      Referrer: value,
      warp_enabled: false,
      tos: new Date().toISOString().replace('Z', '+07:00'),
      type: 'Android',
      locale: 'zh_CN',
    })
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Host: 'api.cloudflareclient.com',
      Connection: 'Keep-Alive',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/3.12.1',
    }
    setLoad(true)
    Axios.post(url, postData, {headers})
      .then(data => {
        setLoad(false)
        data.status === 200 && setCount(prev => prev + 1)
      })
      .catch(() => setError('Try again in 3 minutes') & setLoad(false))
  }
  const handelClick = () => {
    SyncStorage.set('userId', value)
    setError('')
    value.length === 36 ? getOne(value) : setError('This is ID is not valid!')
  }

  useEffect(() => {
    backContext.background &&
      BackgroundTimer.setInterval(() => {
        getOne()
      }, 1000 * 60 * 3)
    const userId = SyncStorage.get('userId')
    setValue(userId)
  }, [backContext.background])

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        rightControls={renderRightControls()}
        leftControl={renderLeftControls()}
        title="WARP+ Fake Refer"
        alignment="center"
      />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Layout style={{marginBottom: 30}}>
          {load && <Spinner size="medium" />}
        </Layout>
        {count ? (
          <Text category="p2" status="primary" style={{marginBottom: 20}}>
            {count}GB added successfully!
          </Text>
        ) : null}
        {error.length ? (
          <Text category="p2" status="danger" style={{marginBottom: 20}}>
            {error}
          </Text>
        ) : null}
        <Input
          value={value}
          placeholder="Diagnostic ID"
          icon={PersonIcon}
          onChangeText={setValue}
        />
        <Button
          style={{alignSelf: 'baseline'}}
          size="tiny"
          appearance="ghost"
          onPress={() => navigation.navigate('Help')}
          status="basic">
          Whats This?
        </Button>
        <Button style={{marginTop: 80}} onPress={handelClick}>
          Let's start
        </Button>
      </Layout>
    </SafeAreaView>
  )
}
