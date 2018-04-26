import React from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, AppRegistry } from 'react-native';
import md5 from 'md5';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import {Image} from 'react-native-expo-image-cache';
import _ from 'lodash';

let styles;
var filteredData = null;
var lastQuery;

class App extends React.PureComponent {
	constructor(){
		super();
	}

	componentWillMount() {
		this.props.fetchData();
		setInterval(() => {
			this.props.fetchData();
		},30000);
	}

	filterCustomers(query) {
		lastQuery = query;
		filteredData = _.filter(this.props.appData.data, element => {
			return element.customer.name.toLowerCase().includes(query.toLowerCase()); });
		this.forceUpdate();
		console.log(query);
	}

	render() {
		const {
			text,
			placeholder,
			placeholderText,
			mainContent,
			list,
			listRow,
			textInput
		} = styles;

		return (
			<View style={mainContent}>
				<TextInput style={textInput} editable = {true} maxLength = {40} placeholder={'Tap to search for customers...'}
					onChangeText={(text) => {this.filterCustomers(text);}} />
				{!!filteredData.length ? (
					<FlatList
						data={filteredData}
						renderItem={({item}) => <View style={listRow}>
							<Image style={{width: 50, height: 50}} {...{uri: item.customer.avatar}}></Image>
							<Text style={text}>{item.customer.name + '\nExpected Time: ' + item.expectedTime}</Text>
						</View>}
						keyExtractor={(item, index) => index.toString()} />) : <View style={placeholder}><Text style={placeholderText}>Nothing to display.</Text>></View>}
			</View>
		);
	}
}

styles = StyleSheet.create({
	text: {
		textAlign: 'left',
		fontSize: 16
	},
	placeholder: {
		width: '100%',
		height: '80%',
		alignSelf: 'stretch',
	},
	placeholderText: {
		fontSize: 22,
		textAlign: 'center',
		color: 'grey'
	},
	mainContent: {
		margin: 20,
		height: '100%'
	},
	list: {
		height: '80%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'white',
		borderWidth: 1,
		flexDirection: 'row',
	},
	listRow: {
		height: 120,
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row'
	},
	textInput: {
		alignSelf: 'stretch',
		borderWidth: 0,
		fontSize: 22,
		margin: 30,
		textAlign: 'center'
	}
});

function mapStateToProps (state) {
	if (lastQuery) { filteredData = _.filter(state.appData.data, element => {
		return element.customer.name.toLowerCase().includes(lastQuery.toLowerCase()); });  } else {filteredData = state.appData.data; }
	return {
		appData: state.appData
	};
}

function mapDispatchToProps (dispatch) {
	return {
		fetchData: () => dispatch(fetchData())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

AppRegistry.registerComponent('App', () => App);
