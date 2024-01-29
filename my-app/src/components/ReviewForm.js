import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Rating from './Rating';

function ReviewForm(props) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

    const handleAddReview = () => {
      props.addReview({ text: review, rating });
      setReview('');
      setRating(0);
      alert('Спасибо, Ваш отзыв обрабатывается, зайдите позже PS: я сдалась')
    };

  return (
    <View style={{ paddingBottom: 10, borderStyle: 'solid', borderColor: 'lightblue', borderBottomWidth: 3 }}>
      <Text style={{ fontWeight: 'bold' }}>Оставьте отзыв:</Text>
      <TextInput
        style={{
          height: 40,
          fontSize: 15,
        }}
        placeholder="Ваш отзыв"
        value={review}
        onChangeText={(text) => setReview(text)}
      />
      <Rating initialValue={rating} onRatingChange={setRating} />
      <Button title="Добавить отзыв" onPress={handleAddReview} />
    </View>
  );
}

export default ReviewForm;
