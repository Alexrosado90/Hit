import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import firebase from "firebase";
import { Header, Spinner, Card, CardSection, Button, Input } from "./common";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errorMessage: null,
      loading: false
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getRef()
          .child("friends")
          .push({
            email: user.email,
            uid: user.uid,
            name: this.state.name
          });
        this.setState({
          loading: false
        });
      }
    });
  }

  getRef() {
    return firebase.database().ref();
  }

   static navigationOptions = {
     headerStyle: {
       backgroundColor: "#16a085",
       elevation: null
     }
   };

  async onButtonPress() {
    this.setState({ errorMessage: null, loading: true });
    const { email, password, name } = this.state;
   
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
      })
    
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("password", password);
    this.props.navigation.navigate("LogInForm");
  }

  renderErrorMessage = () => {
    if (this.state.errorMessage)
      return <Text style={styles.error}>{this.state.errorMessage}</Text>;
  };

  renderButton() {
    if (this.state.loading) {
        return <Spinner size="small" />
    }
    return (
        <Button onPress={this.onButtonPress.bind(this)}>
        Create Account
        </Button>
    );
}

  render() {
    return (
        <Card>
        <Header headerText="Sign up here!" />

        <CardSection>
            <Input
            placeholder="name"
            label="name"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            />
            </CardSection>
        <CardSection>
            <Input
            placeholder="user@email.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            />
        </CardSection>

        <CardSection>
            <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            />
        </CardSection>

        <Text style={styles.errorTextStyle}>
        {this.state.error}
        </Text>

        <CardSection>
            {this.renderButton()}
        </CardSection>
    </Card>
    );
  }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
