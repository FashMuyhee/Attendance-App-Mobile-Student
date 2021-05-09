import React from 'react';
import {Layout, Spinner, Text} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoaderText = ({loading, loadingText}) => {
  return (
    <Layout
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: loading ? 'flex' : 'none',
      }}>
      <Spinner status="primary" />
      <Text style={{fontSize: hp(1.5)}}>{loadingText}</Text>
    </Layout>
  );
};

export default LoaderText;
