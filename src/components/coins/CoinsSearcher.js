import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';


class CoinsSearcher extends React.Component {

    state = {
        searchText: ''
    }

    handleChangeText = (newText) => {
        this.setState({ searchText: newText });
        if (this.props.onChange) this.props.onChange(newText);
    }

    render() {
        const { searchText } = this.props;

        return (
            <TextInput
                onChangeText={this.handleChangeText}
                value={searchText}
                placeholder="Search"
                placeholderTextColor="#FFF"
                style={styles.textInput}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: colors.charade,
        height: 46,
        paddingLeft: 16,
        color: '#fff',

        borderBottomWidth: 2,
        borderColor: colors.zircon
    }
});

export default CoinsSearcher;
