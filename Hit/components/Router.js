import { StackNavigator } from 'react-navigation';
import LogInForm from './LogInForm';
import CreateAccount from '.CreateAccount'


export const LogInForm = StackNavigator({
    CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
            title: "Create Account"
        }
    },

    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            title: "Welcome"
        }
    }
});