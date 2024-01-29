import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

function ReviewList({ hotels, hotelId }) {
  const hotel = hotels.find((hotel) => hotel.id === hotelId);

  if (!hotel) {
    return (
      <View>
        <Text style={{ fontWeight: 'bold' }}>Отель не найден</Text>
      </View>
    );
  }

  useEffect(() => {console.log('отзыв');}, [hotel])
  return (
    <View
      style={{ paddingBottom: 10, borderStyle: 'solid', borderColor: 'lightblue', borderBottomWidth: 3 }}
    >
      <Text>
        Отзывы для отеля {"\n"}
        <Text style={{ fontWeight: 'bold' }}>
          {hotel.name}:
        </Text>
        {"\n"}
      </Text>
      {hotel.reviews.map((review, index) => (
        <View key={index}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>
              {index + 1 + '.' + ' '}
            </Text>
            {review.text}
          </Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
            Рейтинг: {review.rating}
          </Text>
        </View>
      ))}
    </View>
  );
}

const mapStateToProps = (state) => ({
  hotels: state.hotels,
});

export default connect(mapStateToProps)(ReviewList);

