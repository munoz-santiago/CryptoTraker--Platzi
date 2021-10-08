import React from "react";
import { View, Text, Image, StyleSheet, SectionList, FlatList } from 'react-native';
import colors from '@/src/resources/colors';
import Http from '@/src/libs/http';

import CoinMarketItem from './CoinMarketItem';


class CoinDetailScreen extends React.Component {

  state = {
    coin: {},
    markets: []
  }

  getSymbolIcon = (name) => {
    if (!name) return null;
    const formattedName = name.toLowerCase().replace(' ', '-');
    return `https://c1.coinlore.com/img/25x25/${formattedName}.png`
  }

  getSections = (coin) => {
    if (!coin) return [];

    const sections = [
      {
        title: 'Market cap',
        data: [coin?.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin?.volume24?.toString()]
      },
      {
        title: 'Chage 24',
        data: [coin?.percent_change_24h]
      }
    ];
    return sections;
  }

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const response = await Http.instance.get(url);
    this.setState({ 'markets': response })
  }

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
    this.setState({ coin });
  }

  render() {
    const { coin, markets } = this.state;
    if (!coin) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image style={styles.iconImage} source={{ uri: this.getSymbolIcon(coin.name) }} />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          sections={this.getSections(coin)}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>
                {section.title}
              </Text>
            </View>
          )}
          style={styles.section}
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          keyExtractor={({ base, name }, index) => `${base}-${name}-${index}`}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem market={item} />}
          style={styles.marketList}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: '#fff',
    fontSize: 14
  },
  marketList: {
    maxHeight: 100,
    paddingLeft: 16
  },
  marketTitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  }
})

export default CoinDetailScreen;
