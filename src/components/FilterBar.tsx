import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import colors from '../constants/colors';
import { Picker } from '@react-native-picker/picker';

type Props = {
    filter: string;
    onChangeFilter: (filter: string) => void;
    feature: string;
    options: string[];
};

export default function FilterBar(props: Props): React.ReactElement {
    return (
        <View style={styles.filterBar}>
            <Avatar.Icon
                icon='filter'
                size={25}
                style={styles.icon}
                color={colors.darkGrey}
            />
            <Text style={styles.filterText}>{`${props.feature}:`}</Text>
            <Picker
                style={styles.categorySelector}
                selectedValue={props.filter}
                onValueChange={props.onChangeFilter}
                mode='dropdown'
            >
                <Picker.Item label='All' value='all' />
                {props.options.map((option, index) => {
                    return (
                        <Picker.Item
                            label={option}
                            value={option}
                            key={index}
                        />
                    );
                })}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    filterText: {
        fontSize: 16,
        color: colors.darkGrey,
    },
    filterBar: {
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#ddd',
        alignSelf: 'stretch',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    categorySelector: {
        alignSelf: 'stretch',
        flex: 1,
        height: 25,
    },
    icon: {
        backgroundColor: 'transparent',
    },
});
