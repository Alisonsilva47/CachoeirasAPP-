import React from 'react'
import { StyleSheet, Text, Picker, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';

export default class SignUp extends React.Component {
  state = { email: '', name: '', date: '', password: '', sexo: "", sabeNadar:"", passwordConfirm: "", passwordInfo: '', errorMessage: null, mask: '+55 (_) _____-____',
      phone: '+55 (_) _____-____',
      raw: false,
      caretPosition: 4,
      caretSetManually: false, }
  handleSignUp = () => {
    const [selectedValue, setSelectedValue] ="";

    var { email, password, name, sexo, sabeNadar, date, phone, passwordConfirm, passwordInfo, passwordColor, errorMessage  } = this.state
    if (this.state.password != this.state.passwordConfirm){
      passwordInfo = "Erro: As senhas não conferem!"
      Alert.alert("Erro: As senhas não conferem!");
      this.setState({ errorMessage: passwordInfo })
      return false;
    }
  }
    constructor(props) {
    super(props);
    var { phone, mask, raw, caretPosition, caretSetManually } = this.state
    this.input = null;
    this.numReg = new RegExp('^[0-9]$');
  }

  _getRawPhone = phone => {
    return phone ? phone.replace(/[^\+\d]+/g, '') : false;
  };

  _getNextCaretPosition = (action, phone) => {
    let nextCaretPosition = this.state.caretPosition;

    switch (action) {
      case 'add':
        nextCaretPosition = phone.indexOf('_');

        return nextCaretPosition != -1
          ? parseInt(nextCaretPosition)
          : this.state.mask.length;

        break;

      case 'remove':
        nextCaretPosition = phone.lastIndexOf(
          this._getRawPhone(phone).slice(-1)
        );
        return nextCaretPosition != -1 ? parseInt(nextCaretPosition) : 4;
        break;
    }
  };

  _onKeyPress = key => {
    const { phone, mask, raw, caretPosition, caretSetManually } = this.state;

    // console.log('cp: ',caretPosition)

    let maskedPhone = false;

    let nextCaretPosition = caretPosition;

    if (key === 'Backspace') {
      if (caretSetManually) {
        if (!this.numReg.test(phone[nextCaretPosition - 1])) {
          const pattern = /[^\+\d]+/

          let pos = nextCaretPosition - 1
          
          phone.substr(0,nextCaretPosition).split('').map((val,key) => {
            if(!pos && pattern.test(val)){
               pos = key
            } else if (pos && !pattern.test(val)) {
               pos = false
            }
          })
          console.log(pos)
          nextCaretPosition = pos
        }
        maskedPhone = phone.replaceIndex(
          nextCaretPosition - 1,
          mask[nextCaretPosition - 1]
        );

        nextCaretPosition = this._getNextCaretPosition('remove', phone);
      } else {
        nextCaretPosition = this._getNextCaretPosition('remove', phone);
        maskedPhone = phone.replaceIndex(
          nextCaretPosition,
          mask.substring(nextCaretPosition)
        );
        nextCaretPosition = nextCaretPosition < 4 ? 4 : nextCaretPosition;
      }
    } else {
      if (!this.numReg.test(parseInt(key)) || caretPosition == mask.length)
        return;

      maskedPhone = phone.replaceIndex(caretPosition, key);
      nextCaretPosition = this._getNextCaretPosition('add', maskedPhone);
    }

    this._setCaret(nextCaretPosition, false, 'keyPress');

    this.setState({
      phone: maskedPhone ? maskedPhone : mask,
      raw: this._getRawPhone(maskedPhone),
      caretSetManually: false,
    });
  };

  _setCaret = (caretPos = false, isManuallySet = false, action = false) => {
    const { caretPosition, phone, mask } = this.state;

    if (!caretPos || (phone == mask && !action)) caretPos = caretPosition;
    if (caretPos != caretPosition && phone != mask) {
      this.input.setNativeProps({
        selection: { start: caretPos, end: caretPos },
      });

      if (isManuallySet) {
        this.setState({ caretPosition: caretPos, caretSetManually: true });
      } else {
        this.setState({ caretPosition: caretPos });
      }
    } else {
      this.input.setNativeProps({
        selection: { start: caretPos, end: caretPos },
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>Cadastro</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Nome Completo"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
            ref={e => (this.input = e)}
            style={ styles.textInput }
            maxLength={parseInt(this.state.mask.length)}
            keyboardType={'number-pad'}
            multiline={true}
            onSelectionChange={({ nativeEvent }) => {
              this._setCaret(
                this.state.phone.indexOf('_') > -1
                  ? this._getNextCaretPosition('add', this.state.phone)
                  : nativeEvent.selection.start,
                true
              );
            }}
            value={this.state.phone}
            onFocus={() => this._setCaret()}
            onKeyPress={({ nativeEvent }) => {
              this._onKeyPress(nativeEvent.key);
            }}
            // onChangeText={e => this._onChangeText(e)}
          />
        <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={{ width: 300, marginBottom: 5}}
          date={this.state.date}
          mode="date"
          
          placeholder="Data de Nascimento"
          format="DD-MM-YYYY"
          maxDate={moment().format('DD-MM-YYYY')}
          confirmBtnText="Selecionar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateInput: {
              borderWidth: 1,
              borderColor: '#4682B4',
              color:"gray"
            },placeholderText: {
              color: 'gray'
            },
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
          value={this.state.date}

        />
        <Picker
          style={styles.textInput}
           borderColor= '#4682B4'
          selectedValue={this.state.sexo}
          onValueChange={sexo => this.setState({ sexo })}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
        </Picker>
        <Text style= {{ fontSize:18, textAlign: 'center' }}> Sabe nadar?</Text>
        <Picker
        color ="#4682B4"
          style={styles.textInput}
          selectedValue={this.state.sabeNadar}
          onValueChange={sabeNadar => this.setState({ sabeNadar })}
          >
            <Picker.Item label="Sim, eu sei nadar" value="true" />
            <Picker.Item label="Não, eu não sei nadar" value="false" />
        </Picker>
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
        <Button style={{marginBottom: 10}} color ="#4682B4" title="Cadastrar" onPress={this.handleSignUp} />
        <View style={styles.space} />
        <Button color ="#4682B4" style={{marginBottom: 10}}
          title="Você já tem uma conta? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

String.prototype.replaceIndex = function(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#9ACD32',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "#4682B4",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 5,
         backgroundColor:"#9ACD32",
         color: 'gray'
  },  
  space: {
    width: 10, // or whatever size you need
    height: 10,
  },
})