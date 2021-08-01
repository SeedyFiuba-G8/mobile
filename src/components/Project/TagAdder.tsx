import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    IconButton,
    TextInput,
    Portal,
    Dialog,
    Button,
    Chip,
} from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    tags: Array<string>;
    setTags: (newTags: Array<string>) => void;
};

export default function TagAdder(props: Props): React.ReactElement {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    const [tagInput, setTagInput] = React.useState<string>('');

    const onOkDialogClick = () => {
        if (tagInput.length > 0) props.setTags([...props.tags, tagInput]);
        hideDialog();
    };
    const removeTag = (removeIndex: number) => {
        props.setTags(props.tags.filter((_, index) => index !== removeIndex));
    };
    return (
        <View style={styles.container}>
            {props.tags.map((tag, index) => {
                return (
                    <Chip
                        style={styles.tags}
                        key={index}
                        onClose={() => removeTag(index)}
                    >
                        {tag}
                    </Chip>
                );
            })}
            <IconButton
                icon='tag-plus'
                color={colors.darkGrey}
                size={20}
                onPress={showDialog}
            />
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Add new tag</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            style={styles.input}
                            label='Tag name'
                            onChangeText={(text) => setTagInput(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={onOkDialogClick}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 2,
        flexWrap: 'wrap',
    },
    input: {
        alignSelf: 'stretch',
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: 'transparent',
        fontWeight: '300',
    },
    tags: { height: 35, marginHorizontal: 1 },
});
