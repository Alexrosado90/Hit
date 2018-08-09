import React, {Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';



export default class Chat extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        messages: [],
    };


    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            />
        )
    }
}