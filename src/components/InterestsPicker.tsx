import React, { useState, useEffect } from 'react';
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

// constants
import categories from '../constants/categories';

type Category = {
    tag: string;
    interested: boolean;
    setInterested: (interested: boolean) => void;
};

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    interests: string[];
    onOkClick: (interests: string[]) => void;
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

    const categoriesTemp = categories.map((category, index) => {
        const [interested, setInterested] = useState<boolean>(
            props.interests.includes(category)
        );
        return {
            tag: category,
            interested: interested,
            setInterested: setInterested,
        };
    });

    useEffect(() => {
        resetCategories();
    }, [props.visible]);
    const resetCategories = () => {
        categoriesTemp.forEach((category, index) => {
            category.setInterested(props.interests.includes(category.tag));
        });
    };
    const onOkButtonPress = () => {
        const categories = categoriesTemp
            .filter((category, index) => category.interested)
            .map((category, index) => category.tag);
        props.onOkClick(categories);
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
                            icon='cards-heart'
                            color={colors.grey}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Interests</Text>
                    </View>
                </View>
                {categoriesTemp.map((item, index) => (
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
                <Button style={styles.okButton} onPress={onOkButtonPress}>
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
