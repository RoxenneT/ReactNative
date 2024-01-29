import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Animated } from 'react-native';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

function HotelDetailScreen({ route }) {
  const { hotel } = route.params || {};
  // const reviews = hotel.reviews || [];
  const arrowAnimColor = useRef(new Animated.Value(0)).current;

  const animatedArrow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnimColor, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }).start(),
        Animated.timing(arrowAnimColor, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: false,
        }).start(),
        Animated.timing(arrowAnimColor, {
          toValue: 3,
          duration: 2500,
          useNativeDriver: false,
        }).start()
      ]),
      {
        iterations: 10
      }
    )
  };

  useEffect(() => {
    animatedArrow()
  }, [!hotel])

  if (!hotel) {
    return (
      <View style={{ display: 'flex', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{ fontWeight: 'bold', fontSize: 20, }}
        >
          Сначала выберите отель
        </Text>
        <Animated.Text
          style={{
            fontSize: 80,
            color: arrowAnimColor.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: ['pink', 'violet', 'cornflowerblue', 'darkblue']
            })
          }}
        >
          &larr;
        </Animated.Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.list}>
          <View style={{ paddingBottom: 10, paddingTop: 10, borderStyle: 'solid', borderColor: 'lightblue', borderBottomWidth: 3, borderTopWidth: 3 }}>
            <Image style={{ width: '100%', height: 200 }} source={{ uri: hotel.img }} />
            <Text>
              <Text style={styles.boldText}>Название:{"\n"}</Text>
              {hotel.name}
            </Text>
            <Text>
              <Text style={styles.boldText}>Адрес:{"\n"}</Text>
              {hotel.address}
            </Text>
            <Text>
              <Text style={styles.boldText}>Цена за ночь:{"\n"}</Text>
              {hotel.averageCost}
            </Text>
            <Text>
              <Text style={styles.boldText}>Рейтинг:{"\n"}</Text>
              {hotel.stars}
            </Text>
            <Text>
              <Text style={styles.boldText}>Сервисы:{"\n"}</Text>
              {hotel.description}
            </Text>
          </View>
          <ReviewForm addReview={(review) => hotel.reviews.push(review)} />
          <ReviewList hotelId={hotel.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',

    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    gap: 30
  },
});

export default HotelDetailScreen;

