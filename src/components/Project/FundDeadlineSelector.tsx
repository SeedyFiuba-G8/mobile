import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../contexts/ThemeProvider';
import { DatePickerModal } from 'react-native-paper-dates';
import { IconButton, Text } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    date: Date | undefined;
    setDate: (newDate: Date) => void;
};

export default function FundDeadlineSelector(
    props: Props
): React.ReactElement {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );

    const [modalOpen, setOpen] = React.useState(false);

    const onModalDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = (params) => {
        props.setDate(params.date);
        setOpen(false);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>
                {props.date ?? false
                    ? `${props.date?.getDate()}/${
                          props.date?.getMonth() + 1
                      }/${props.date?.getFullYear()}`
                    : ''}
            </Text>
            <IconButton
                icon='pencil'
                style={styles.modifyButton}
                onPress={() => setOpen(true)}
                color={colors.darkGrey}
            />
            <DatePickerModal
                mode='single'
                visible={modalOpen}
                onDismiss={onModalDismiss}
                date={props.date}
                onConfirm={onConfirm}
                validRange={{
                    startDate: new Date(),
                }}
                label='Select project funding deadline'
            />
        </View>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            padding: 2,
            justifyContent: 'flex-end',
        },
        input: {
            alignSelf: 'stretch',
            marginVertical: 10,
            marginTop: 0,
            backgroundColor: 'transparent',
            fontWeight: '300',
        },
        tags: { height: 35, marginHorizontal: 1 },
        modifyButton: {},
        dateText: {
            fontSize: 20,
        },
    });
    return styles;
};
