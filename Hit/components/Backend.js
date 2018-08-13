import firebase from 'firebase';
import React from 'react';
import { Component } from 'react-native';

class Backend {

    uid = '';
    messagesRef = null;
    constructor() {
            firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.setUid(user.uid);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    alert(error.message);
                })
            }
        })
    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid
    }

    loadMessages(callback) {
        this.messageRef = firebase.database().ref("messages");
        this.messageRef.off()
        const onReceive = data => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name
                }
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messageRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    }

    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();