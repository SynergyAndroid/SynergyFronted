import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
    const navigation = useNavigation();

    const handleApiPress = () => {
        navigation.navigate("ApiPracitce");  
    };

    return (
        <View>
            <Text>
                1대 1 채팅방이얌 
            </Text>
            <Button 
                onPress={handleApiPress} 
                title="Go to API Practice"  
            />
        </View>
    );
}

export default Chat;
