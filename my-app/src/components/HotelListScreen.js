import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setFavorite, removeFavorite } from '../actions/hotelActions';
import { useNavigation } from '@react-navigation/native';

function HotelListScreen(props) {
  const { hotels, setFavorite, removeFavorite } = props;
  const navigation = useNavigation();
  const [priceFilter, setPriceFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [titleName, setTitleName] = useState(Array(hotels.length).fill('Добавить в избранное'));;

  const flatListRef = useRef(null);
  const displayedItemsCount = useRef(5);

  function convertStarsToNumber(stars) {
    return stars.length;
  }

  const applyFilters = () => {
    let filtered = hotels;
    if (priceFilter) {
      filtered = filtered.filter((hotel) =>
        hotel.averageCost.toString().includes(priceFilter)
      );
    }
    if (addressFilter) {
      filtered = filtered.filter((hotel) =>
        hotel.address.toLowerCase().includes(addressFilter.toLowerCase())
      );
    }
    if (ratingFilter) {
      filtered = filtered.filter((hotel) =>
        convertStarsToNumber(hotel.stars) === parseInt(ratingFilter, 6)
      );
    }

    displayedItemsCount.current = 5;
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    setTitleName(Array(filtered.length).fill('Добавить в избранное'));
    setFilteredHotels(filtered);
  };

  const loadMoreData = () => {
    const newCount = displayedItemsCount.current + 5;
    if (newCount <= filteredHotels.length) {
      displayedItemsCount.current = newCount;
      setTitleName((prevTitleName) => {
        const newTitleName = [...prevTitleName];
        for (let i = displayedItemsCount.current - 5; i < displayedItemsCount.current; i++) {
          newTitleName[i] = 'Добавить в избранное';
        }
        return newTitleName;
      });
    }
  };

  useEffect(() => {
    applyFilters();
  }, [priceFilter, addressFilter, ratingFilter]);

  const handleToggleFavorite = (id, index) => {
    const isFavorite = !props.hotels.find((hotel) => hotel.id === id).isFavorite;
    setFavorite(id, isFavorite);

    setTitleName((prevTitleName) => {
      const newTitleName = [...prevTitleName];
      newTitleName[index] = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';
      return newTitleName;
    });
  }

  return (
    <View style={{ marginHorizontal: 5, }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Найдите отель, который понравится именно Вам
      </Text>
      <TextInput
        placeholder="Фильтр по цене"
        value={priceFilter}
        onChangeText={(text) => setPriceFilter(text)}
      />
      <TextInput
        placeholder="Фильтр по адресу"
        value={addressFilter}
        onChangeText={(text) => setAddressFilter(text)}
      />
      <TextInput
        placeholder="Фильтр по рейтингу"
        value={ratingFilter}
        onChangeText={(text) => setRatingFilter(text)}
      />
      <FlatList
        ref={flatListRef}
        data={filteredHotels.slice(0, displayedItemsCount.current)}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={styles.list}
          >
            <Image style={{ width: '100%', height: 200 }} source={{ uri: item.img }} />
            <Text>
              <Text style={styles.boldText}>Название:{"\n"}</Text>
              {item.name}
            </Text>
            <Text>
              <Text style={styles.boldText}>Адрес:{"\n"}</Text>
              {item.address}
            </Text>
            <Text>
              <Text style={styles.boldText}>Цена за ночь:{"\n"}</Text>
              {item.averageCost}
            </Text>
            <Text>
              <Text style={styles.boldText}>Рейтинг:{"\n"}</Text>
              {item.stars}
            </Text>
            <Button
              title={titleName[index]}
              onPress={() => handleToggleFavorite(item.id, index)}
            />
            <Button
              title="Посмотреть детали"
              onPress={() => {
                navigation.navigate('Подробнее об отеле', { hotel: item });
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    gap: 3
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  hotels: state.hotels,
});

const mapDispatchToProps = { setFavorite, removeFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(HotelListScreen);
