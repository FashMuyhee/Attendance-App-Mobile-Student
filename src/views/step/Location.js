import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StyleService, Text, Button} from '@ui-kitten/components';
import {Container, ModalAlert, MyText, WelcomeNote} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker, Circle} from 'react-native-maps';
import {checkLocationDifference} from '../../helpers/locationDifference';
import {TakeScreen} from '../student';
import hasLocationPermission from '../../helpers/checkLocation';
import {connect} from 'react-redux';
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
  routeParam = this.props.route.params;

  goToCamera = () => {
    // get state for use in other steps
    this.props.navigation.navigate('camera', {
      code: this.routeParam.code,
      type: this.routeParam.type,
    });
  };

  getLocation = async () => {
    const checkLocationPermission = await hasLocationPermission();

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
        const lectureHall = this.props.lectureLoc;
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
    const {longitude, latitude, locationDistance, loading} = this.state;
    const {user, lectureLoc} = this.props;
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
        latlng: {latitude: lectureLoc.lat, longitude: lectureLoc.lng},
        title: 'Lecture Hall',
        description: 'Dolor sit sint exercitation reprehenderit magna.',
        pinColor: '#00BA4A',
      },
    ];

    return (
      <TakeScreen>
        <WelcomeNote
          bold="Nice"
          normal="We need your location."
          subtitle="to ensure you're really in class kindly activate location setting to
          be sure you're within 30 meters of the Lecturer"
        />
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
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              provider="google"
              showsCompass
              mapType="standard">
              <Circle
                center={markers[1].latlng}
                radius={20}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
                // fillColor={theme['color-primary-200']}
              />
              {markers.map((item, key) => (
                <Marker
                  coordinate={item.latlng}
                  title={item.title}
                  description={item.description}
                  pinColor={item.pinColor}
                  key={key}
                />
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
            // disabled={locationDistance < 20 ? false : true}
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

const mapStateToProps = (state) => {
  const {user, location} = state.app_store;
  return {user, lectureLoc: location};
};

export default connect(mapStateToProps)(Location);

const styles = StyleService.create({
  map: {
    display: 'flex',
    borderColor: '#00BA4A',
    borderRadius: 5,
    borderWidth: 1,
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
