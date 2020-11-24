import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const RunmapScreen = props => {
	const stopRunmap = () => {
		props.navigation.goBack();
	};

	const initialLocation = {
		latitude: 37.78,
		longitude: -122.43,
	}
	const mapRegion = {
		latitude: initialLocation.latitude,
		longitude: initialLocation.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	};

	return (
		<View style={styles.screen}>
			<View style={styles.button}>
				<Button title="Stop" color="#F39C12" onPress={stopRunmap} />
			</View>
			<View style={styles.currentData}>
				<View style={styles.time}>
					<Text style={styles.timeTh}>Elapsed Time:</Text>
					<Text style={styles.timeTd}>10s</Text>
				</View>
				<View style={styles.distance}>
					<Text style={styles.distanceTh}>Distance:</Text>
					<Text style={styles.distanceTd}>10m</Text>
				</View>
			</View>
			<MapView region={mapRegion} style={styles.map}>
				<Marker title="My Current Location" coordinate={initialLocation} />
			</MapView>
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
	},
	currentData: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20
	},
	time: {
		flexDirection: 'row'
	},
	distance: {
		flexDirection: 'row'
	},
	timeTh: {
		paddingHorizontal: 5,
		backgroundColor: '#A2D9CE'
	},
	timeTd: {
		paddingHorizontal: 5,
		backgroundColor: '#73C6B6'
	},
	distanceTh: {
		paddingHorizontal: 5,
		backgroundColor: '#D7BDE2'
	},
	distanceTd: {
		paddingHorizontal: 5,
		backgroundColor: '#C39BD3'
	},
	map: {
		width: '100%',
		margin: 10
	}
});

export default RunmapScreen;