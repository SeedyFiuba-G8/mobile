import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Title, IconButton, Button } from 'react-native-paper';
import Clipboard from 'expo-clipboard';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

// Hooks
import { useSelector } from 'react-redux';

// Types
import type { RootState } from '../../reducers';
import { updateBalance } from '../../util/transactions';

// Components
import WithdrawModal from '../Wallet/WithdrawModal';

export default function Header(): React.ReactElement {
    const profile_info = useSelector((state: RootState) => state.profile);

    const balance = useSelector((state: RootState) => state.balance.balance);
    const wallet_address = useSelector(
        (state: RootState) => state.balance.address
    );
    const [copyWalletAddressText, setCopyWalletAdressText] =
        useState('wallet address');
    const [copyWalletAdressIcon, setcopyWalletAdressIcon] =
        useState('clipboard-text');
    const copyAdressToClipboard = () => {
        setCopyWalletAdressText('Copied to clipboard');
        setcopyWalletAdressIcon('check');
        Clipboard.setString(wallet_address);
        setTimeout(() => {
            setCopyWalletAdressText('wallet address');
            setcopyWalletAdressIcon('clipboard-text');
        }, 1500);
    };

    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(updateBalance, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const onWithdrawSuccess = () => {
        setWithdrawModalVisible(false);
    };

    const onWithdrawFailure = () => {
        setWithdrawModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Avatar.Image
                    source={
                        profile_info.profile_pic_url
                            ? { uri: profile_info.profile_pic_url }
                            : require('../../assets/images/dummy_avatar2.jpg')
                    }
                    size={120}
                />

                <View style={styles.userName}>
                    <Title
                        style={styles.title}
                    >{`${profile_info.first_name} ${profile_info.last_name}`}</Title>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            icon='ethereum'
                            color={colors.darkerGrey}
                            style={{ margin: 0 }}
                        />
                        <Text style={{ left: -6, color: colors.darkerGrey }}>
                            {balance.toString()}
                        </Text>
                    </View>
                    <Button
                        color={colors.darkerGrey}
                        icon={copyWalletAdressIcon}
                        mode='outlined'
                        onPress={copyAdressToClipboard}
                    >
                        {copyWalletAddressText}
                    </Button>
                    <Button
                        color={colors.primary.light}
                        icon='arrow-right-circle'
                        mode='outlined'
                        onPress={() => setWithdrawModalVisible(true)}
                        style={{
                            marginTop: 5,
                            borderColor: colors.primary.light,
                        }}
                    >
                        Transfer funds
                    </Button>
                </View>
                <WithdrawModal
                    visible={withdrawModalVisible}
                    setVisible={setWithdrawModalVisible}
                    onSuccess={onWithdrawSuccess}
                    onError={onWithdrawFailure}
                    onCancelClick={() => setWithdrawModalVisible(false)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },

    container: {
        marginTop: 20,
        paddingBottom: 20,
        borderBottomColor: colors.separator.light,
        borderBottomWidth: values.drawer.separatorWeight,
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    userInfo: {
        alignItems: 'center',
    },

    userName: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
});
