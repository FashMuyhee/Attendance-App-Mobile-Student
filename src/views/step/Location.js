/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, ToastAndroid, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StyleService, useStyleSheet, Text, Button} from '@ui-kitten/components';
import {Container} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker, Circle} from 'react-native-maps';

const Location = ({next, getState, back}) => {
  const styles = useStyleSheet(themedStyles);
  const [state, setState] = useState({
    location: {},
    loading: false,
  });

  const checkLocation = () => {
    // get state for use in other steps
    next();
  };

  const goBack = () => {
    console.log('from step2');

    back();
  };
  console.log(getState('location'));

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const checkLocationPermission = await hasLocationPermission();

    if (!checkLocationPermission) {
      return;
    }

    setState({...state, loading: true});
    Geolocation.getCurrentPosition(
      (position) => {
        setState({...state, location: position, loading: false});
      },
      (error) => {
        setState({...state, loading: false});
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };
  useEffect(() => {
    // get user location
    // getLocation();
  });
  const multistate = getState();
  const lectureHall = multistate.lectureLocation;

  const markers = [
    {
      latlng: {latitude: state.location.lat, longitude: state.location.lng},
      description: 'User Name',
    },
    {
      latlng: {latitude: lectureHall.lat, longitude: lectureHall.lng},
      description: 'Lecture Hall',
    },
  ];
  console.log(markers);
  return (
    <>
      <Container customStyle={styles.welcomeNote}>
        <Text style={styles.boldText}>
          Nice! <Text style={styles.normalText}>We need your location.</Text>
        </Text>
        <Text appearance="hint" style={styles.subtitleText}>
          to ensure you're reaaly in class kindly activate location setting to
          be sure you're within 30 meters of the Lecturer
        </Text>
      </Container>
      <Container customStyle={styles.map}>
        <MapView
          style={styles.mapView}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Circle
            key={(
              markers[0].latlng.latitude + markers[0].latlng.longitude
            ).toString()}
            center={markers[1].latlng}
            radius={90}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
            fillColor={'rgba(230,238,255,0.5)'}
          />
          {markers.map((marker) => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <Button
          onPress={checkLocation}
          style={{bottom: 0, position: 'absolute', width: '100%'}}>
          Next
        </Button>
      </Container>
    </>
  );
};

// export default inject('themeStore')(observer(Location));
export default Location;
const themedStyles = StyleService.create({
  welcomeNote: {
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginTop: hp('10%'),
    paddingLeft: '9%',
    paddingRight: '9%',
    height: hp('12%'),
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  normalText: {
    fontSize: hp('3%'),
  },
  subtitleText: {
    fontSize: hp('2%'),
  },
  map: {
    display: 'flex',
    borderColor: 'yellow',
    borderWidth: 1,
    paddingLeft: '9%',
    paddingRight: '9%',
    marginTop: hp('8%'),
    height: hp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
});
