import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {
    Portal,
    Modal,
    Text,
    Checkbox,
    Button,
    Divider,
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
        marginHorizontal: 80,
        alignItems: 'flex-start',
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
});
