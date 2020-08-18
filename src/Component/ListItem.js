import React, { useState } from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import EditIcon from "react-native-vector-icons/FontAwesome";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import PlusIcon from "react-native-vector-icons/FontAwesome5";
import firebase from "firebase";
import {CardSection} from "./common";

const ListItem = ({listItem}) => {

    const [editItem, setEditItem] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const {item, uid} = listItem;

    function onEdit(){
        setEditItem(item);
        setIsEdit(true)
    }

    function onConfirm(){
        firebase.database().ref(`/list/${uid}`).update({item: editItem})
            .then(() => setIsEdit(false))
    }

    function onDelete(){
        firebase.database().ref(`/list/${uid}`).remove();
    }

    return(
        <View style={styles.containerStyle}>
            {console.log(item)}
            <CardSection style={styles.cardStyle}>
                {isEdit
                    ? <TextInput 
                            style={styles.textInputStyle} 
                            value={editItem} 
                            onChangeText={(text) => setEditItem(text)}   
                      />
                    : <Text style={styles.textStyle}>{item}</Text>
                }

                
                    {isEdit
                        ?   <TouchableOpacity onPress={() => onConfirm()}>
                                <PlusIcon style={styles.IconStyle} name="plus" size={30} />
                            </TouchableOpacity>
                        :   <TouchableOpacity onPress={() => onEdit()}>
                                <EditIcon style={styles.IconStyle} name="edit" size={30} />
                            </TouchableOpacity>
                    }
                
                
                <TouchableOpacity onPress={() => onDelete()}>
                    <DeleteIcon style={styles.IconStyle} name="delete" size={30} />
                </TouchableOpacity>
            </CardSection>
        </View>
    )
}

const styles={
    textStyle: {
        fontSize: 18,
        paddingVertical: 5,
        paddingLeft: 5,
        flex: 1
    },
    containerStyle: {
        marginBottom: 5
    },
    cardStyle: {
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    IconStyle: {
        alignSelf: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    textInputStyle: {
        flex: 1,
        fontSize: 18
    }
}

export default ListItem;