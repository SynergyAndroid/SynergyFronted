import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text, Touchable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const WelcomeScreen=() => {
    const navigation=useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text>계정이 이미 있으세요?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                <Text>회원가입하실래요?</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        margin:"auto",
    }


});

export default WelcomeScreen;