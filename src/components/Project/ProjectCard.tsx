import React from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import {
    Text,
    Card,
    Paragraph,
    Button,
    TouchableRipple,
    ProgressBar,
    Divider,
} from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    title: string;
    city: string;
    country: string;
    cover_image_uri: string;
    description: string;
    progress: number;
    backer_count: number;
    id: string;
    draft?: boolean;
};

export default function ProjectCard(props: Props): React.ReactElement {
    return (
        <Card
            style={styles.card}
            onPress={() =>
                DeviceEventEmitter.emit('viewProject', { projectId: props.id })
            }
        >
            {props.draft ?? false ? (
                <Text style={styles.draftText}>Draft</Text>
            ) : null}
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
                        <Text style={styles.progressTextPercentage}>
                            {`${Math.round(props.progress * 100)}%`}
                        </Text>
                        <Text style={styles.progressText}>Funded</Text>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Text style={styles.progressTextPercentage}>
                            {props.backer_count}
                        </Text>
                        <Text style={styles.progressText}>Backers</Text>
                    </View>
                </View>
                <ProgressBar
                    progress={props.progress}
                    style={{ alignSelf: 'stretch' }}
                />
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
        margin: 5,
    },
});
