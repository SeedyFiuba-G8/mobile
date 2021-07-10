import React from 'react';
import {
    Text,
    Portal,
    Dialog,
    IconButton,
    TextInput,
    Button,
} from 'react-native-paper';
import { View } from 'react-native';

import colors from '../../constants/colors';

type Props = {
    reviewers: Array<string>;
    setReviewers: (newReviewers: Array<string>) => void;
};
export default function ReviewerList(props: Props): React.ReactElement {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [reviewerInput, setReviewerInput] = React.useState('');
    const hideDialog = () => setDialogVisible(false);
    const showDialog = () => setDialogVisible(true);

    const onOkDialogClick = () => {
        setDialogVisible(false);
        props.setReviewers([...props.reviewers, reviewerInput]);
    };

    const removeReviewer = (removeIndex: number) => {
        props.setReviewers(
            props.reviewers.filter((reviewer, index) => index !== removeIndex)
        );
    };
    return (
        <>
            {props.reviewers.map((reviewer, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            icon='close-circle'
                            color={colors.darkGrey}
                            size={18}
                            onPress={() => removeReviewer(index)}
                        />
                        <Text style={styles.reviewerItemText} key={index}>
                            {reviewer}
                        </Text>
                    </View>
                );
            })}
            <IconButton
                icon='account-plus'
                color={colors.darkGrey}
                size={20}
                onPress={showDialog}
            />
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Add reviewer</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            style={styles.input}
                            label='Reviewer email'
                            onChangeText={(text) => setReviewerInput(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={onOkDialogClick}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = {
    reviewerItemText: {
        color: colors.darkerGrey,
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: 'transparent',
    },
};
