import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use( Vuex );

let store = new Vuex.Store( {
	state: {
		coordinates: {},
		parameters: {},
		settings: {},
		DaysRadio: {},
		QueueList: {},
	},

	getters: {
		COORDINATES: state => {
			return state.coordinates;
		},
		PARAMETERS: state => {
			return state.parameters;
		},
		SETTINGS: state => {
			return state.settings;
		},
		DAYSRADIO: state => {
			return state.DaysRadio;
		},
		QUEUELIST: state => {
			return state.QueueList;
		},
	},

	mutations: {
		//setter
		SET_COORDINATES_TO_STATE: ( state, coordinates ) => {
			state.coordinates = coordinates;
		},
		SET_PARAMETERS_TO_STATE: ( state, parameters ) => {
			state.parameters = parameters;
		},
		SET_SETTINGS_TO_STATE: ( state, settings ) => {
			state.settings = settings;
		},
		SET_DAYSRADIO_TO_STATE: ( state, DaysRadio ) => {
			state.DaysRadio = DaysRadio;
		},
		SET_QUEUELIST_TO_STATE: ( state, QueueList ) => {
			state.QueueList = QueueList;
		},
	},

	actions: {
		//getters
		GET_COORDINATES_FROM_API( {
			commit
		} ) {
			return axios.get( 'http://localhost:3000/coordinates' ).then( coordinates => {
					commit( 'SET_COORDINATES_TO_STATE', coordinates.data );
					return coordinates.data;
				} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		GET_PARAMETERS_FROM_API( {
			commit
		} ) {
			return axios.get( 'http://localhost:3000/parameters' ).then( parameters => {
					commit( 'SET_PARAMETERS_TO_STATE', parameters.data );
					return parameters.data;
				} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		GET_SETTINGS_FROM_API( {
			commit
		} ) {
			return axios.get( 'http://localhost:3000/settings' ).then( settings => {
					commit( 'SET_SETTINGS_TO_STATE', settings.data );
					return settings.data;
				} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		GET_DAYSRADIO_FROM_API( {
			commit
		} ) {
			return axios.get( 'http://localhost:3000/DaysRadio' ).then( DaysRadio => {
					commit( 'SET_DAYSRADIO_TO_STATE', DaysRadio.data );
					return DaysRadio.data;
				} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		GET_QUEUELIST_FROM_API( {
			commit
		} ) {
			return axios.get( 'http://localhost:3000/QueueList' ).then( QueueList => {
					commit( 'SET_QUEUELIST_TO_STATE', QueueList.data );
					return QueueList.data;
				} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},

		// ========================================================================================
		//COORDINATES
		ACT_MOVE_BOT( {
			commit
		}, coordinates ) {
			commit( 'SET_COORDINATES_TO_STATE', coordinates );
			return axios.put( 'http://localhost:3000/coordinates/0', {
					x: coordinates[ 0 ].x,
					y: coordinates[ 0 ].y,
				} )
				// .then( coordinates => {} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		ACT_MOVE_UP( {
			commit
		}, coordinates ) {
			commit( 'SET_COORDINATES_TO_STATE', coordinates );
			return axios.put( 'http://localhost:3000/coordinates/0', {
					x: coordinates[ 0 ].x,
					y: coordinates[ 0 ].y,
				} )
				// .then( coordinates => {} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		ACT_MOVE_RIGHT( {
			commit
		}, coordinates ) {
			commit( 'SET_COORDINATES_TO_STATE', coordinates );
			return axios.put( 'http://localhost:3000/coordinates/0', {
					x: coordinates[ 0 ].x,
					y: coordinates[ 0 ].y,
				} )
				// .then( coordinates => {} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		ACT_MOVE_LEFT( {
			commit
		}, coordinates ) {
			commit( 'SET_COORDINATES_TO_STATE', coordinates );
			return axios.put( 'http://localhost:3000/coordinates/0', {
					x: coordinates[ 0 ].x,
					y: coordinates[ 0 ].y,
				} )
				// .then( coordinates => {} )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		//__________________________________________________________________________
		//PARAMETERS
		SET_MOVEMENT_SPEED( {
			commit
		}, parameters ) {
			commit( 'SET_PARAMETERS_TO_STATE', parameters );
			return axios.put( 'http://localhost:3000/parameters/0', {
					moveSpeed: parameters[ 0 ].moveSpeed,
					zoom: parameters[ 0 ].zoom,
					focus: parameters[ 0 ].focus
				} )
				// .then( parameters => {
				// 	console.log( "res: " + JSON.stringify( parameters.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		CHANGE_ZOOM( {
			commit
		}, parameters ) {
			commit( 'SET_PARAMETERS_TO_STATE', parameters );
			return axios.put( 'http://localhost:3000/parameters/0', {
					moveSpeed: parameters[ 0 ].moveSpeed,
					zoom: parameters[ 0 ].zoom,
					focus: parameters[ 0 ].focus
				} )
				// .then( parameters => {
				// 	console.log( "res: " + JSON.stringify( parameters.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		CHANGE_FOCUS( {
			commit
		}, parameters ) {
			commit( 'SET_PARAMETERS_TO_STATE', parameters );
			return axios.put( 'http://localhost:3000/parameters/0', {
					moveSpeed: parameters[ 0 ].moveSpeed,
					zoom: parameters[ 0 ].zoom,
					focus: parameters[ 0 ].focus
				} )
				// .then( parameters => {
				// 	console.log( "res: " + JSON.stringify( parameters.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},

		//===========================================================================
		//SETTINGS 0
		SET_DEVICE_NAME( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/0', {
					deviceName: settings[ 0 ].deviceName,
					MAC_addr: settings[ 0 ].MAC_addr,
					company: settings[ 0 ].company
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_MAC_ADDR( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/0', {
					deviceName: settings[ 0 ].deviceName,
					MAC_addr: settings[ 0 ].MAC_addr,
					company: settings[ 0 ].company
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_COMPANY( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/0', {
					deviceName: settings[ 0 ].deviceName,
					MAC_addr: settings[ 0 ].MAC_addr,
					company: settings[ 0 ].company
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		// SETTINGS 1
		SET_SETTINGS_1( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/1', {
					Brightness: settings[ 1 ].Brightness,
					Saturation: settings[ 1 ].Saturation,
					Contrast: settings[ 1 ].Contrast
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_SETTINGS_2( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/2', {
					IDstreamSelected: settings[ 2 ].IDstreamSelected,
					ResolutionSelected: settings[ 2 ].ResolutionSelected,
					SubResolutionSelected: settings[ 2 ].SubResolutionSelected,
					FrameInterval: settings[ 2 ].FrameInterval,
					Bitrate: settings[ 2 ].Bitrate,
					FPS_set: settings[ 2 ].FPS_set
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_SETTINGS_3( {
			commit
		}, settings ) {
			commit( 'SET_SETTINGS_TO_STATE', settings );
			return axios.put( 'http://localhost:3000/settings/3', {
					Sensivity: settings[ 3 ].Sensivity,
					Threshold: settings[ 3 ].Threshold
				} )
				// .then( settings => {
				// 	console.log( "res: " + JSON.stringify( settings.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},

		//DAYSRADIO
		SET_DAYSRADIO_0( {
			commit
		}, DaysRadio ) {
			commit( 'SET_DAYSRADIO_TO_STATE', DaysRadio );
			return axios.put( 'http://localhost:3000/DaysRadio/0', {
					DayPicked: DaysRadio[ 0 ].DayPicked
				} )
				// .then( DaysRadio => {
				// 	console.log( "res: " + JSON.stringify( DaysRadio.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_DAYSRADIO_1( {
			commit
		}, DaysRadio ) {
			commit( 'SET_DAYSRADIO_TO_STATE', DaysRadio );
			return axios.put( 'http://localhost:3000/DaysRadio/1', {
					isChecked_All_time: DaysRadio[ 1 ].isChecked_All_time
				} )
				// .then( DaysRadio => {
				// 	console.log( "res: " + JSON.stringify( DaysRadio.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		//queue list
		SET_QUEUELIST_0( {
			commit
		}, QueueList ) {
			commit( 'SET_QUEUELIST_TO_STATE', QueueList );
			return axios.put( 'http://localhost:3000/QueueList/0', {
					isChecked_0_0: QueueList[ 0 ].isChecked_0_0,
					isChecked_0_1: QueueList[ 0 ].isChecked_0_1,
					isChecked_0_2: QueueList[ 0 ].isChecked_0_2,
					isChecked_1_0: QueueList[ 0 ].isChecked_1_0,
					isChecked_1_1: QueueList[ 0 ].isChecked_1_1,
					isChecked_1_2: QueueList[ 0 ].isChecked_1_2,
					isChecked_2_0: QueueList[ 0 ].isChecked_2_0,
					isChecked_2_1: QueueList[ 0 ].isChecked_2_1,
					isChecked_2_2: QueueList[ 0 ].isChecked_2_2,
					isChecked_3_0: QueueList[ 0 ].isChecked_3_0,
					isChecked_3_1: QueueList[ 0 ].isChecked_3_1,
					isChecked_3_2: QueueList[ 0 ].isChecked_3_2,
					isChecked_4_0: QueueList[ 0 ].isChecked_4_0,
					isChecked_4_1: QueueList[ 0 ].isChecked_4_1,
					isChecked_4_2: QueueList[ 0 ].isChecked_4_2,
					isChecked_5_0: QueueList[ 0 ].isChecked_5_0,
					isChecked_5_1: QueueList[ 0 ].isChecked_5_1,
					isChecked_5_2: QueueList[ 0 ].isChecked_5_2,
					isChecked_6_0: QueueList[ 0 ].isChecked_6_0,
					isChecked_6_1: QueueList[ 0 ].isChecked_6_1,
					isChecked_6_2: QueueList[ 0 ].isChecked_6_2
				} )
				// .then( DaysRadio => {
				// 	console.log( "res: " + JSON.stringify( DaysRadio.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
		SET_QUEUELIST_1( {
			commit
		}, QueueList ) {
			commit( 'SET_QUEUELIST_TO_STATE', QueueList );
			return axios.put( 'http://localhost:3000/QueueList/1', {

					time_from_0_0: QueueList[ 1 ].time_from_0_0,
					time_to_0_0: QueueList[ 1 ].time_to_0_0,
					time_from_0_1: QueueList[ 1 ].time_from_0_1,
					time_to_0_1: QueueList[ 1 ].time_to_0_1,
					time_from_0_2: QueueList[ 1 ].time_from_0_2,
					time_to_0_2: QueueList[ 1 ].time_to_0_2,

					time_from_1_0: QueueList[ 1 ].time_from_1_0,
					time_to_1_0: QueueList[ 1 ].time_to_1_0,
					time_from_1_1: QueueList[ 1 ].time_from_1_1,
					time_to_1_1: QueueList[ 1 ].time_to_1_1,
					time_from_1_2: QueueList[ 1 ].time_from_1_2,
					time_to_1_2: QueueList[ 1 ].time_to_1_2,

					time_from_2_0: QueueList[ 1 ].time_from_2_0,
					time_to_2_0: QueueList[ 1 ].time_to_2_0,
					time_from_2_1: QueueList[ 1 ].time_from_2_1,
					time_to_2_1: QueueList[ 1 ].time_to_2_1,
					time_from_2_2: QueueList[ 1 ].time_from_2_2,
					time_to_2_2: QueueList[ 1 ].time_to_2_2,

					time_from_3_0: QueueList[ 1 ].time_from_3_0,
					time_to_3_0: QueueList[ 1 ].time_to_3_0,
					time_from_3_1: QueueList[ 1 ].time_from_3_1,
					time_to_3_1: QueueList[ 1 ].time_to_3_1,
					time_from_3_2: QueueList[ 1 ].time_from_3_2,
					time_to_3_2: QueueList[ 1 ].time_to_3_2,

					time_from_4_0: QueueList[ 1 ].time_from_4_0,
					time_to_4_0: QueueList[ 1 ].time_to_4_0,
					time_from_4_1: QueueList[ 1 ].time_from_4_1,
					time_to_4_1: QueueList[ 1 ].time_to_4_1,
					time_from_4_2: QueueList[ 1 ].time_from_4_2,
					time_to_4_2: QueueList[ 1 ].time_to_4_2,

					time_from_5_0: QueueList[ 1 ].time_from_5_0,
					time_to_5_0: QueueList[ 1 ].time_to_5_0,
					time_from_5_1: QueueList[ 1 ].time_from_5_1,
					time_to_5_1: QueueList[ 1 ].time_to_5_1,
					time_from_5_2: QueueList[ 1 ].time_from_5_2,
					time_to_5_2: QueueList[ 1 ].time_to_5_2,

					time_from_6_0: QueueList[ 1 ].time_from_6_0,
					time_to_6_0: QueueList[ 1 ].time_to_6_0,
					time_from_6_1: QueueList[ 1 ].time_from_6_1,
					time_to_6_1: QueueList[ 1 ].time_to_6_1,
					time_from_6_2: QueueList[ 1 ].time_from_6_2,
					time_to_6_2: QueueList[ 1 ].time_to_6_2,

				} )
				// .then( DaysRadio => {
				// 	console.log( "res: " + JSON.stringify( DaysRadio.data ) );
				// } )
				.catch( ( error ) => {
					console.log( error );
					return error;
				} );
		},
	},
} );

export default store;
