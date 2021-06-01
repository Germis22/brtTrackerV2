/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, ColorPropType} from 'react-native';
import Icon from '@ui-kitten/components';

export const BrtList2 = props => {
  console.log('BrtList2.js');
  console.log(props);
  if (props.data.totalPer >= props.buss.capacidad) {
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
              <Text style={styles.nombreBus}>{props.title}</Text>
              <Text style={styles.asientosRojo}>Asientos no disponibles</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (
    props.data.totalPer < props.buss.capacidad &&
    props.data.totalPer > 40
  ) {
    // asiento disponible y cantidad de asientos
    // color amarillo
    let asiento = props.buss.capacidad - props.data.totalPer;
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
              <Text style={styles.nombreBus}>{props.title}</Text>
              <Text style={styles.asientosAmarillo}>{info}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    // asiento disponible y cantidad de asientos
    // color verde
    let asiento = props.buss.capacidad - props.data.totalPer;
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
              <Text style={styles.nombreBus}>{props?.title}</Text>
              <Text style={styles.asientos}>{info}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};
export default BrtList2;

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
