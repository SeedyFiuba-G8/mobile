import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import colors from '../../constants/colors';

type Stage = {
    description: string;
    cost: string;
};
type Props = {
    index: number;
    totalItems: number;
    onModifyGoal: (index: number, title: string) => void;
    onModifyTitle: (index: number, title: string) => void;
    onDeleteStagePress: (index: number) => void;
    stage: Stage;
};

export default function StageItem(props: Props): React.ReactElement {
    const affix = <TextInput.Affix text='ETH' />;
    const hasError = () => parseFloat(props.stage.cost) === 0;
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.stageText}>{`Stage ${
                    props.index + 1
                }`}</Text>
                {props.totalItems > 1 ? (
                    <IconButton
                        icon='close-circle'
                        style={{ margin: 0 }}
                        color={colors.grey}
                        size={25}
                        onPress={() => props.onDeleteStagePress(props.index)}
                    />
                ) : null}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    marginRight: 32,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        flex: 1,
                    }}
                >
                    <View style={styles.goalStageView}>
                        <TextInput
                            style={styles.goalInput}
                            label='Title'
                            mode='outlined'
                            onChangeText={(text) =>
                                props.onModifyTitle(props.index, text)
                            }
                            value={props.stage.description}
                        />
                    </View>
                    <View style={styles.goalStageView}>
                        <TextInput
                            style={styles.goalInput}
                            mode='outlined'
                            keyboardType='numeric'
                            right={affix}
                            label='Goal'
                            onChangeText={(text) =>
                                props.onModifyGoal(props.index, text)
                            }
                            value={props.stage.cost.toString()}
                            error={hasError()}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    borderWidth: 0.25,
                    height: 25,
                    borderColor: colors.grey,
                }}
            ></View>
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
        marginRight: 4,
    },
    goalInput: {
        alignSelf: 'stretch',
        flex: 1,
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: colors.white,
        fontWeight: '300',
    },
    goalStageView: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 32,
    },
});
