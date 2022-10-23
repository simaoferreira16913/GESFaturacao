import React from "react";
import { Text, View, StyleSheet,Dimensions ,TouchableOpacity,Modal,FlatList} from "react-native";


const SelectBox = ({options, onChangeSelect, text}) =>{
    const [txt, setTxt] = useState(text);
    return
    <View>
    <TouchableOpacity style={styles.container}>
        <Text style={styles.txt} numberOfLines={1}>{txt}</Text>

    </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 12,
        marginHorizontal: 20,
        borderRadius: 8,
        fontSize: 18,
        borderColor: '#CCC',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent: 'space-between',

    },
    txt:{
        color: '#555',
        fontSize: 16,

    }
})