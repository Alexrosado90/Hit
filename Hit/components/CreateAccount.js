import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from "react-native";

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
        //this.props.navigation.navigate("LogInForm");
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
    // console.log(email);
    // console.log(name);
    // console.log(password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
      })
    //   .catch(error => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     this.setState({ errorMessage, loading: false });
    //   });

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1.2,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     backgroundColor: "#16a085",
//     padding: 20,
//     paddingTop: 100
//   },
//   logoContainer: {
//     alignItems: "center",
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   logo: {
//     width: 200,
//     height: 150
//   },
//   input: {
//     height: 40,
//     width: 350,
//     marginBottom: 10,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     color: "#fff",
//     paddingHorizontal: 10
//   },
//   button: {
//     height: 50,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     alignSelf: "stretch",
//     marginTop: 10,
//     justifyContent: "center",
//     paddingVertical: 15,
//     marginBottom: 10
//   },
//   buttonText: {
//     fontSize: 18,
//     alignSelf: "center",
//     textAlign: "center",
//     color: "#FFF",
//     fontWeight: "700"
//   },
//   subtext: {
//     color: "#ffffff",
//     width: 160,
//     textAlign: "center",
//     fontSize: 35,
//     fontWeight: "bold",
//     marginTop: 20
//   },
//   error: {
//     margin: 8,
//     marginBottom: 0,
//     color: "red",
//     textAlign: "center"
//   }
// });

//AppRegistry.registerComponent("CreateAccount", () => CreateAccount);
