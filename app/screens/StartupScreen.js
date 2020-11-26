import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const StartupScreen = props => {
	const runMap = () => {
		props.navigation.navigate('Runmap');
	};

	const goToHistory = () => {
		props.navigation.navigate('History');
	};

	return (
		<View style={styles.screen}>
			<View style={styles.button}>
				<Button title="Start" color="#3498DB" onPress={runMap} />
			</View>
			<View style={styles.button}>
				<Button title="View History" color="#148F77" onPress={goToHistory} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: '100%',
		padding: 20,
	}
});

export default StartupScreen;