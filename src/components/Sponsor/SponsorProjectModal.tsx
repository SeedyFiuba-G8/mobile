import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Portal,
    Modal,
    Button,
    Text,
    Avatar,
    TextInput,
    HelperText,
} from 'react-native-paper';
import colors from '../../constants/colors';

import { useSelector } from 'react-redux';

import type { RootState } from '../../reducers';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onOkClick: (donation: string) => void;
    onCancelClick: () => void;
};

export default function SponsorProjectModal(props: Props): React.ReactElement {
    const hideModal = () => props.setVisible(false);
    const currentBalance = useSelector(
        (state: RootState) => state.balance.balance
    );
    const affix = <TextInput.Affix text='ETH' />;
    const [donation, setDonation] = useState('');
    const insufficientFunds = () => parseFloat(donation) > currentBalance;
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
                            color={colors.primary.light}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Sponsor project</Text>
                    </View>
                </View>
                <Text style={styles.currentBalanceText}>Current balance</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                    }}
                >
                    <Avatar.Icon
                        style={styles.ethIcon}
                        color={colors.grey}
                        icon='ethereum'
                        size={45}
                    />
                    <Text style={styles.balanceText}>{currentBalance}</Text>
                </View>
                <TextInput
                    style={{ alignSelf: 'stretch' }}
                    mode='outlined'
                    label='Donation amount'
                    keyboardType='numeric'
                    right={affix}
                    onChangeText={(newDonation) => setDonation(newDonation)}
                    value={donation}
                    error={insufficientFunds()}
                />
                {insufficientFunds() ? (
                    <HelperText type='error'>
                        {"You don't have enough funds"}
                    </HelperText>
                ) : null}
                <View style={styles.buttonsView}>
                    <Button
                        style={styles.cancelButton}
                        onPress={props.onCancelClick}
                    >
                        <Text style={{ color: colors.primary.light }}>
                            Cancel
                        </Text>
                    </Button>
                    <Button
                        style={styles.sponsorButton}
                        color={colors.primary.light}
                        mode='contained'
                        disabled={insufficientFunds()}
                        onPress={() => props.onOkClick(donation)}
                    >
                        <Text
                            style={{
                                color: colors.white,
                            }}
                        >
                            Sponsor
                        </Text>
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
    sponsorButton: {
        alignSelf: 'flex-end',
    },
    cancelButton: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
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
        color: colors.primary.light,
    },
    currentBalanceText: {
        fontSize: 16,
        color: colors.darkerGrey,
        marginLeft: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    balanceText: {
        fontSize: 16,
        color: colors.darkGrey,
        margin: 0,
    },
    icon: {
        backgroundColor: 'transparent',
    },
    categorySelector: {
        alignSelf: 'stretch',
        height: 50,
        marginHorizontal: 12,
    },
    ethIcon: {
        backgroundColor: 'transparent',
        margin: 0,
    },
    buttonsView: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
