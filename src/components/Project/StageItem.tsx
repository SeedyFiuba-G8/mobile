import { View, StyleSheet } from 'react-native';
import type { Stage } from '../../api/projectsApi';
import React from 'react';
import { Text, IconButton } from 'react-native-paper';
import colors from '../../constants/colors';

export default function StageItem(props: {
    index: number;
    totalItems: number;
    stage: Stage;
    completed: boolean;
}): React.ReactElement {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={
                        props.completed
                            ? styles.stageTextCompleted
                            : styles.stageText
                    }
                >{`Stage ${props.index + 1}`}</Text>
                {props.completed ? (
                    <IconButton
                        icon='check-bold'
                        style={{ margin: 0 }}
                        size={20}
                        color={colors.primary.light}
                    />
                ) : null}
            </View>
            <Text
                style={
                    props.completed
                        ? styles.stageItemTextCompleted
                        : styles.stageItemText
                }
            >
                {props.stage.description}
            </Text>
            <Text
                style={
                    props.completed
                        ? styles.stageItemTextCompleted
                        : styles.stageItemText
                }
            >{`${props.stage.cost} ETH`}</Text>
            {props.index < props.totalItems - 1 ? (
                <View
                    style={{
                        borderWidth: 0.25,
                        height: 25,
                        borderColor: props.completed
                            ? colors.primary.light
                            : colors.grey,
                    }}
                />
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    stageText: {
        fontWeight: 'bold',
        color: colors.darkGrey,
        fontSize: 16,
    },
    stageItemText: {
        color: colors.darkGrey,
        fontSize: 14,
    },
    stageTextCompleted: {
        fontWeight: 'bold',
        color: colors.primary.light,
        fontSize: 16,
    },
    stageItemTextCompleted: {
        color: colors.primary.light,
        fontSize: 14,
    },
});
