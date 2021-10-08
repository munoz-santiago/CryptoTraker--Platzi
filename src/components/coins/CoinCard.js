import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import colors from '@/src/resources/colors';

const CoinCard = ({ data, onPress }) => {
  const getImageArrow = () => {
    if (data.percent_change_1h < 0) return require('@/src/assets/arrow_down.png');
    return require('@/src/assets/arrow_up.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{data.symbol}</Text>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.textPrice}>{`$${data.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textPercentChange}>{data.percent_change_1h}</Text>
        <Image
          source={getImageArrow()}
          style={styles.imageIcon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row'
  },
  symbolText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8
  },
  nameText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 16,
  },
  textPrice: {
    color: '#FFF',
    fontSize: 14
  },
  textPercentChange: {
    color: '#FFF',
    fontSize: 12,
    marginRight:8
  },
  imageIcon: {
    width: 22,
    height: 22
  }
});

export default CoinCard;
