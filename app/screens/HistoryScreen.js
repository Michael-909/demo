import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const demoData = [
	{id: 1, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 2, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 3, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 4, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 5, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 6, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 7, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 8, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 9, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 10, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 11, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 12, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 13, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 14, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 15, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 16, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 17, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 18, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 19, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 20, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 21, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 22, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 23, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 24, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'},
	{id: 25, elapsedTime: 12, distance: 30, createdAt: 'May 43, 02:23 PM'}
];

const RowItem = props => {
	return (
		<View style={styles.rowItem}>
			<Text style={styles.elapsedTime}>{props.elapsedTime} s</Text>
			<Text style={styles.distance}>{props.distance} m</Text>
			<Text style={styles.createdAt}>{props.createdAt}</Text>
		</View>
	);
};

const HistoryScreen = props => {
	return (
		<View style={styles.screen}>
			<FlatList data={demoData}
				keyExtractor={item => item.id}
				renderItem={itemData => <RowItem {...itemData.item}/>}
			/>
		</View>
	);
};


const styles = StyleSheet.create({
	screen: {
		padding: 5
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
		borderRadius: 6,
		minWidth: 220
	},
	text: {
		fontSize: 18
	},
	rowItem: {
		flexDirection: 'row',
		backgroundColor: '#EAFAF1',
		justifyContent: 'space-between',
		padding: 10
	},
	elapsedTime: {
		fontSize: 17,
		color: '#145A32'
	},
	distance: {
		fontSize: 17,
		color: '#7E5109'
	},
	createdAt: {
		fontSize: 17,
		color: '#4D5656'
	},
});

export default HistoryScreen;