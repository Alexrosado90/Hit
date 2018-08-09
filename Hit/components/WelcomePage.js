import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation'
import { Header, Card, CardSection, Spinner, Button } from './common';
import Chat from './Chat';

let name, uid, email;

export default class WelcomePage extends Component {
    state = {
        name: "",
        uid: null,
        email: ""
    }
    
    constructor(props) {
        super(props);
        this.state = {
            datasource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: true
        };
        this.friendsRef = this.getRef().child("friends");
        navigator = this.props.navigator
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(friendsRef) {
        let user = firebase.auth().currentUser;

        friendsRef.on("value", (snap) => {
            let items = [];
            snap.forEach((child) => {
                if(child.val().email != user.email)
                items.push({
                    name: child.val().name,
                    uid: child.val().uid,
                    email: child.val().email
                });
            });

            this.setState({
                DataSource: this.state.datasource.cloneWithRows(items),
                loading: false
            });
        });
    }

     componentDidMount() {
         this.listenForItems(this.friendsRef);
     }

    renderRow(rowData) {
        return ( <TouchableOpacity onPress={() => {
            name = rowData.name;
            email = rowData.email;
            uid = rowData.uid;
        this.props.navigation.navigate("chat", {
            name: name,
            email: email,
            uid: uid
        })
         }}
         >
        <CardSection>
        <Text>{rowData.name}</Text>
        </CardSection>
        </TouchableOpacity>
    )
}
    

    render() {
        const { textStyle } = styles
        return (
            <Card>
            <Header headerText="Welcome!" />
            
            <CardSection>
                <Text style={textStyle}> Friends List: </Text>
                </CardSection>

            <CardSection>
                <ListView
                dataSource={this.state.datasource}
                renderRow={this.renderRow} />
            </CardSection>

            <CardSection>
            <TouchableOpacity>
                    <Text>Invite Friends!</Text>
                    </TouchableOpacity>
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