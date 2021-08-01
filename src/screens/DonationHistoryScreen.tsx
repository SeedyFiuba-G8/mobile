import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';

// Components
import { Avatar, Card, Text } from 'react-native-paper';
import FilterBar from '../components/FilterBar';

// Types
import type { RootState } from '../reducers/index';
import type { Donation } from '../api/profileApi';

// APIs
import { getDonationHistory } from '../api/profileApi';

// Hooks
import { useSelector } from 'react-redux';

// Constant
import colors from '../constants/colors';
import statuses from '../constants/statuses';
import { useState } from 'react';

export default function DonationHistoryScreen(): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const myUserId = useSelector((state: RootState) => state.session.id);

    const [donations, setDonations] = useState<Array<Donation>>([]);

    const onRefresh = async () => {
        setRefreshing(true);
        const donations = await getDonationHistory(myUserId);
        setRefreshing(false);
        if (donations.successful) {
            console.log(donations.data);
            setDonations(donations.data);
        }
    };

    const [filter, setFilter] = React.useState('all');
    const changeFilter = (newFilter: string) => {
        console.log(`Setting filter to ${newFilter}`);
        setFilter(newFilter);
    };

    useEffect(() => {
        onRefresh();
    }, []);

    const makeDate = (date: string) => {
        const objDate = new Date(date);
        return `${objDate.getDate()}/${
            objDate.getMonth() + 1
        }/${objDate.getFullYear()}`;
    };
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.filterBar}>
                    <FilterBar
                        filter={filter}
                        onChangeFilter={changeFilter}
                        feature='Status'
                        options={statuses}
                    />
                </View>
                {donations
                    .filter(
                        (donation) =>
                            donation.status.toLowerCase() === filter ||
                            filter === 'all'
                    )
                    .map((donation, index) => {
                        return (
                            <Card
                                style={{
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                }}
                                key={index}
                            >
                                <Card.Title
                                    title={donation.title}
                                    subtitle={`${donation.amount} ETH`}
                                    left={(props) => (
                                        <Avatar.Icon
                                            {...props}
                                            icon='hand-heart'
                                        />
                                    )}
                                    right={() => (
                                        <Text
                                            style={{
                                                color: colors.grey,
                                                marginRight: 5,
                                            }}
                                        >
                                            {makeDate(donation.date)}
                                        </Text>
                                    )}
                                />
                            </Card>
                        );
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
    filterText: {
        fontSize: 16,
        color: colors.darkGrey,
    },
    filterBar: {
        marginHorizontal: 20,
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
