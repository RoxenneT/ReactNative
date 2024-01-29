import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';

function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const loadingAnimColor = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    if (username && password) {
      const user = { username, password };
      props.setUser(user);
      setLoading(true);
      animatedImg()
      setTimeout(() => {
        setLoading(false);
        props.onLogin();
      }, 2000);
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  };

  const animatedImg = () => {
    Animated.sequence([
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start(),
      Animated.timing(loadingAnimColor, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start(),
    ])

  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
      }}
    >
      {loading ? (
        <Animated.View
          style={{
            transform: [
              {
                rotate: loadingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }
            ],
            width: 60,
            height: 60,
            backgroundColor: loadingAnimColor.interpolate({
              inputRange: [0, 1],
              outputRange: ['cornflowerblue', 'pink']
            })
            ,
            borderRadius: 44 / 2
          }}
        >
        </Animated.View>
      ) : props.loggedIn ? (
        <Text>Добро пожаловать!</Text>
      ) : (
        <>
          <Image
            source={{
              uri: 'https://freepngimg.com/save/33386-hotel-clipart/492x369'
            }}
            style={{
              height: 200,
              width: 200
            }}
          />
          <View>
            <TextInput
              placeholder="Имя пользователя"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={{
                width: 400,
                height: 50,
                fontSize: 18,
                paddingHorizontal: 10
              }}
            />
            <TextInput
              placeholder="Пароль"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: 400,
                height: 50,
                fontSize: 18,
                paddingHorizontal: 10
              }}
            />
            <Button
              title="Войти"
              onPress={handleLogin}
              style={{
                fontSize: 18,
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = {
  setUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
