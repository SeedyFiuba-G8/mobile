import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Text } from 'react-native-paper';
import ReviewRequestCard from '../components/ReviewRequest/ReviewRequestCard';
import ReviewRequestList from '../components/ReviewRequest/ReviewRequestList';
export default function ReviewRequestsScreen(): React.ReactElement {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        console.log('falopa');
    };
    return (
        <View style={styles.container}>
            <ReviewRequestList
                refreshing={refreshing}
                onRefresh={onRefresh}
                projects={mockProjects}
            />
        </View>
    );
}

const mockProjects = [
    {
        title: 'Test project 1',
        city: 'Buenos Aires',
        country: 'Argentina',
        description: 'Dejar de tomar falopita',
        id: '123123123',
    },
    {
        title: 'Test project 2',
        city: 'Chapadmalal',
        country: 'Argentina',
        description: 'Tomar MAS falopita',
        id: '123123123',
    },
    {
        title: 'Test project 3',
        city: 'Zapala',
        country: 'Argentina',
        description: 'Dejar de hacer proyectos que hablen de la falopita',
        id: '123123123',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
