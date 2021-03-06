import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { countries } from 'countries-list';

import {
    Portal,
    Modal,
    TextInput,
    Button,
    Text,
    Avatar,
} from 'react-native-paper';
import colors from '../constants/colors';
import { useEffect } from 'react';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onOkClick: (city: string, country: string) => void;
    onCancelClick: () => void;
    country: string;
    city: string;
};

export default function LocationPicker(props: Props): React.ReactElement {
    const hideModal = () => props.setVisible(false);
    const [countryTemp, setCountryTemp] = useState(props.country);
    const [cityTemp, setCityTemp] = useState(props.city);

    const resetCountryAndCity = () => {
        setCountryTemp(props.country);
        setCityTemp(props.city);
    };

    useEffect(() => {
        resetCountryAndCity();
    }, [props.visible]);

    const onOkButtonPress = () => {
        props.onOkClick(cityTemp.trim(), countryTemp);
    };
    return (
        <Portal>
            <Modal
                visible={props.visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.container}
            >
                <View style={styles.headerContainer}>
                    <View>
                        <Avatar.Icon
                            size={50}
                            icon='map-marker'
                            color={colors.grey}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Location</Text>
                    </View>
                </View>

                <Text style={styles.pickerTitleText}>Country</Text>
                <Picker
                    style={styles.categorySelector}
                    selectedValue={countryTemp}
                    onValueChange={(itemValue) => setCountryTemp(itemValue)}
                    mode='dropdown'
                    dropdownIconColor={colors.primary.light}
                >
                    {Object.values(countries)
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((country, index) => {
                            return (
                                <Picker.Item
                                    label={country.name}
                                    value={country.name}
                                    key={index}
                                />
                            );
                        })}
                </Picker>

                <TextInput
                    style={styles.input}
                    label='City'
                    mode='outlined'
                    value={cityTemp}
                    onChangeText={(city) => setCityTemp(city)}
                />
                <Button style={styles.okButton} onPress={props.onCancelClick}>
                    Cancel
                </Button>
                <Button style={styles.okButton} onPress={onOkButtonPress}>
                    OK
                </Button>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: colors.white,
        marginHorizontal: 40,
        alignItems: 'flex-start',
        padding: 20,
    },
    listItemView: {
        flexDirection: 'row',
        margin: 10,
    },
    listItemTextView: {
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 20,
        color: colors.darkGrey,
    },
    okButton: {
        alignSelf: 'flex-end',
    },
    input: {
        alignSelf: 'stretch',
        marginHorizontal: 12,
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: '#EEEEEE',
        fontWeight: '300',
        height: 50,
    },
    text: {
        fontSize: 18,
        color: colors.darkGrey,
    },
    pickerTitleText: {
        fontSize: 14,
        color: colors.darkGrey,
        marginLeft: 20,
    },
    icon: {
        backgroundColor: 'transparent',
    },
    categorySelector: {
        alignSelf: 'stretch',
        height: 50,
        marginHorizontal: 12,
    },
});
