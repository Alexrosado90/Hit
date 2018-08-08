import firebase from 'firebase';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Header, Button, Spinner } from './components/common';
import LogInForm from './components/LogInForm';
import CreateAccount from './components/CreateAccount';
import WelcomePage from './components/WelcomePage'

firebase.initializeApp({
  apiKey: "AIzaSyA6Uj3ob_4z5nm_3hlKm1-fHZU3mQ0CmU8",
  authDomain: "project4-hit.firebaseapp.com",
  databaseURL: "https://project4-hit.firebaseio.com",
  projectId: "project4-hit",
  storageBucket: "project4-hit.appspot.com",
  messagingSenderId: "722940889773"
});

class App extends Component {
  constructor(props) {
    super(props)
  }
    state = { loggedIn: null };

    componentWillMount() {
      

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
            this.props.navigation.navigate("WelcomePage")
          } else {
            this.setState({ loggedIn: false });
          }

        });

      }

        //future sign out button
        //     // <Button onPress={() => firebase.auth().signOut()}>
        //     // Log Out
        //     // </Button>
        
     

     render() {
       return (
         <View>
           <Header headerText=" Welcome to Hit Messaging!" />
            <LogInForm />
            </View>
       );
     }

    }
//Routes set up
    export default (App = createStackNavigator({

      LogInForm: {
        screen: LogInForm,
        navigationOptions: {
          title: "Sign in"
        }
      },


      CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
            title: "Create Account"
        }
    },

        WelcomePage: {
         screen: WelcomePage,
         navigationOptions: {
             title: "Hit Messenger"
         }
     }
  
  }))

    
  
