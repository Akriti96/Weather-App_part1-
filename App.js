import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Bangalore',
      data: [],
      isLoading: true,
      temp: '',
      icon: '',
      city_display: '',
      desc: '',
      main: '',
      humidity: '',
      pressure: '',
      visiblity: '',
    };
    this.fetchWeather();
  }

  fetchWeather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city} &appid=ebd355a4af20d585cc679300add6c2fc`
    )
      .then((response) => {
        response.json().then((json) => {
          this.setState({
            data: json,
            city_display: json.name,
            icon: json.weather[0].icon,
            desc: json.weather[0].description,
            main: json.weather[0].main,
            humidity: json.main.humidity + ' %',
            pressure: json.main.pressure + ' hPa',
            visibility: (json.visibility / 1000).toFixed(2) + ' Km',
            temp: (json.main.temp - 273.15).toFixed(2) + ' °C',
          });
          console.log(this.state.temp);
        });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          isLoading: false,
        });
      });
  };

  // componentDidMount() {
  //   this.fetchWeather();
  // }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://cdn.dribbble.com/users/648922/screenshots/11206395/media/5998f56329eda70b71fecd050032bc21.png',
          }}
          style={styles.Image_Background_Style}>
          <View style={styles.Search_Box_View}>
            <TextInput
              style={styles.Search_Box}
              placeholder={'Enter The City Name'}
              placeholderTextColor={'white'}
              onChangeText={(text) => {
                this.setState({
                  city: text,
                });
              }}
            />
            <TouchableOpacity
              style={styles.button_touch}
              onPress={this.fetchWeather()}>
              <Icon
                name="search"
                type="fontawesome"
                size={25}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Weather_Box_Main}>
            <View style={styles.Weather_Holder_View}>
              <Image
                tintColor="#FFF"
                source={{
                  uri:
                    'http://openweathermap.org/img/wn/' +
                    this.state.icon +
                    '@2x.png',
                }}
                style={styles.Weather_Image}
              />
              <View>
                <Text style={styles.temprature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Info_Box_View}>
            <View style={styles.Info_Holder_Veiw}>
              <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
              <Text style={styles.description_text}>{this.state.desc}</Text>
              <Text style={styles.humidity_text}>
                Humidity : {this.state.humidity}
              </Text>
              <Text style={styles.other_text}>
                Pressure : {this.state.pressure}
              </Text>
              <Text style={styles.other_text}>
                Visibility : {this.state.visibility}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
  },
  Image_Background_Style: {
    height: '100%',
    width: '100%',
  },
  Search_Box_View: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Search_Box: {
    height: '35%',
    width: '80%',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 15,
    color: '#FFF',
    paddingHorizontal: 15,
  },
  button_touch: {
    marginLeft: '5%',
    height: '35%',
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Weather_Box_Main: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Weather_Holder_View: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Weather_Image: {
    height: '80%',
    width: '50%',
  },
  temprature_text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: '5%',
  },
  city_text: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '5%',
    marginTop: '3%',
  },
  Info_Box_View: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Info_Holder_Veiw: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 15,
  },
  Main_Weather_Text: {
    fontSize: 28,
    color: '#464646',
    marginLeft: '8%',
    marginTop: '8%',
    fontWeight: 'bold',
  },
  description_text: {
    fontSize: 20,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '3%',
  },
  humidity_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '5%',
  },
  other_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '2%',
  },
});
