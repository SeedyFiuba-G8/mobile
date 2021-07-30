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

import { withdrawFunds } from '../../api/profileApi';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSuccess: () => void;
    onError: () => void;
    onCancelClick: () => void;
};

export default function WithdrawModal(props: Props): React.ReactElement {
    const hideModal = () => props.setVisible(false);
    const currentBalance = useSelector(
        (state: RootState) => state.balance.balance
    );
    const affix = <TextInput.Affix text='ETH' />;
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const [transfering, setTransfering] = useState(false);
    const [error, setError] = useState(false);

    const resetFields = () => {
        setWithdrawAmount('');
        setWalletAddress('');
        setSuccess(false);
        setError(false);
    };
    const onTransferConfirm = async () => {
        setTransfering(true);
        const result = await withdrawFunds(
            parseFloat(withdrawAmount),
            walletAddress
        );
        setTransfering(false);
        if (result.successful) {
            resetFields();
            setSuccess(true);
        } else {
            setError(true);
        }
    };

    const [success, setSuccess] = useState(false);

    const onClosePress = () => {
        resetFields();
        hideModal();
    };

    const insufficientFunds = () =>
        parseFloat(withdrawAmount) > currentBalance;

    return (
        <Portal>
            <Modal
                visible={props.visible}
                onDismiss={onClosePress}
                contentContainerStyle={styles.container}
            >
                <View style={styles.headerContainer}>
                    <View>
                        <Avatar.Icon
                            size={50}
                            icon='arrow-right-circle'
                            color={colors.primary.light}
                            style={styles.icon}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Transfer funds</Text>
                    </View>
                </View>
                {success ? (
                    <View
                        style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 100,
                        }}
                    >
                        <Text style={styles.currentBalanceText}>
                            Transfer was successful!
                        </Text>
                        <Button
                            onPress={onClosePress}
                            disabled={transfering}
                            loading={transfering}
                            color={colors.primary.light}
                            mode='contained'
                        >
                            <Text
                                style={{
                                    color: colors.white,
                                }}
                            >
                                Close
                            </Text>
                        </Button>
                    </View>
                ) : (
                    <>
                        <Text style={styles.currentBalanceText}>
                            Current balance
                        </Text>
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
                            <Text style={styles.balanceText}>
                                {currentBalance}
                            </Text>
                        </View>
                        <TextInput
                            style={{ alignSelf: 'stretch' }}
                            mode='outlined'
                            label='Withdraw Amount'
                            keyboardType='numeric'
                            right={affix}
                            onChangeText={(newAmount) =>
                                setWithdrawAmount(newAmount)
                            }
                            value={withdrawAmount}
                            error={error || insufficientFunds()}
                        />
                        {insufficientFunds() ? (
                            <HelperText type='error'>
                                {"You don't have enough funds"}
                            </HelperText>
                        ) : null}
                        <TextInput
                            style={{ alignSelf: 'stretch' }}
                            mode='outlined'
                            label='Wallet Address'
                            onChangeText={(newAddress) =>
                                setWalletAddress(newAddress)
                            }
                            value={walletAddress}
                            error={error}
                        />
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
                                onPress={onTransferConfirm}
                                disabled={transfering || insufficientFunds()}
                                loading={transfering}
                                color={colors.primary.light}
                                mode='contained'
                            >
                                <Text
                                    style={{
                                        color: colors.white,
                                    }}
                                >
                                    Confirm
                                </Text>
                            </Button>
                        </View>
                    </>
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
    sponsorButton: {
        alignSelf: 'flex-end',
    },
    cancelButton: {
        alignSelf: 'flex-start',
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
