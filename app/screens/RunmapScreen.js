import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';
import * as BikeAction from '../redux/actions/bike';

const toRad = v => {
	return v * Math.PI / 180.0;
};

const calcDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6317;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const lt1 = toRad(lat1);
	const lt2 = toRad(lat2);
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lt1) * Math.cos(lt2);
	const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0-a));
	console.log('answer = ', R*c * 1000.0);
	return R * c * 1000.0;
};

const RunmapScreen = props => {
	const window = Dimensions.get('window');
	const { width, height } = window;
	const delta = {
		latitudeDelta: 0.2,
		longitudeDelta: 0.2 * width / height
	};
	const initialLocation = {
		latitude: 37.78,
		longitude: -122.43,
	};

	const dispatch = useDispatch();
	const [finishLoading, setFinishLoading] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [sumDistance, setSumDistance] = useState(0.0);
	const [currentLocation, setCurrentLocation] = useState({...initialLocation});
	const [mapRegion, setMapRegion] = useState({...initialLocation, ...delta});

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.LOCATION);
		if (result.status !== 'granted') {
			Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.', [{ text: 'Okay' }]);
			return false;
		}
		return true;
	};
	const calcLocation = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;
		try {
			const location = await Location.getCurrentPositionAsync({
				timeout: 3000
			});
			if(finishLoading) {
				setSumDistance(sumDistance + calcDistance(currentLocation.latitude, currentLocation.longitude, location.coords.latitude, location.coords.longitude));
			} else {
				setFinishLoading(true);
			}
			setCurrentLocation({
				...currentLocation,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
			setMapRegion({
				...mapRegion,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
		} catch (err) {
			Alert.alert('Could not fetch location!', err.message, [{ text: 'Okay' }]);
		}
	};
	const runTimer = useCallback(() => {
		console.log('finished loading?', finishLoading, elapsedTime);
		if(finishLoading) setElapsedTime(elapsedTime => elapsedTime + 1);
	}, [finishLoading, setFinishLoading]);

	useEffect(() => {
		console.log('location start!!!');
		const locationInterval = setInterval(() => {
			calcLocation();
		}, 3000);
		return () => {
			clearInterval(locationInterval);
		};
	}, [dispatch, finishLoading]);

	useEffect(() => {
		console.log('time start!!!');
		const runInterval = setInterval(runTimer, 1000);
		return () => {
			clearInterval(runInterval);
		};
	}, [dispatch, finishLoading]);

	const recordElapsed = () => {
		dispatch(BikeAction.addElapsed(elapsedTime, sumDistance));
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
					<Text style={styles.distanceTd}>{parseFloat(sumDistance).toFixed(2)}m</Text>
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