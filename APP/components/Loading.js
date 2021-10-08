import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'


export default class Loading extends React.Component {
  //setTimeout(componentDidMount, '2000');
  componentDidMount() {
      this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})