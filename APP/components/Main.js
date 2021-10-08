import React from 'react'
import { StyleSheet, Platform, Image, Button, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Searchbar } from 'react-native-paper';




export class MyComponent extends React.Component {
  state = {
    firstQuery: '',
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <View style={{flex: 1, paddingTop: 100}}>
      <Searchbar  
     backgroundColor='#9ACD32'
        placeholder="Encontre sua cachoeira"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
      />
      </View>
    );
  }

  
}


const verdade = require('../xx.json');
const Periodo = ({navigation}) => {
 const cachoeira =  Object.entries(verdade).map(([key, value]) => {
    return <Text key={key}>{value.Nome} - {value.Cidade}</Text>
  });
  return(
  <View style={styles.container}>
    {cachoeira}
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
  <Periodo />
 </>
  )
  }

























