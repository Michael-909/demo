import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StartupScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>Start up screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 5
	}
});

export default StartupScreen;