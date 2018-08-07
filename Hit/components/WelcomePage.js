import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation'
import { Header } from './common';

export default class WelcomePage extends Component {

    render() {
        return (
            <View>
            <Header headerText="Work in progress" />
            <Text> Welcome!! </Text>
            </View>
        )
    }
}