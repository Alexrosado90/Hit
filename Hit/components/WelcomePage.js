import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation'
import { Header, Card, CardSection, Spinner, Button } from './common';

export default class WelcomePage extends Component {
    constructor(props) {
        super(props)
        
    }
    

    render() {
        const { textStyle } = styles
        return (
            <Card>
            <Header headerText="Work in progress" />
            <CardSection>
            <Text style={textStyle}> Welcome!! </Text>
            </CardSection>

            <CardSection>
                <Text style={textStyle}> Friends List </Text>
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    textStyle: {
        fontSize: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}