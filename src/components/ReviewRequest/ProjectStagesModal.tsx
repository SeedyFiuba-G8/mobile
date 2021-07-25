import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Portal, Modal, Button, Text, Avatar } from 'react-native-paper';
import colors from '../../constants/colors';
import { useEffect } from 'react';
import strings from '../../constants/strings';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

export default function ReviewershipModal(props: Props): React.ReactElement {
    const hideModal = () => props.setVisible(false);

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
                            icon='form'
                            color={colors.grey}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Reviewership</Text>
                    </View>
                </View>

                <ScrollView>
                    <Text style={styles.pickerTitleText}>
                        {strings.reviewershipDisclaimer}
                    </Text>
                </ScrollView>
                <Button style={styles.okButton} onPress={props.onCancelClick}>
                    <Text style={{ color: colors.primary.light }}>Cancel</Text>
                </Button>
                {props.isReviewer ? (
                    <Button
                        style={styles.okButton}
                        onPress={props.onRevokeClick}
                    >
                        <Text style={{ color: colors.red, fontWeight: 'bold' }}>
                            Revoke Reviewership
                        </Text>
                    </Button>
                ) : (
                    <Button style={styles.okButton} onPress={props.onOkClick}>
                        <Text
                            style={{
                                color: colors.primary.light,
                                fontWeight: 'bold',
                            }}
                        >
                            Become Reviewer
                        </Text>
                    </Button>
                )}
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
        marginVertical: 80,
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
