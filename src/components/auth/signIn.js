import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import styles from '../../styles';
import { firebaseApp } from './authentication';

export default class SignIn extends React.Component {
    state = {
            email: '',
            password: '',
            result: ''
    }

    signIn() {
        let { email, password } = this.state;

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log('error:', error);
                this.setState({result: error.message});
            })
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                console.log('user', user);
                this.props.navigator.push({name: 'topics'});
                //navigate to our main application page.
            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.feedback}>{this.state.result}</Text>
                <TextInput 
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput 
                    placeholder='Password'
                    style={styles.input}
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => this.signIn()}
                >
                    <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.links}>
                    <TouchableOpacity>
                        <Text style={styles.link}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={
                            () => {
                                this.props.navigator.push({name: 'signUp'})
                            }}
                    >
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
