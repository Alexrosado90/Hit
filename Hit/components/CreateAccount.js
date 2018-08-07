import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { Header, Button, Card, CardSection, Input, Spinner } from '../components/common';

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
    }
    state = {email: '', password: '', errors: '', loading: false};

    onButtonPress() {
        const {email, password } = this.state;

        this.setState({ error: ''});

        firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(this.onCreateSuccess.bind(this))
            // .catch(this.onCreateFail.bind(this));    
        
    }

    // onCreateFail() {
    //     this.setState({ error: 'Creation Failed', loading: false});
    // }

      onCreateSuccess() {
          this.props.navigation.navigate("LogInForm")
      }

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

//export default CreateAccount;