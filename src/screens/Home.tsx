import React from "react";
import { View, Text,StyleSheet} from "react-native";



const Home=() => {
    return (
        <View style={styles.container}>
            <Text>
                시너지에 오신걸 환영합니당
            </Text>
        </View>


    )
}



const styles = StyleSheet.create({
    container:{
        margin:"auto",
    }


});
export default Home;