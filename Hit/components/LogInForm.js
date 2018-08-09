import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { createStackNavigator } from 'react-navigation';


 export default class LogInForm extends Component {
     constructor(props) {
         super(props);
     }
    state = { email: '', password: '', error: '', loading: false };
    
    async onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: ''});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this))

        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false })
    }

    onLoginSuccess() {
       this.props.navigation.navigate("WelcomePage")
      
    }

    

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}
                >Log in</Button>
        );
    }

    render() {
        return (
         <Card>
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
    
            <CardSection>
            <Button onPress={() => this.props.navigation.navigate("CreateAccount")}> Create Account </Button>
            </CardSection>
         </Card> 
        ) 
        
    }
}


const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

//export default LogInForm;