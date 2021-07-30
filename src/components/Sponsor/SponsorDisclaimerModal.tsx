import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, Button, Text, Avatar } from 'react-native-paper';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onOkClick: () => void;
    onCancelClick: () => void;
    processingDonation: boolean;
};

export default function SponsorDisclaimerModal(
    props: Props
): React.ReactElement {
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
                            icon='hand-heart'
                            color={colors.grey}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Sponsor Project</Text>
                    </View>
                </View>

                <ScrollView>
                    <Text style={styles.pickerTitleText}>
                        {strings.sponsorshipDisclaimer}
                    </Text>
                </ScrollView>

                <View style={styles.buttonsView}>
                    <Button
                        style={styles.okButton}
                        onPress={props.onCancelClick}
                    >
                        <Text style={{ color: colors.primary.light }}>
                            Cancel
                        </Text>
                    </Button>
                    <Button
                        style={styles.okButton}
                        onPress={props.onOkClick}
                        mode='contained'
                        loading={props.processingDonation}
                        disabled={props.processingDonation}
                    >
                        <Text style={{ color: colors.white }}>Confirm</Text>
                    </Button>
                </View>
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
    buttonsView: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
