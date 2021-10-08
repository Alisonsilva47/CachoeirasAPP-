import React from 'react'
import { StyleSheet, Platform, Image, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Searchbar } from 'react-native-paper';
//import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';




const userDB = require('../usuarioJson.json');
const usuarios = ({navigation}) => {
 const users =  Object.entries(userDB).map(([key, value]) => {
    return <Text key={key}>{value.Nome} - {value.Sobrenome} - {value.Email}</Text>
  });
  return(
  <View style={styles.container}>
  Usuários
    {users}
  </View>);
}

const styles = StyleSheet.create({
  container:{
   // flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#9ACD32',
  },
  title:{
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
    
  }

});
export default  () => {
  return(
  <>
    <MyComponent />
  <usuarios />
 </>
  )
  }

























