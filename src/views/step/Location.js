import React, {Component} from 'react';
import {
  PermissionsAndroid,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  StyleService,
  useStyleSheet,
  Text,
  Button,
  useTheme,
} from '@ui-kitten/components';
import {Container, ModalAlert, MyText} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker, Circle} from 'react-native-maps';
import {checkLocationDifference} from '../../helpers/locationDifference';
import {TakeScreen} from '../student';

let markers = [];
class Location extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    loading: false,
    isVisibleModal: false,
    isMatch: false,
    locationDistance: 0,
  };

  goToCamera = () => {
    // get state for use in other steps
    this.props.navigation.navigate('camera');
  };

  /*   goBack = () => {
    console.log('from step2');

    this.props.back();
  }; */

  hasLocationPermission = async () => {
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

  getLocation = async () => {
    const checkLocationPermission = await this.hasLocationPermission();

    if (!checkLocationPermission) {
      return;
    }

    this.setState({loading: true});
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
        });
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // check check for location distance
        const routeParam = this.props.route.params;
        const lectureHall = routeParam.lectureLocation;
        const distance = checkLocationDifference(userLocation, {
          lat: lectureHall.lat,
          lng: lectureHall.lng,
        });
        this.setState({locationDistance: distance});
      },
      (error) => {
        this.setState({loading: false, isVisibleModal: true});
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

  componentWillMount() {
    this.getLocation();
  }
  render() {
    const routeParam = this.props.route.params;
    const lectureHall = routeParam;
    const {longitude, latitude, locationDistance, loading} = this.state;
    const {user} = this.props.store;
    markers = [
      {
        latlng: {
          latitude: latitude,
          longitude: longitude,
        },
        title: user.name,
        description: 'Dolor sit sint exercitation reprehenderit magna.',
        pinColor: '#4B9CFB',
      },
      {
        latlng: {latitude: lectureHall.lat, longitude: lectureHall.lng},
        title: 'Lecture Hall',
        description: 'Dolor sit sint exercitation reprehenderit magna.',
        pinColor: '#00BA4A',
      },
    ];

    return (
      <TakeScreen>
        <Container customStyle={styles.welcomeNote}>
          <MyText customStyle={styles.boldText}>
            Nice!
            <MyText customStyle={styles.normalText}>
              We need your location.
            </MyText>
          </MyText>
          <MyText customStyle={styles.subtitleText}>
            to ensure you're reaaly in class kindly activate location setting to
            be sure you're within 30 meters of the Lecturer
          </MyText>
        </Container>
        <Container customStyle={styles.map}>
          {loading && latitude <= 0 && longitude <= 0 ? (
            <>
              <ActivityIndicator animating size="small" />
              <Text>Getting Location</Text>
            </>
          ) : (
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: 6.5191271,
                longitude: 3.3705135,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              provider="google"
              mapType="terrain">
              {/*  <Circle
              // center={{latitude: lectureHall.lat, longitude: lectureHall.lng}}
                center={markers[1].latlng}
                radius={20}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
                // fillColor={theme['color-primary-200']}
              /> */}
              {markers.map((item, key) => (
                /*  <Marker
                  // coordinate={{latitude: 6.5205902, longitude: 3.3745945}}
                  coordinate={item.latlng}
                  title={item.title}
                  description={item.description}
                  pinColor={item.pinColor}
                  key={key}
                /> */
                <>
                  <MyText>{item.latlng.latitude}</MyText>
                  <MyText>{item.latlng.longitude}</MyText>
                </>
              ))}
            </MapView>
          )}
        </Container>
        <Container customStyle={{marginTop: 10, marginBottom: 10}}>
          {loading ? (
            <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center'}}>
              Hang on a sec while we get and match Location
            </Text>
          ) : (
            <Text style={{marginBottom: 5, marginTop: 5, textAlign: 'center'}}>
              {locationDistance < 20
                ? 'Yeah !!! your location match click next to continue'
                : `You're to far from the Lecture room,Move to the Lecture room then try again`}
            </Text>
          )}
          <Button
            onPress={this.goToCamera}
            style={{width: '100%'}}
            //disabled={locationDistance < 20 ? false : true}
          >
            Next
          </Button>
        </Container>
        {/*  <ModalAlert
                warn
                isVisible={state.isVisibleModal}
                closeModal={() => this.setState({isVisibleModal: false })}
                message="You've signed in for Compiler Construction successfully"
                subtitle="Ensure that you signout when the class is over, so your attendance is marked"
                btnText="Close"
              /> */}
      </TakeScreen>
    );
  }
}

export default inject('store')(observer(Location));
// export default Location;
const styles = StyleService.create({
  welcomeNote: {
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginTop: hp('5%'),
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
    borderColor: '#00BA4A',
    borderRadius: 5,
    borderWidth: 1,
    // paddingLeft: '9%',
    // paddingRight: '9%',
    marginTop: hp('2%'),
    height: hp('55%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
});
