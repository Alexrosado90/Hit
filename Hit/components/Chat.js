import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import { StackNavigator } from 'react-navigation';


 let name, uid, email;

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            
        };

        //this.friend = this.props.friend

        this.user = firebase.auth().currentUser;
        console.log("user:" + this.user.uid)

        const { params } = this.props.navigation.state;
         uid = params.uid;
         name = params.name;
         email = params.email;

         console.log( "user:" + uid)
       

        this.chatRef = this.getRef().child('chat/' + this.generateChatId())
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }

    generateChatId() {
        if(this.user.uid > uid)
        return `${this.user.uid}-${uid}`;
      else return `${uid}-${this.user.uid}`;
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on("value", snap => {
            let items = [];
            snap.forEach(child => { 
                //let name = child.val().uid == this.user.uid ? this.user.name : name1;            
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid
                    }

                })
            })

            this.setState({
                loading: false,
                messages: items
            })
        })
    }

     componentDidMount() {
        this.listenForItems(this.chatRefData);
        
    }

    componentWillUnmount() {
        this.chatRefData.off();
       
    }

    // getUser() {
    //     return {
    //         name: this.props.navigation.state.params.name,
    //         _id: Fire.shared.uid,
    //     }
    // }

    onSend(messages = []) {

        
        messages.forEach(message => {
            let now = new Date().getTime();
            this.chatRef.push({
                id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                order: -1 * now
            });
        });
    }


    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend.bind(this)}
            user={{ _id: this.user.uid}}
            />
        )
    }
}

