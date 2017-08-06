import React from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';

import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import Topics from './components/topics';
import ChooseName from './components/auth/chooseName';

const routes = {
    signIn: SignIn,
    signUp: SignUp,
    topics: Topics,
    chooseName: ChooseName
}

class Main extends React.Component {
    renderScene(route, navigator){
        let Component = routes[route.name];
        return <Component route={route} navigator={navigator} />
    }

    render() {
        return(
            <Navigator 
                initialRoute={ {name: 'signIn'} }
                renderScene={this.renderScene}
            />
        )
        
    }
}

export default Main;