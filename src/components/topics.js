import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ListView
} from 'react-native';

import styles from '../styles';
import { firebaseApp, topicsRef } from './auth/authentication';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2});

class Topics extends React.Component {
    state = {
        displayName: '',
        title: '',
        dataSource: ds.cloneWithRows([{
            title: 'Why is the sky blue?',
            author: 'grean'
        }])
    }

    componentDidMount(){
        let user =firebaseApp.auth().currentUser;
        if(!user.displayName){
            this.props.navigator.push({
                name: 'chooseName'
            })
        } else {
            //proceed normally with application
            this.setState({
                displayName: user.displayName
            });

            this.listenForItems(topicsRef);
        }
    }

    signOut() {
        // sign out the user
        firebaseApp.auth().signOut()
            .then(() => {
                // Sign out successful
                this.props.navigator.popToTop();
            }, error => {
                console.log(error);
            })
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <Text style={styles.rowTitle}>
                    {rowData.title}
                </Text>
                <Text>
                    {rowData.author}
                </Text>
            </View>
        )
    }

    listenForItems(ref) {
        ref.on('value', snap => {
            let topics = [];
            snap.forEach(topic => {
                topics.push({
                    title: topic.val().title,
                    author: topic.val().author
                });
            });
            this.setState({dataSource: ds.cloneWithRows(topics)});
        })
    }

    render() {
        return(
            <View style={styles.topics}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.signOut()}
                    >
                        <Text style={styles.link}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {this.state.displayName}
                    </Text>
                </View>
                <View style={styles.body}>
                    <TextInput 
                        placeholder="Something on your mind?"
                        style={styles.input}
                        onChangeText={text => this.setState({title: text})}
                    />
                    <ListView
                        style={styles.list}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={rowData => this.renderRow(rowData)}
                    />
                </View>
            </View>
        );
    }
}

export default Topics;