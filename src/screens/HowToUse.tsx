import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

// 데이터 
const howData = [
    { id: '1', title: `시너지 사용방법에 대해서 알려드릴게요!`, content: "시너지는 위치를 기반으로 해요 " },
    { id: '2', title: "언제나 쉽게 사용할 수 있어요 ", content: "반갑습니다" },
];

// 데이터를 어떻게 렌더링할건지에 대한 함수
const CardItem = ({ title, content }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.contentStyle}>{content}</Text>
        </View>
    );
};

// 실제 화면에 렌더링
const HowToUse = () => {
    return (
        <FlatList
            data={howData}
            renderItem={({ item }) => <CardItem title={item.title} content={item.content} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    );
};

// 스타일
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 10,
        marginHorizontal:30,
        //marginBottom:100,
        marginVertical:100
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 10,
        width: Dimensions.get('window').width * 0.8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    titleStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    contentStyle: {
        fontSize: 14,
        color: '#666',
        padding:50
    },
});

export default HowToUse;
