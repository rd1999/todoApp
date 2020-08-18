import React, { Component } from "react";
import {ScrollView} from "react-native";
import firebase from "firebase";
import TodoList from "./Component/TodoList";

class App extends Component{

    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBsDZlD7mtbBmfXwzysT3XaHeoixhMrlcI",
            authDomain: "todoapp-66013.firebaseapp.com",
            databaseURL: "https://todoapp-66013.firebaseio.com",
            projectId: "todoapp-66013",
            storageBucket: "todoapp-66013.appspot.com",
            messagingSenderId: "175044299518",
            appId: "1:175044299518:web:9edb485aabe84ec55433af",
            measurementId: "G-BKPNSC777Z"
          };
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <TodoList />
            </ScrollView>
        )
    }

}

export default App;