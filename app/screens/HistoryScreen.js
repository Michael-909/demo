import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const RowItem = props => {
	return (
		<View style={styles.rowItem}>
			<Text style={styles.elapsedTime}>{props.elapsedTime} s</Text>
			<Text style={styles.distance}>{parseFloat(props.distance).toFixed(2)} m</Text>
			<Text style={styles.createdAt}>{props.createdAt}</Text>
		</View>
	);
};

const HistoryScreen = props => {
	const history = useSelector(state => state.bike.history);
	const datahistory = [...history];
	datahistory.reverse();

	return (
		<View style={styles.screen}>
			<FlatList data={datahistory}
				keyExtractor={item => item.id.toString()}
				renderItem={itemData => <RowItem {...itemData.item}/>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 5
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