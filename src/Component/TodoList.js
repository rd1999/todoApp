import _ from "lodash";
import React, { Component } from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList} from "react-native";
import firebase from "firebase";
import PlusIcon from "react-native-vector-icons/FontAwesome5";
import {CardSection} from "./common";
import ListItem from "./ListItem";

class TodoList extends Component{

    state = {
        item: '',
        list: {}
    }

    componentWillMount(){
        firebase.database().ref('/list')
            .on('value', snapshot => {
                this.setState({list: snapshot.val()})
            })
    }

    onIconPressed = () => {
        const item = this.state.item;
        firebase.database().ref('/list')
            .push({item});
        this.setState({item: ''});
    }

    fetchData = () => {

        const listArray = _.map(this.state.list, (val, uid) => {
            return {...val, uid}
        })

        return(
            <FlatList 
                data={listArray}
                keyExtractor={(listItem) => listItem.uid}
                renderItem={({item}) => <ListItem listItem={item} />}
            />
        )
    }

    renderIcon = () => {
        if(this.state.item !== ''){
            return(
                <TouchableOpacity onPress={() => this.onIconPressed()}>
                    <PlusIcon style={styles.IconStyle} name="plus" size={30} />
                </TouchableOpacity>
            )
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.headerStyle}>Todo List</Text>
                <CardSection style={styles.CardStyle}>
                    <TextInput 
                        onChangeText={text => this.setState({item: text})}
                        value={this.state.item}
                        placeholder="Enter item"
                        style={styles.textInputStyle}
                    />
                    {this.renderIcon()}
                </CardSection>
                {this.fetchData()}
            </View>
        )
    }

}

const styles={
    headerStyle: {
        alignSelf: 'center',
        paddingTop: 100,
        paddingBottom: 30,
        fontSize: 40,
        fontWeight: 'bold'
    },
    CardStyle: {
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: '#dddddd',
        marginBottom: 50
    },
    textInputStyle: {
        fontSize: 18,
        flex: 1
    },
    IconStyle: {
        paddingRight: 10,
        paddingTop: 6
    }
}

export default TodoList;