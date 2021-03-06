import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

// import the different screens
import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/Main'
import Esqueciasenha from "./components/Esqueciasenha"

// create our app's navigation stack
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Esqueciasenha
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App