import React from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { Text, Card, ProgressBar, Button } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    title: string;
    city: string;
    country: string;
    cover_image_uri: string;
    description: string;
    id: string;
};

export default function ReviewRequestCard(props: Props): React.ReactElement {
    const onCardPress = () => {
        console.log('Pressed review request card');
    };
    return (
        <Card style={styles.card} onPress={onCardPress}>
            <Card.Cover
                style={styles.cover}
                source={{ uri: props.cover_image_uri }}
            />
            <Card.Title
                title={props.title}
                subtitle={`${props.city}, ${props.country}`}
            />
            <Card.Content>
                <Text>{props.description}</Text>
            </Card.Content>

            <View style={styles.statusSection}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button
                            icon='check-bold'
                            color={colors.primary.light}
                            mode='contained'
                            onPress={() => console.log('Falopa')}
                        >
                            <Text style={{ color: colors.white }}>Accept</Text>
                        </Button>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            icon='close-thick'
                            color={colors.darkerGrey}
                            mode='contained'
                            onPress={() => console.log('Falopa 2')}
                        >
                            <Text style={{ color: colors.white }}>Decline</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 20,
        height: 400,
    },
    title: {
        alignSelf: 'flex-start',
    },
    statusSection: {
        alignSelf: 'stretch',
        flex: 1,
        position: 'absolute',
        bottom: 10,
        padding: 10,
        width: '100%',
    },
    cover: {
        height: 150,
    },
    progressText: {
        color: colors.primary.light,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    progressTextPercentage: {
        color: colors.primary.light,
        fontWeight: 'bold',
    },
    draftText: {
        color: colors.darkGrey,
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5,
    },
});