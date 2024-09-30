import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import axios from "axios";

const ApiPractice = () => {
    const [dataResponse, setDataResponse] = useState(null); // 초기값 null
    const [error, setError] = useState(null);

    useEffect(() => {
        const ComeApiData = async () => {
            try {
                const response = await axios.get(
                    "https://apis.data.go.kr/B551011/KorWithService1/locationBasedList1?serviceKey=gqHZ5yu%2BB6jXttqafw6lgOrR3G8NoH%2B10H%2BFB2SkhGl948SP4EoO4js4m2ozWMIqreLdiPUa20k189Va7KHpNA%3D%3D&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=AppTest&listYN=Y&arrange=A&mapX=126.981611&mapY=37.568477&radius=1000&_type=json"
                );

                setDataResponse(response.data); // 전체 데이터 저장
            } catch (error) {
                setError(error);
            }
        };
        ComeApiData();
    }, []);

    return (
        <ScrollView>
            {error ? (
                <Text>에러 발생: {error.message}</Text>
            ) : (
                <View>
                    {dataResponse ? (
                        <View>
                            <Text>전체 데이터:</Text>
                            <Text>{JSON.stringify(dataResponse, null, 2)}</Text> 
                        </View>
                    ) : (
                        <Text>데이터를 불러오는 중...</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

export default ApiPractice;
