import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import * as BikeAction from '../redux/actions/bike';

const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
	const R = 6371;
	const dLat = deg2rad(lat2-lat1);
	const dLon = deg2rad(lon2-lon1); 
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	console.log('d = ', lat1, lon1, lat2, lon2, R * c * 1000);
	return R * c * 1000;
};

const deg2rad = (deg) => {
	return deg * (Math.PI/180);
};

const RunmapScreen = props => {
	const window = Dimensions.get('window');
	const { width, height } = window;
	const delta = {
		latitudeDelta: 0.001,
		longitudeDelta: 0.001 * width / height
	};
	const initialLocation = {
		latitude: 37.78,
		longitude: -122.43,
	};

	const dispatch = useDispatch();
	const [finishLoading, setFinishLoading] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	const [location, setLocation] = useState({
		...initialLocation,
		distanceTravelled: 0,
		prevLatLng: {}
	});
	const [mapRegion, setMapRegion] = useState({...initialLocation, ...delta});
	const [currentLocation, setCurrentLocation] = useState(initialLocation);

	const calcDistance = useCallback(newLatLng => {
		const { prevLatLng } = location;
		if(!finishLoading) setFinishLoading(true);
		if(!prevLatLng.latitude || !prevLatLng.longitude) return 0;
		return getDistanceFromLatLonInKm(prevLatLng.latitude, prevLatLng.longitude, newLatLng.latitude, newLatLng.longitude);
	}, [finishLoading, location]);

	const travelStart = useCallback(() => {
		navigator.geolocation.watchPosition(
			position => {
				const { distanceTravelled } = location;
				const { latitude, longitude } = position.coords;
				const newCoordinate = { latitude, longitude };
				const dist = calcDistance(newCoordinate);
				setLocation({
					latitude,
					longitude,
					distanceTravelled: distanceTravelled + (dist > 1.5 ? dist : 0),
					prevLatLng: newCoordinate
				});
				setCurrentLocation({...currentLocation, latitude, longitude});
				setMapRegion({...mapRegion, latitude, longitude});
			},
			error => Alert.alert('Insufficient permissions!', error.message, [{ text: 'Okay' }]),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}, [dispatch, location, currentLocation, finishLoading, mapRegion]);

	useEffect(() => {
		const travelTimer = setInterval(travelStart, 3000);
		return () => {
			clearInterval(travelTimer);
		};
	}, [dispatch, finishLoading, location]);

	const runTimer = useCallback(() => {
		if(finishLoading) setElapsedTime(elapsedTime => elapsedTime + 1);
	}, [finishLoading, elapsedTime]);

	useEffect(() => {
		const runInterval = setInterval(runTimer, 1000);
		return () => {
			clearInterval(runInterval);
		};
	}, [dispatch, finishLoading, elapsedTime]);

	const recordElapsed = () => {
		dispatch(BikeAction.addElapsed(elapsedTime, location.distanceTravelled));
	};

	const stopRunmap = () => {
		recordElapsed();
		props.navigation.goBack();
		props.navigation.navigate('History');
	};

	if(!finishLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="small" color="black" />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.button}>
				<Button title="Stop" color="#F39C12" onPress={stopRunmap} />
			</View>
			<View style={styles.currentData}>
				<View style={styles.time}>
					<Text style={styles.timeTh}>Elapsed Time:</Text>
					<Text style={styles.timeTd}>{elapsedTime}s</Text>
				</View>
				<View style={styles.distance}>
					<Text style={styles.distanceTh}>Distance:</Text>
					<Text style={styles.distanceTd}>{parseFloat(location.distanceTravelled).toFixed(2)}m</Text>
				</View>
			</View>
			<View style={{...styles.currentData, marginTop: 5}}>
				<View style={{...styles.time, flexDirection: 'column'}}>
					<Text style={styles.timeTh}>Latitude:</Text>
					<Text style={styles.timeTd}>{currentLocation.latitude}</Text>
				</View>
				<View style={{...styles.distance, flexDirection: 'column'}}>
					<Text style={styles.distanceTh}>Longitude:</Text>
					<Text style={styles.distanceTd}>{currentLocation.longitude}</Text>
				</View>
			</View>
			<View style={styles.mapWrapper}>
				<MapView region={mapRegion} style={styles.map}>
					<Marker title="My Current Location" coordinate={currentLocation} />
				</MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingTop: 20
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 50,
		width: '100%',
	},
	currentData: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
	},
	time: {
		flexDirection: 'row'
	},
	distance: {
		flexDirection: 'row',
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
		backgroundColor: '#D7BDE2',
	},
	distanceTd: {
		paddingHorizontal: 5,
		backgroundColor: '#C39BD3'
	},
	map: {
		width: '100%',
		height: '100%'
	},
	mapWrapper: {
		width: '100%',
		padding: 10,
		marginVertical: 10,
		height: Dimensions.get('window').height - 200
	}
});

export default RunmapScreen;