import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import Http from '@/src/libs/http';
import colors from '@/src/resources/colors';

import CoinCard from './CoinCard';
import CoinsSearcher from './CoinsSearcher';


class CoinScreen extends Component {

  state = {
    coins: [],
    coinsFiltered: [],
    loading: false,
  }

  componentDidMount = () => {
    this.getCoins();
  }

  getCoins = async () => {
    // Get list of coins
    this.setState({ loading: true });
    const response = await Http.instance.get('https://api.coinlore.net/api/tickers/');
    this.setState({ coins: response.data, coinsFiltered: response.data, loading: false });
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('screen--coin-detail', { coin });
  }

  handleChangeTextFilter = (textFilter) => {
    const { coins } = this.state;
    const newFilteredCoins = coins.filter((item) => `${item.name.toLowerCase()}${item.symbol.toLowerCase()}`.includes(textFilter.toLowerCase()));
    this.setState({ coinsFiltered: newFilteredCoins });
  }

  render() {
    const { coinsFiltered, loading } = this.state;
  
    return (
      <View style={styles.container}>
        <CoinsSearcher onChange={this.handleChangeTextFilter} />
        {loading && (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={styles.loader}
          />
        )}
        <FlatList
          data={coinsFiltered}
          renderItem={({ item }) => (
            <CoinCard
              data={item}
              onPress={() => this.handlePress(item)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
  },
  loader: {
    marginTop: 10,
  }
});

export default CoinScreen;
