import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Text, Title, Avatar } from 'react-native-paper';
import colors from '../constants/colors';

export default function MessagesScreen(): React.ReactElement {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View
                style={{
                    alignSelf: 'stretch',
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    flexDirection: 'row',
                    padding: 10,
                }}
            >
                <Avatar.Image
                    size={70}
                    source={require('../assets/images/dummy_avatar2.jpg')}
                />
                <View
                    style={{
                        marginLeft: 10,
                        flexWrap: 'nowrap',
                        flex: 1,
                    }}
                >
                    <Title>Nicolas Aguerre</Title>
                    <Text numberOfLines={1} style={{ color: colors.darkGrey }}>
                        Te llego a cruzar en la calle y te re cago
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
