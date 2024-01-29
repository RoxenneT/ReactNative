import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Rating({ initialValue, onRatingChange }) {
  const [rating, setRating] = useState(initialValue);

  const stars = [1, 2, 3, 4, 5];

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Поставьте рейтинг:</Text>
      <View style={{ flexDirection: 'row' }}>
        {stars.map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Text style={{ fontSize: 25 }}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Rating;
