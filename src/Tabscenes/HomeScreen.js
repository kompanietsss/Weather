import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { w, h } from '../helpers/misc';
import { DISABLEBLUE, BLUE } from '../helpers/constants';
// import { Button } from "react-native-elements";
import { Fonts } from '../helpers/Fonts';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import ButtonsContainer from '../components/ButtonsContainer';

Geocoder.init("AIzaSyBp1ji1NIQ0uAG0t2HquFS8x0Th424oRUU");
const WEATHER_API_KEY = "2d4c8085818244f0fa6c8a44bb6cbac8"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

      latitude: 0,
      longitude: 0,
      error: null,
      address: "",
      cel: null,
      isShowLocation: true,
      forceRefresh: true

    }

  }

  componentDidMount = () => {
    this.getGeo()
  }

  getGeo = () => {
    Geolocation.getCurrentPosition(position => {

      this.getPlace(position.coords.latitude, position.coords.longitude)

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => this.getWeather())
    }, error => this.setState({ error: error.messages }))
  }

  getPlace = (latitude, longitude) => {
    Geocoder.from({
      latitude,
      longitude
    }).then(json => {
      const address = json.results[0].formatted_address;
      // console.log(location)
      this.setState({ address })
    })
      .catch(error => console.warn(error));
  }

  getWeather = async () => {
    const { latitude, longitude } = this.state
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await api_call.json();

      this.setState({ cel: data.main.temp })
    } catch (error) {
      console.log(error)
    }

  }

  refreshMapHandler = () => {

    if (this.state.isShowLocation == true) {
      this.setState({
        isShowLocation: false,
        forceRefresh: Math.floor(Math.random() * 100)
      })
    }
    else {
      this.setState({
        isShowLocation: true,
        forceRefresh: Math.floor(Math.random() * 100)
      })
    }
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <MapView
          // ref={ref => {
          //   this.map = ref;
          // }}
          // provider={this.props.provider}
          key={this.state.forceRefresh}
          onLongPress={e => {
            const { latitude, longitude } = e.nativeEvent.coordinate
            this.getPlace(latitude, longitude)
            this.setState({ latitude, longitude })
          }}
          showsUserLocation={this.state.isShowLocation}
          followsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            longitudeDelta: 0.015,
            latitudeDelta: 0.0121
          }}

        >
          <Marker
            coordinate={this.state}
            title={this.state.address}
            description={`${Math.round(this.state.cel).toString()}°`}
            onPress={(e) => this.getWeather()}
            onCalloutPress={e => console.log("hello")}


          />
        </MapView>

        <View style={{ position: "absolute", width: "100%", alignItems: "center", top: (2 * h) / 100 }}>
          <Text style={{ fontFamily: Fonts.MontSerratBold, fontSize: (4 * w) / 100, color: BLUE }}>{"location".toUpperCase()}</Text>
        </View>

        <ButtonsContainer props={this.props} refreshMapHandler={() => {
          this.refreshMapHandler()
          this.getGeo()
        }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill
  },

  map: {

    ...StyleSheet.absoluteFill
  },
});

// this.props.navigation.navigate('Details', {
//   itemId: 86,
//   otherParam: 'anything you want here',
// });