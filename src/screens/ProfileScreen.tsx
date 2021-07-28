import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    ActivityIndicator,
    Divider,
    FAB,
    Snackbar,
    Text,
} from 'react-native-paper';
import { Avatar, IconButton } from 'react-native-paper';
import colors from '../constants/colors';
import ProfileInfoSection from '../components/Profile/ProfileInfoSection';
import Picker from '../components/InterestsPicker';
import LocationPicker from '../components/LocationPicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

// API
import { getProfile, updateProfile } from '../api/profileApi';
import { useEffect } from 'react';

// Types
import type { RootState } from '../reducers/index';
import ReviewershipModal from '../components/Profile/ReviewershipModal';

// Firebase
import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import 'firebase/storage';

// Image Picker
import * as ImagePicker from 'expo-image-picker';
import { updateNameAction } from '../actions/UpdateNameAction';

// Util
import { loadUserImage } from '../util/image-util';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen(props: Props): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    const [interestPickerVisible, setInterestPickerVisible] = useState(false);
    const [locationPickerVisible, setLocationPickerVisible] = useState(false);
    const [reviewershipModalVisible, setReviewershipModalVisible] =
        useState(false);

    const [name, setName] = useState('');
    const [interests, setInterests] = useState<Array<string>>([]);
    const myUserId = useSelector((state: RootState) => state.session.id);
    const editable = myUserId === props.route.params.userId;
    const enableReviewership = false;

    const [loading, setLoading] = useState(false);

    const generateInterestsString = () => {
        return interests.join(', ');
    };

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [isReviewer, setIsReviewer] = useState(false);
    const [statusBarVisible, setStatusBarVisible] = useState(false);
    const [statusBarText, setStatusBarText] = useState('');

    const [profilePicURL, setProfilePicURL] = useState<string>('');
    const [updatingProfilePic, setUpdatingProfilePic] = useState(false);

    const onRefresh = async () => {
        setLoading(true);
        const profileResponse = await getProfile(props.route.params.userId);
        if (profileResponse.successful) {
            const profile = profileResponse.data;
            setName(`${profile.firstName} ${profile.lastName}`);
            setCity(profile.city);
            setCountry(profile.country);
            setInterests(profile.interests);
            if (profile.profilePicUrl) {
                setProfilePicURL(profile.profilePicUrl);
            }
        }
        setLoading(false);
    };

    const onChangePicPress = async () => {
        const result = await loadUserImage([1, 1]);
        if (!result || !result.blob) return;

        const ref = firebase
            .storage()
            .ref()
            .child(`public/profile/${myUserId}`);
        setUpdatingProfilePic(true);
        await ref.put(result.blob);
        const newURL = await ref.getDownloadURL();
        updateProfilePicURL(newURL);
        await updateProfileInfo();
        setUpdatingProfilePic(false);
    };

    const dispatch = useDispatch();
    const updateProfileInfo = async () => {
        const profileResponse = await getProfile(myUserId);
        if (profileResponse.successful) {
            dispatch(
                updateNameAction(
                    profileResponse.data.firstName,
                    profileResponse.data.lastName,
                    profileResponse.data.profilePicUrl
                )
            );
        }
    };

    const updateProfilePicURL = async (newProfilePicURL: string) => {
        await updateProfile(myUserId, { profilePicUrl: newProfilePicURL });
        onRefresh();
    };
    const updateInterests = async (newInterests: string[]) => {
        await updateProfile(props.route.params.userId, {
            interests: newInterests,
        });
        onRefresh();
    };

    const updateLocation = async (newCity: string, newCountry: string) => {
        await updateProfile(props.route.params.userId, {
            city: newCity,
            country: newCountry,
        });
        onRefresh();
    };
    useEffect(() => {
        onRefresh();
    }, [props.route.params.userId]);

    useEffect(() => {
        if (props.route.params.showNotification) {
            setStatusBarText(props.route.params.showNotification);
            setStatusBarVisible(true);
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {loading ? (
                    <ActivityIndicator size='large' animating={true} />
                ) : (
                    <>
                        <View style={styles.profilePictureView}>
                            <Avatar.Image
                                source={
                                    profilePicURL
                                        ? { uri: profilePicURL }
                                        : require('../assets/images/dummy_avatar2.jpg')
                                }
                                size={200}
                            />
                            {editable ? (
                                !updatingProfilePic ? (
                                    <IconButton
                                        style={styles.changePictureButton}
                                        icon='camera'
                                        size={30}
                                        color={'white'}
                                        onPress={onChangePicPress}
                                    />
                                ) : (
                                    <ActivityIndicator
                                        style={
                                            styles.changePictureActivityINdicator
                                        }
                                        size='small'
                                        animating={true}
                                    />
                                )
                            ) : null}
                        </View>
                        <ProfileInfoSection title='Name' icon='account'>
                            <View style={styles.profileInfoSectionContentView}>
                                <Text style={styles.contentText}>{name}</Text>
                            </View>
                        </ProfileInfoSection>
                        <Divider style={styles.divider} />

                        <ProfileInfoSection
                            title='Interests'
                            icon='cards-heart'
                            editable={editable}
                            onEditPress={() => setInterestPickerVisible(true)}
                        >
                            <Picker
                                visible={interestPickerVisible}
                                setVisible={setInterestPickerVisible}
                                interests={interests}
                                onOkClick={(newInterests) => {
                                    setInterestPickerVisible(false);
                                    updateInterests(newInterests);
                                }}
                                onCancelClick={() =>
                                    setInterestPickerVisible(false)
                                }
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
                            editable={editable}
                            onEditPress={() => setLocationPickerVisible(true)}
                        >
                            <View style={styles.profileInfoSectionContentView}>
                                <LocationPicker
                                    visible={locationPickerVisible}
                                    setVisible={setLocationPickerVisible}
                                    onOkClick={(newCity, newCountry) => {
                                        setLocationPickerVisible(false);
                                        updateLocation(newCity, newCountry);
                                    }}
                                    onCancelClick={() =>
                                        setLocationPickerVisible(false)
                                    }
                                    city={city}
                                    country={country}
                                />
                                <Text style={styles.contentText}>
                                    {`${city}, ${country}`}
                                </Text>
                            </View>
                        </ProfileInfoSection>
                        {editable && enableReviewership ? (
                            <>
                                <Divider style={styles.divider} />
                                <ProfileInfoSection
                                    title='Reviewership'
                                    icon='shield-account'
                                    editable={true}
                                    onEditPress={() =>
                                        setReviewershipModalVisible(true)
                                    }
                                >
                                    <View
                                        style={
                                            styles.profileInfoSectionContentView
                                        }
                                    >
                                        {isReviewer ? (
                                            <Text
                                                style={{
                                                    color: colors.primary
                                                        .light,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {'You are a project reviewer.'}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={{
                                                    color: colors.darkerGrey,
                                                }}
                                            >
                                                {
                                                    'You are not a project reviewer.'
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <ReviewershipModal
                                        isReviewer={isReviewer}
                                        visible={reviewershipModalVisible}
                                        setVisible={
                                            setReviewershipModalVisible
                                        }
                                        onOkClick={() => {
                                            setReviewershipModalVisible(false);
                                            setIsReviewer(true);
                                        }}
                                        onRevokeClick={() => {
                                            setReviewershipModalVisible(false);
                                            setIsReviewer(false);
                                        }}
                                        onCancelClick={() =>
                                            setReviewershipModalVisible(false)
                                        }
                                    />
                                </ProfileInfoSection>
                            </>
                        ) : null}
                    </>
                )}
            </ScrollView>
            <Snackbar
                visible={statusBarVisible}
                onDismiss={() => {
                    setStatusBarVisible(false);
                }}
                duration={3000}
            >
                {statusBarText}
            </Snackbar>
            {!editable ? (
                <FAB
                    icon='android-messages'
                    style={styles.messageFab}
                    color={colors.white}
                    onPress={() =>
                        props.navigation.navigate('MessagesChat', {
                            userId: props.route.params.userId,
                            name: name,
                        })
                    }
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    changePictureActivityINdicator: {
        position: 'absolute',
        bottom: 0,
        right: 90,
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
        marginHorizontal: 20,
    },
    contentText: {
        color: colors.black,
    },
    messageFab: {
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary.light,
    },
});
