import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateUsername } from '../actions/userActions';

function ProfileScreen(props) {
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(props.user.username);

    const handleSave = () => {
        props.updateUsername(newUsername);
        setEditing(false);
    };

    return (
        <View style={styles.list}>
            {editing ? (
                <>
                    <TextInput
                        placeholder="Введите имя"
                        value={newUsername}
                        onChangeText={(text) => setNewUsername(text)}
                    />
                    <Button title="Save" onPress={handleSave} />
                </>
            ) : (
                <>
                    <Text style={styles.boldText}>Имя пользователя: <Text style={{color: '#38598b'}}>{props.user.username}</Text></Text>
                    <Button title="Изменить имя" onPress={() => setEditing(true)} />
                </>
            )}

            <Text style={styles.boldText}>Избранные отели:</Text>
            <FlatList
                data={props.favoriteHotels}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 20, borderStyle: 'solid', borderColor: 'lightblue', borderWidth: 1}}>
                        
                            <Text style={styles.boldText}>Название:</Text>
                            <Text>{item.name}</Text>                       
                            <Text style={styles.boldText}>Адрес:</Text>
                            <Text>{item.address}</Text>
                            <Text style={styles.boldText}>Цена за ночь:</Text>
                            <Text style={styles.boldText}>{item.averageCost}</Text>
                            <Text style={styles.boldText}>Рейтинг:</Text>
                            <Text>{item.stars}</Text>
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
        marginHorizontal: 5,
        marginBottom: 10,
        marginTop: 10,
        gap: 10, 
    },
    boldText: {
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state) => ({
    user: state.user,
    favoriteHotels: state.hotels.filter((hotel) => hotel.isFavorite),
});

const mapDispatchToProps = {
    updateUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
