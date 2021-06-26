import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {
    Portal,
    Modal,
    TextInput,
    Button,
    Divider,
    Text,
    Avatar,
} from 'react-native-paper';
import colors from '../constants/colors';

type Category = {
    tag: string;
    interested: boolean;
    setInterested: (interested: boolean) => void;
};

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onOkClick: () => void;
    onCancelClick: () => void;
};

export default function LocationPicker(props: Props): React.ReactElement {
    const hideModal = () => props.setVisible(false);
    const [checked, setChecked] = useState(false);
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
                <TextInput style={styles.input} label='City' mode='outlined' />
                <Divider />
                <Button style={styles.okButton} onPress={props.onCancelClick}>
                    Cancel
                </Button>
                <Button style={styles.okButton} onPress={props.onOkClick}>
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
        marginHorizontal: 32,
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
    icon: {
        backgroundColor: 'transparent',
    },
});
