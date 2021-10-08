import React from 'react'
import { StyleSheet, Text, Image, TextInput, View, Button } from 'react-native'




export default class Login extends React.Component {
  state = { email: 'name@aluno.ifal.edu.br', password: '123456', errorMessage: null }

  

  handleLogin = () => {
    const { email, password } = this.state
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.logo}>
          <Image
          source={require('../assets/logopng.png')} //image
          />
        </View>
        <Text>Faça login ou cadastre-se</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        /><View style={styles.space} /><View style={styles.space} />
         <View style={styles.space2} />
        
        <View>
          <Button  color="#4682B4" title="Login" onPress={() => this.props.navigation.navigate('Main')}
 />
           <View style={styles.space} />
           
          <Button  color="#4682B4"
          title="Esqueci minha senha!"
          onPress={() => this.props.navigation.navigate('Esqueciasenha')}
          />
          <View style={styles.space} />
          <Button  color="#4682B4" 
          title="Ainda não tem uma conta? Cadastre-se!"
          
          onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#9ACD32',
 
  },
  space: {
    width: 10, // or whatever size you need
    height: 10,
  },
  space2: {
    width: 10, // or whatever size you need
    height: 10,
  },
  textInput: {
    height: 40,
    width: '85%',
    borderColor: 	'#4682B4',
    borderWidth: 1,
    marginTop: 8
  },


})