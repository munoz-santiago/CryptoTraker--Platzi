import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '@/src/resources/colors';

import CoinScreen from './CoinsScreen';
import CoinDetailScreen from '@/src/components/coinDetail/CoinDetailScreen';


const stack = createStackNavigator();

const CoinsStack = () => {
    return (
        <stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl
                },
                headerTintColor: colors.white
            }}
        >
            <stack.Screen
                name="screen--coin"
                component={CoinScreen}
            />

            <stack.Screen
                name="screen--coin-detail"
                component={CoinDetailScreen}
            />

        </stack.Navigator>
    );
};

export default CoinsStack;
