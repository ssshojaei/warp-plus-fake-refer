import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light, dark} from '@eva-design/eva'
import {AppNavigator} from './app/components'
import {ThemeContext, BackgroundContext} from './app/context'
import SyncStorage from 'sync-storage'

const themes = {light, dark}

const App = () => {
  const [theme, setTheme] = React.useState('light')
  const [background, setBackground] = React.useState(false)
  const currentTheme = themes[theme]

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  const toggleBackground = () => {
    const nextBackground = background ? false : true
    setBackground(nextBackground)
  }
  useEffect(() => {
    ;(async () => {
      await SyncStorage.init()
      SyncStorage.get('theme') && setTheme(SyncStorage.get('theme'))
      SyncStorage.get('background') &&
        setBackground(JSON.parse(SyncStorage.get('background')))
    })()
  }, [])
  return (
    <>
      <StatusBar backgroundColor={theme === 'light' ? '#E4E9F2' : '#222B45'} />
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <BackgroundContext.Provider value={{background, toggleBackground}}>
          <ApplicationProvider mapping={mapping} theme={currentTheme}>
            <AppNavigator />
          </ApplicationProvider>
        </BackgroundContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
