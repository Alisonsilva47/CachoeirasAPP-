import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class Esqueciasenha extends React.Component {
  state = { email: '', name: '', phone: null, date: '', password: '', sexo: "", passwordConfirm: "", passwordInfo: "", sabeNadar:"",errorMessage: null }

  handleSignUp = () => {
    var { email, password, passwordInfo, passwordConfirm } = this.state

    try{
      if (this.state.password != this.state.passwordConfirm){
        passwordInfo = "Erro: As senhas não conferem!"
        Alert.alert("Erro: As senhas não conferem!");
        this.setState({ errorMessage: passwordInfo })
        return false;
      }
      Alert.alert('Senha alterada com sucesso!')
      this.props.navigation.navigate('Login')
    }catch(error){
      this.setState({ errorMessage: error.message })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Digite sua nova senha</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
       
       
        <TextInput
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="Confirme sua senha"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          value={this.state.passwordConfirm}
        />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
      
        <Button color ="#4682B4"
          title="Alterar senha"
          onPress={() => this.props.navigation.navigate('Login')}
        />
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     backgroundColor:'#9ACD32',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
    space: {
    width: 10, // or whatever size you need
    height: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15
  }
})