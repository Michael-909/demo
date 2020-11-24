import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const RunmapScreen = props => {
	const stopRunmap = () => {
		props.navigation.goBack();
	};

	return (
		<View style={styles.screen}>
			<View style={styles.button}>
				<Button title="Stop" color="#F39C12" onPress={stopRunmap} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 50,
		width: '100%'
	}
});

export default RunmapScreen;