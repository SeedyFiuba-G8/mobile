import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {
    Portal,
    Modal,
    Text,
    Checkbox,
    Button,
    Divider,
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
    categories: Category[];
    onOkClick: () => void;
    onCancelClick: () => void;
};

const Item = (props: Category) => {
    return (
        <View style={styles.listItemView}>
            <View>
                <Checkbox
                    status={props.interested ? 'checked' : 'unchecked'}
                    onPress={() => props.setInterested(!props.interested)}
                    color={colors.primary.light}
                />
            </View>
            <View style={styles.listItemTextView}>
                <Text style={styles.itemText}>{props.tag}</Text>
            </View>
        </View>
    );
};

export default function Picker(props: Props): React.ReactElement {
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
                            icon='cards-heart'
                            color={colors.grey}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Interests</Text>
                    </View>
                </View>
                {props.categories.map((item, index) => (
                    <Item
                        tag={item.tag}
                        key={index}
                        interested={item.interested}
                        setInterested={item.setInterested}
                    />
                ))}
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
    container: {
        backgroundColor: colors.white,
        marginHorizontal: 40,
        padding: 20,
        alignItems: 'flex-start',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    listItemView: {
        flexDirection: 'row',
        margin: 10,
    },
    listItemTextView: {
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 16,
        color: colors.darkerGrey,
    },
    okButton: {
        alignSelf: 'flex-end',
    },
    text: {
        fontSize: 18,
        color: colors.darkGrey,
    },
    icon: {
        backgroundColor: 'transparent',
    },
});
