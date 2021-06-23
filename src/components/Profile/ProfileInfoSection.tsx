import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, IconButton } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    title: string;
    icon: string;
    editable?: boolean;
    onEditPress?: () => void;
    children?: React.ReactElement | React.ReactElement[];
};

export default function ProfileInfoSection(props: Props): React.ReactElement {
    return (
        <View style={styles.personalInformationView}>
            <View style={styles.container}>
                <View>
                    <Avatar.Icon
                        size={50}
                        icon={props.icon}
                        color={colors.grey}
                        style={styles.personalInformationIcon}
                    />
                </View>
                <View style={styles.personalInformationTextView}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
                {props.editable ?? false ? (
                    <View style={styles.editIconView}>
                        <IconButton
                            size={30}
                            icon='pencil'
                            style={styles.personalInformationIcon}
                            color={colors.grey}
                            onPress={props.onEditPress}
                        />
                    </View>
                ) : null}
            </View>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    personalInformationView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 45,
        marginTop: 15,
        marginHorizontal: 40,
    },
    text: {
        fontSize: 16,
        alignSelf: 'center',
        color: colors.darkGrey,
    },
    personalInformationTextView: {
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIconView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    personalInformationIcon: {
        backgroundColor: 'transparent',
    },
});
