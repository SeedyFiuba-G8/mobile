import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Paragraph, Text } from 'react-native-paper';
import { Avatar, Caption, Title, IconButton } from 'react-native-paper';
import colors from '../constants/colors';
import ProfileInfoSection from '../components/Profile/ProfileInfoSection';
import Picker from '../components/InterestsPicker';
import LocationPicker from '../components/LocationPicker';

export default function ProfileScreen(): React.ReactElement {
    const [interestPickerVisible, setInterestPickerVisible] = useState(false);
    const [locationPickerVisible, setLocationPickerVisible] = useState(false);

    const categoriesWithState = categories.map((category, index) => {
        const [interested, setInterested] = useState(category.interested);
        return {
            tag: category.tag,
            interested: interested,
            setInterested: setInterested,
        };
    });

    const generateInterestsString = () => {
        const interested_categories = categoriesWithState.filter(
            (category, index) => category.interested
        );

        const interested_categories_tags = interested_categories.map(
            (category, index) => category.tag
        );
        return interested_categories_tags.join(', ');
    };

    const [country, setCountry] = useState('Argentina');
    const [city, setCity] = useState('Buenos Aires');
    return (
        <View style={styles.container}>
            <View style={styles.profilePictureView}>
                <Avatar.Image
                    source={require('../assets/images/dummy_avatar.jpg')}
                    size={200}
                />
                <IconButton
                    style={styles.changePictureButton}
                    icon='camera'
                    size={30}
                    color={'white'}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <ProfileInfoSection
                title='Personal information'
                icon='account'
            ></ProfileInfoSection>

            <Divider style={styles.divider} />

            <ProfileInfoSection
                title='Interests'
                icon='cards-heart'
                editable={true}
                onEditPress={() => setInterestPickerVisible(true)}
            >
                <Picker
                    visible={interestPickerVisible}
                    setVisible={setInterestPickerVisible}
                    categories={categoriesWithState}
                    onOkClick={() => setInterestPickerVisible(false)}
                    onCancelClick={() => setInterestPickerVisible(false)}
                />
                <View style={styles.profileInfoSectionContentView}>
                    <Text style={styles.contentText}>
                        {generateInterestsString()}
                    </Text>
                </View>
            </ProfileInfoSection>

            <Divider style={styles.divider} />

            <ProfileInfoSection
                title='Location'
                icon='map-marker'
                editable={true}
                onEditPress={() => setLocationPickerVisible(true)}
            >
                <View style={styles.profileInfoSectionContentView}>
                    <LocationPicker
                        visible={locationPickerVisible}
                        setVisible={setLocationPickerVisible}
                        onOkClick={() => setLocationPickerVisible(false)}
                        onCancelClick={() => setLocationPickerVisible(false)}
                        city={city}
                        setCity={setCity}
                        country={country}
                        setCountry={setCountry}
                    />
                    <Text style={styles.contentText}>
                        {`${city}, ${country}`}
                    </Text>
                </View>
            </ProfileInfoSection>
        </View>
    );
}

const categories = [
    { tag: 'Entretainment', interested: true },
    { tag: 'Production', interested: true },
    { tag: 'Games', interested: false },
    { tag: 'Home', interested: false },
    { tag: 'Office', interested: true },
    { tag: 'Technology', interested: false },
    { tag: 'Writing', interested: false },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profilePictureView: {
        alignItems: 'center',
        margin: 20,
    },
    personalInformationView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 45,
        marginHorizontal: 40,
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
        color: colors.darkGrey,
    },
    changePictureButton: {
        position: 'absolute',
        bottom: 0,
        right: 75,
        backgroundColor: colors.primary.light,
    },
    personalInformationTextView: {
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    personalInformationIcon: {
        backgroundColor: 'transparent',
    },
    divider: {
        marginHorizontal: 20,
    },
    profileInfoSectionContentView: {
        margin: 20,
    },
    contentText: {
        color: colors.darkerGrey,
    },
});
