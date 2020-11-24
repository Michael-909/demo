import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HistoryScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>History Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 5
	}
});

export default HistoryScreen;