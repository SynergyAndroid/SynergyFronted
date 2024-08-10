/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface TourItem {
  title: string;
  addr1: string;
}

const DataList: React.FC = () => {
  const [tourData, setTourData] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get(
          'http://apis.data.go.kr/B551011/KorService1',
          {
            params: {
              numOfRows: 10,
              pageNo: 1,
              MobileOS: 'AND',
              MobileApp: 'synergy',
              _type: 'json',
              listYN: 'Y',
              contentTypeId: 39,
              serviceKey: 'gqHZ5yu%2BB6jXttqafw6lgOrR3G8NoH%2B10H%2BFB2SkhGl948SP4EoO4js4m2ozWMIqreLdiPUa20k189Va7KHpNA%3D%3D'
            }
          }
        );
        
        if (response.data.response.header.resultCode === '0000') {
          setTourData(response.data.response.body.items.item);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>로딩 중...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderItem = ({ item }: { item: TourItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.address}>{item.addr1}</Text>
    </View>
  );

  return (
    <FlatList
      data={tourData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
  },
});

export default DataList;
*/