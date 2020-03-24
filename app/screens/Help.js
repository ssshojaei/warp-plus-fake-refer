import React from 'react'
import {SafeAreaView, ScrollView, Linking} from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
} from '@ui-kitten/components'

const BackIcon = style => <Icon {...style} name="arrow-back" />

export const HelpScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack()
  }
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Help"
        alignment="center"
        leftControl={BackAction()}
      />
      <Divider />
      <Layout style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginHorizontal: 15, marginVertical: 10}}>
          <Layout>
            <Text>
              1. Open the "1.1.1.1" application, if you don't have it, download
              it from the bottom button
            </Text>
            <Button
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&hl=en_US',
                )
              }
              style={{marginVertical: 10}}>
              Download from GooglePlay
            </Button>
            <Button
              onPress={() =>
                Linking.openURL(
                  'http://dl.apktops.ir/apps/2020/03/1.1.1.1_Faster_&_Safer_Internet_v5.0_Lite_Mod_Apktops.ir.apk',
                )
              }
              style={{marginVertical: 10}}>
              Direct download APK
            </Button>
          </Layout>
          <Layout>
            <Text>2. Press the menu icon and open Setting screen</Text>
          </Layout>
          <Layout>
            <Text>3. Choose "1.1.1.1 with WARP+" option</Text>
          </Layout>
          <Layout>
            <Text>4. Press the "Advanced" button</Text>
          </Layout>
          <Layout>
            <Text>4. Press the "Diagnostics" button</Text>
          </Layout>
          <Layout>
            <Text>5. Long touch on the ID and copy the value</Text>
            <Text category="c1" status="info">
              (ex: 1abd4219-7x86-4164-94f5-rd3467458c9a)
            </Text>
          </Layout>
          <Layout>
            <Text>6. Paste your ID in the app and enjoy!</Text>
          </Layout>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  )
}
