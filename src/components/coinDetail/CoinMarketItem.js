import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const coinMarketItem = ({ market }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{market.name}</Text>
            <Text style={styles.priceText}>USD {market.price_usd}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        borderColor: colors.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center'
    },
    nameText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    priceText: {
        color: '#FFF',
    }
});

export default coinMarketItem;
