import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
    Divider,
    Icon,
    Text,
    TopNavigationAction,
    styled,
    Button,
} from '@ui-kitten/components';
import { Container, Navbar } from '../components';
import { inject, observer } from 'mobx-react';
const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyCourseScreen = ({ navigation, store }) => {
    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar
                title="My Courses"
                leftAction={<BackAction />}
                textStyle={styles.title}
            />
            <Container>
                <Text>My Attendance List</Text>
                <Button onPress={() => navigation.navigate('add_course')}>Add Course</Button>
            </Container>
        </SafeAreaView>
    );
};

export default inject('store')(observer(MyCourseScreen));
const styles = StyleSheet.create({
    title: {
        color: 'white',
    },
});
