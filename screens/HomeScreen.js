import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import BrtList from '../components/BrtList';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import ListItem from 'react-native-elements';
import IconE from 'react-native-elements';

var posts = [
  {
    id: '1',
    name: 'Joe McKay',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.jpeg'),
    image: require('../assets/tempImage1.jpeg'),
  },
  {
    id: '2',
    name: 'Karyn Kim',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.jpeg'),
    image: require('../assets/tempImage2.jpeg'),
  },
  {
    id: '3',
    name: 'Emerson Parsons',
    text: 'Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.',
    timestamp: 1569109273726,
    avatar: require('../assets/tempAvatar.jpeg'),
    image: require('../assets/tempImage3.jpeg'),
  },
];

export default class HomeScreen extends React.Component {
  state = {
    datos: [],
    error: null,
    data: [],
    brtBus: {
      coordenadas: [],
    },
    user: {
      name: '',
    },
    icon: {
      name: 'bus',
    },
  };
  unSubscribe = null;

  constructor(props) {
    super(props);
    this.getAllBuss = this.getAllBuss.bind(this);
    this.getBusses = this.getBusses.bind(this);
  }
  getUser = async () => {
    // Get user document with a given ID
    const userDocument = firestore()
      .collection('users')
      .doc('qRTa8viYbawGtIgTlIbM')
      .get();
    console.log(userDocument);
  };

  componentDidMount() {
    database()
      .ref('Datos')
      .on('value', value => {
        this.setState({
          datos: [value.val()],
        });
      });
  }

  async getAllBuss() {
    try {
      this.unSubscribe = await firestore()
        .collection('brtBuses')
        .onSnapshot(doc => {
          this.setState({
            data: doc._docs,
          });
        });
    } catch (error) {
      // load spinner
      this.setState({
        error: error,
      });
    }
  }

  getBusses() {
    try {
      database()
        .ref('Datos')
        .on('value', val => {
          let data = val.val() ? val.val() : {};
          let items = {...data};
          this.setState({
            datos: 'asdasda',
          });
        });

      console.log('state');
      console.log(this.state);
    } catch (err) {
      console.log('error en callback');
      console.log(err);
    }
  }

  renderPost = item => {
    if (item.PASAJEROS.totalPer >= item.BUS.capacidad) {
      // asiento no disponible
      // color rojo
      return (
        <View style={styles.feedItem}>
          <Icon name="bus" style={styles.icon} />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.nombreBus}>{item.BUS.nomBus}</Text>
                <Text style={styles.asientosRojo}>Asientos no disponibles</Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (
      item.PASAJEROS.totalPer < item.BUS.capacidad &&
      item.PASAJEROS.totalPer > 40
    ) {
      // asiento disponible y cantidad de asientos
      // color amarillo
      let asiento = item.BUS.capacidad - item.PASAJEROS.totalPer;
      let info = 'Asientos disponibles: ' + asiento;

      return (
        <View style={styles.feedItem}>
          <Icon name="bus" style={styles.icon} />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.nombreBus}>{item.BUS.nomBus}</Text>
                <Text style={styles.asientosAmarillo}>{info}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      // asiento disponible y cantidad de asientos
      // color verde
      let asiento = item.BUS.capacidad - item.PASAJEROS.totalPer;
      let info = 'Asientos disponibles: ' + asiento;
      console.log(info);
      return (
        <View style={styles.feedItem}>
          <Icon name="bus" style={styles.icon} />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.nombreBus}>{item.BUS.nomBus}</Text>
                <Text style={styles.asientosVerde}>{info}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    //console.log('state');
    console.log('HomeScreen.js');
    console.log(this.state.datos);
    return (
      <View>
        <Header />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -17.783722,
            longitude: -63.181204,
            latitudeDelta: 0.025,
            longitudeDelta: 0.0221,
          }}>
          {this.state.datos.map(item => (
            <Marker
              coordinate={{
                latitude: item.GPS.Latitud,
                longitude: item.GPS.Longitud,
              }}
              title={item.BUS.nomBus}>
              <Icon name="bus" color={item.BUS.iconColor} size={22} />
            </Marker>
          ))}
        </MapView>
        <View style={styles.header}>
          <Text style={styles.text}>BRT Buses</Text>
        </View>
        <View style={styles.container} showsVerticalScrollIndicator={false}>
          {/* {this.state.datos.map((item, i) => (
            <BrtList
              data={item.PASAJEROS}
              buss={item.BUS}
              title={item.BUS.nomBus}
              leftIcon={{name: 'direction-bus', color: item.BUS.iconColor}}
            />
          ))} */}
          {/* {this.state.datos.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Hola</ListItem.Title>
                <ListItem.Subtitle>Hola</ListItem.Subtitle>
              </ListItem.Content>
              <IconE name="direction-bus" />
            </ListItem>
          ))} */}
          <FlatList
            style={styles.lista}
            vertical
            data={this.state.datos}
            renderItem={({item}) => this.renderPost(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#14213d',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#857C8D',
    shadowColor: '#29262C',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  container: {
    backgroundColor: '#99c1de',
    height: 250,
  },
  map: {
    height: '50%',
  },
  text: {
    paddingTop: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  feedItem: {
    backgroundColor: '#bcd4e6',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 8,
  },
  icon: {
    fontSize: 22,
    width: 22,
    height: 22,
    borderRadius: 18,
    marginRight: 15,
    alignSelf: 'center',
  },
  nombreBus: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  asientosVerde: {
    fontSize: 12,
    fontWeight: '500',
    color: 'green',
    marginTop: 5,
  },
  asientosRojo: {
    fontSize: 12,
    fontWeight: '500',
    color: 'red',
    marginTop: 5,
  },
  asientosAmarillo: {
    fontSize: 12,
    fontWeight: '500',
    color: 'yellow',
    marginTop: 5,
  },
});
