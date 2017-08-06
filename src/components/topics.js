import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from '../styles';
import { firebaseApp } from './auth/authentication';

class Topics extends React.Component {
    state = {
        displayName: ''
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
            })
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
                <View style={styles.body}></View>
                <Text>Topics</Text>
            </View>
        );
    }
}

export default Topics;