import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
//import { REACT_NATIVE_APP_SERVICE_KEY } from "@env"; 

const Home = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await axios.get(
                    "https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=gqHZ5yu%2BB6jXttqafw6lgOrR3G8NoH%2B10H%2BFB2SkhGl948SP4EoO4js4m2ozWMIqreLdiPUa20k189Va7KHpNA%3D%3D&numOfRows=10&pageNo=3&MobileOS=AND&MobileApp=Synergy&_type=json&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&contentTypeId=39"
                );

                const fetchedItems = response.data.response.body.items.item;
                setItems(fetchedItems);
            } catch (error) {
                console.error("API 요청 오류:", error);
                setError(error);
            }
        };

        fetchApiData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {item.firstimage ? (
                <Image source={{ uri: item.firstimage }} style={styles.image} />
            ) : (
                <View style={styles.iconContainer}>
                    <FontAwesome name="file-image-o" size={50} color="#ccc" />
                </View>
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.address}>{item.addr1}</Text>
                <Text style={styles.phone}>{item.tel}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.pageTitle}>주변 맛집</Text>
                {error && <Text style={styles.errorText}>데이터를 불러오는 중 오류가 발생했습니다.</Text>}
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.contentid.toString()}
                contentContainerStyle={{ paddingBottom: 20 }} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    pageTitle: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black",
    },
    itemContainer: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 2, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    iconContainer: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    address: {
        fontSize: 14,
        color: "#666",
        marginVertical: 5,
    },
    distance: {
        fontSize: 12,
        color: "#999",
    },
    phone: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20, 
    },
});

export default Home;
