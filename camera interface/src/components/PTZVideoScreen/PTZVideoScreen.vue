<template>
<div class='PTZVideoScreen'>
	<div>

		<ul>
			<li class="object_list">
				<div class="navigation_menu">
					<!-- кнопка выхода -->
					<span>
						<!-- <router-link :to=""> -->
						<button type="button" name="button" @mousedown="logOut" @mouseup="logOutOff" @mouseout="logOutOff" :class="this.isPressed_1 ? 'logOutClicked' : 'logOut'">
							Выход
						</button>
						<!-- </router-link> -->
					</span>
					<!-- кнопки навигации -->
					<span v-for="item in naviReferences">
						<router-link :to=" { name: item.path} ">
							<button type="button" name="button" @mouseenter="item.hover = true" @mouseleave="item.hover = false" :class="item.hover ? 'navigationButtonMouseEnter' : 'navigationButton'">
								{{item.title}}
							</button>
						</router-link>
					</span>
				</div>
			</li>
			<li class=" object_list">

				<div class="camera_Controls">
					<!-- экран -->
					<div class="camera_ScreenControls">
						<p class="screenControlElements">
							<button type="button" name="button" class="screenControlBtn" @click="makePhoto">Фото</button>
							<button type="button" name="button" @click="startRecord" :class="this.isRecording ? 'record_On' : 'record_Off'">Запись</button>
							<select class="streamSelect" v-model="streamSelected">
								<option v-for="item in streamOptions" :value="item.text">{{item.text}}</option>
							</select>
						</p>
						<div class="camera_Screen">
							<img src="images/background.jpg" alt="background.jpg">
							<div align="center" class="dataPosition">
								<p align="center" class="dataPositionText">
									позиция по x: {{x/10}}
								</p>
								<p align="center" class="dataPositionText">
									позиция по y: {{y/10}}
								</p>
								<p align="center" class="dataPositionText">
									Скорость: {{moveSpeed}}
								</p>
								<p align="center" class="dataPositionText">
									zoom (от 1 до 10): {{zoom}}
								</p>
								<p align="center" class="dataPositionText">
									focus (от 1 до 10): {{focus}}
								</p>
							</div>
						</div>

					</div>
					<!-- управление PTZ -->
					<div class="ptzSettings">
						<center>
							<div class="PTZ_initProgress" v-show="isPressed_PTZ"> Инициализация PTZ
								<div class="loading-bar">
									<div class="percentage" :style=" {'width': startDevidedEnd + '%'}">
									</div>
								</div>
							</div>
							<ul>
								<li class="settings_list">
									<!-- Кнопки PTZ -->
									<div class="PTZ_buttons">
										<img src="images/PTZ_off.png" alt="PTZ_off.png" v-show="isPressed_Default">
										<img src="images/PTZ_off_center.png" alt="PTZ_off_center.png" v-show="isPressed_PTZ">

										<img src="images/PTZ_off_top.png" alt="PTZ_off_top.png" v-show="isPressed_Top">
										<img src="images/PTZ_off_top_act.png" alt="PTZ_off_top_act.png" v-show="isPressed_Top_Act">

										<img src="images/PTZ_off_left.png" alt="PTZ_off_left.png" v-show="isPressed_Left">
										<img src="images/PTZ_off_left_act.png" alt="PTZ_off_left_act.png" v-show="isPressed_Left_Act">


										<img src="images/PTZ_off_right.png" alt="PTZ_off_right.png" v-show="isPressed_Right">
										<img src="images/PTZ_off_right_act.png" alt="PTZ_off_right_act.png" v-show="isPressed_Right_Act">

										<img src="images/PTZ_off_bot.png" alt="PTZ_off_bot.png" v-show="isPressed_Bot">
										<img src="images/PTZ_off_bot_act.png" alt="PTZ_off_bot_act.png" v-show="isPressed_Bot_Act">

										<button @mouseover="MouseOver" :class="isMouseOver ? 'btn_up_pointer' : 'btn_up'" @mousedown="moveUp" @mouseup="moveStop" @mouseout="moveStop_mouseOut">Up</button>
										<button @mouseover="MouseOver" :class="isMouseOver ? 'btn_left_pointer' : 'btn_left'" @mousedown="moveLeft" @mouseup="moveStop" @mouseout="moveStop_mouseOut">Left</button>
										<button @mouseover="MouseOver" :class="isMouseOver ? 'btn_right_pointer' : 'btn_right'" @mousedown="moveRight" @mouseup="moveStop" @mouseout="moveStop_mouseOut">Right</button>
										<button @mouseover="MouseOver" :class="isMouseOver ? 'btn_bottom_pointer' : 'btn_bottom'" @mousedown="moveBot" @mouseup="moveStop" @mouseout="moveStop_mouseOut">Bot</button>
										<button @mouseover="MouseOver" :class="isMouseOver ? 'btn_ptz_pointer' : 'btn_ptz'" @mouseout="moveStop_mouseOut" @click="autoPTZ">PTZ</button>
									</div>
								</li>
								<!-- скорость PTZ -->
								<li class="settings_list">
									<!-- блок управления скоростью PTZ -->
									<div class="PTZ_speed">
										<!-- иконка скорость минус -->
										<span class="speed_minus">
											<img src="images/speed_left.png" alt="left">
										</span>
										<!-- ползунок -->
										<span class="spanPTZMoveSpeed">
											<input class="ptzMoveSpeed" type="range" min="1" max="10" step="1" v-model="moveSpeed" @input="setMovementSpeed" @change="sendMovementSpeed">
										</span>
										<!-- иконка скорость плюс -->
										<span class="speed_plus">
											<img src="images/speed_right.png" alt="">
										</span>
									</div>
								</li>
								<!-- zoom -->
								<li class="ZoomFocus_list">
									<div class="zoom">
										<div class="div_btn_minus">
											<button @mousedown="zoomMinus" @mouseup="pressedOff" :class="this.isPressed_2 ? 'button_minus_zoom_on' : 'button_minus_zoom_off'">
												<img src="images/minus.png" alt="">
											</button>
										</div>
										<div class="div_txt_zoom">
											<p class="textZoom">Zoom</p>
										</div>
										<div class="div_btn_plus">
											<button @mousedown="zoomPlus" @mouseup="pressedOff" :class="this.isPressed_3 ? 'button_plus_zoom_on' : 'button_plus_zoom_off'">
												<img src="images/plus.png" alt="">
											</button>
										</div>
									</div>
									<!-- focus -->
								</li>
								<li class="ZoomFocus_list">
									<div class="focus">
										<div class="div_btn_minus">
											<button @mousedown="focusMinus" @mouseup="pressedOff" :class="this.isPressed_4 ? 'button_minus_focus_on' : 'button_minus_focus_off'">
												<img src="images/minus.png" alt="">
											</button>
										</div>
										<div class="div_txt_focus">
											<p class="textFocus">
												Focus
											</p>
										</div>
										<div class="div_btn_plus">
											<button @mousedown="focusPlus" @mouseup="pressedOff" :class="this.isPressed_5 ? 'button_plus_focus_on' : 'button_plus_focus_off'">
												<img src="images/plus.png" alt="">
											</button>
										</div>
									</div>
								</li>
							</ul>
						</center>
					</div>
				</div>

			</li>
		</ul>
		<div class="footer">
			<p align="center" class="CrdntPosition">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
		</div>
	</div>
</div>
</template>

<script>
import {
	mapActions,
	mapGetters
} from 'vuex'
import axios from 'axios'

export default {
	name: "PTZVideoScreen",
	components: {},
	props: {},

	data() {
		return {
			streamSelected: 'Основной поток',
			streamOptions: [
				{
					text: 'Основной поток',
			},
				{
					text: 'Дополнительный поток',
		},
		],
			//прогрессбар
			PTZ_initProgress: 70,
			//скорость изменения координат
			moveSpeed: 5,
			//флажки для кнопок
			isRecording: false,
			isPressed_1: false,
			isPressed_2: false,
			isPressed_3: false,
			isPressed_4: false,
			isPressed_5: false,
			// флажки для PTZ
			isPressed_Default: true,
			isPressed_Top: false,
			isPressed_Right: false,
			isPressed_PTZ: false,
			isPressed_Left: false,
			isPressed_Bot: false,
			//при активной инициализации PTZ
			isPressed_Top_Act: false,
			isPressed_Right_Act: false,
			isPressed_Left_Act: false,
			isPressed_Bot_Act: false,
			//при наведении на кнопку
			isMouseOver: false,
			//настройки timeout
			timer: 0,
			interval: 200,
			initializPTZ_timer: 0,
			initInterval: 100,
			start: 0,
			end: 100,
			startDevidedEnd: 1,
			//параметры управления движением видокамеры
			movespeed: 5,
			x: 0,
			y: 90,
			shiftX: 5,
			shiftY: 5,
			zoom: 5,
			focus: 5,
			//маршрутизация
			title: 'PTZVideoScreen.vue',
			naviReferences: [
				{
					title: "Настройки",
					path: "Settings",
					hover: false,
				},
				{
					title: "Просмотр",
					path: "PTZVideoScreen",
					hover: false,
				}
			]
		}
	},
	beforeRouteEnter( to, from, next ) {
		next( vm => {
			// let lastRoute = localStorage.getItem( "name", to.name );
			let lastRoute = $cookies.get( "name" )
			if ( to.name == lastRoute ) {
				console.log( "1: " + lastRoute );
			} else {
				console.log( "2: " + lastRoute );
				vm.$router.push( { name: lastRoute } )
			}
		} )
	},
	beforeRouteLeave( to, from, next ) {
		// localStorage.setItem( "name", to.name );
		$cookies.set( "name", to.name );
		next()
	},
	created() {
		// console.log( "this.coordinates: " + coordinates.data[ 0 ].y );
		axios.get( 'http://localhost:3000/coordinates' )
			.then( coordinates => {
				console.log( "created coordinates: " + JSON.stringify( coordinates.data ) );
				this.x = coordinates.data[ 0 ].x;
				this.y = coordinates.data[ 0 ].y;
				return coordinates.data;
			} )
			.catch( ( error ) => {
				console.log( error );
				return error;
			} );
		axios.get( 'http://localhost:3000/parameters' )
			.then( parameters => {
				console.log( "created parameters: " + JSON.stringify( parameters.data ) );
				this.zoom = parameters.data[ 0 ].zoom;
				this.focus = parameters.data[ 0 ].focus;
				this.moveSpeed = parameters.data[ 0 ].moveSpeed;
				return parameters.data;
			} )
			.catch( ( error ) => {
				console.log( error );
				return error;
			} );
	},

	computed: {
		...mapGetters( [
			'COORDINATES',
			'PARAMETERS'
		] ),
	},
	watch: {
		start: function () {
			this.startDevidedEnd = ( this.start / this.end ) * 100
			console.log( "startDevidedEnd: " + this.startDevidedEnd );
			console.log( "start: " + this.start );
		},
	},
	methods: {
		...mapActions( [
			'GET_COORDINATES_FROM_API',
			'GET_PARAMETERS_FROM_API',
			'ACT_MOVE_BOT',
			'ACT_MOVE_UP',
			'ACT_MOVE_RIGHT',
			'ACT_MOVE_LEFT',
			'SET_MOVEMENT_SPEED',
			'CHANGE_ZOOM',
			'CHANGE_FOCUS'
		] ),
		MouseOver() {
			this.isMouseOver = true;
		},
		moveStop() {
			this.isPressed_Default = true;

			this.isPressed_Top = false;
			this.isPressed_Left = false;
			this.isPressed_Right = false;
			this.isPressed_Bot = false;

			this.isPressed_Top_Act = false;
			this.isPressed_Left_Act = false;
			this.isPressed_Right_Act = false;
			this.isPressed_Bot_Act = false;

			this.isPressed_PTZ = false;

			clearTimeout( this.timer );
			console.log( this.y );
		},
		moveStop_mouseOut() {
			this.isMouseOver = false;

			this.isPressed_Default = true;

			this.isPressed_Top = false;
			this.isPressed_Left = false;
			this.isPressed_Right = false;
			this.isPressed_Bot = false;

			this.isPressed_Top_Act = false;
			this.isPressed_Left_Act = false;
			this.isPressed_Right_Act = false;
			this.isPressed_Bot_Act = false;


			clearTimeout( this.timer );


			console.log( this.y );
		},
		autoPTZ() {
			if ( this.isPressed_PTZ == false ) {
				this.isPressed_PTZ = true;
				this.initializPTZ_timer = setInterval( this.autoPTZ_finish, this.initInterval )
			} else if ( this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
			}
		},
		autoPTZ_finish() {
			if ( this.isPressed_PTZ == false ) {
				clearInterval( this.initializPTZ_timer );
				this.start = 0;
				setTimeout( () => alert( "Инициализвания PTZ прервана пользователем" ) );
			} else if ( this.start >= this.end && this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
				clearInterval( this.initializPTZ_timer );
				this.start = 0;
				setTimeout( () => alert( "Инициализвания PTZ завершена" ) );
			}
			this.start++
		},
		moveLeft() {
			this.isPressed_Default = false;
			if ( this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
				this.isPressed_Left_Act = true;
			} else {
				this.isPressed_Left = true;
			}
			this.x = this.COORDINATES[ 0 ].x;
			let shiftX = Number( this.shiftX );
			this.x -= shiftX;
			if ( this.x < 0 ) {
				this.x = 3599;
			};
			this.COORDINATES[ 0 ].x = this.x;
			this.ACT_MOVE_LEFT( this.COORDINATES );
			this.timer = setTimeout( () => this.moveLeft(), this.interval );
		},
		moveRight() {
			this.isPressed_Default = false;
			if ( this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
				this.isPressed_Right_Act = true;
			} else {
				this.isPressed_Right = true;
			}
			this.x = this.COORDINATES[ 0 ].x;
			let shiftX = Number( this.shiftX );
			this.x += shiftX;
			if ( this.x > 3599 ) {
				this.x = 0;
			};
			this.COORDINATES[ 0 ].x = this.x;
			this.ACT_MOVE_RIGHT( this.COORDINATES );
			this.timer = setTimeout( () => this.moveRight(), this.interval );
		},
		moveBot() {
			this.isPressed_Default = false;
			this.isPressed_Bot = true;
			if ( this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
				this.isPressed_Bot_Act = true;
			}
			this.y = this.COORDINATES[ 0 ].y;
			let shiftY = Number( this.shiftY );
			this.y -= shiftY
			if ( this.y < 0 ) {
				this.y = 0;
			};
			this.COORDINATES[ 0 ].y = this.y;
			this.ACT_MOVE_BOT( this.COORDINATES );
			this.timer = setTimeout( () => this.moveBot(), this.interval );
		},
		moveUp() {
			this.isPressed_Default = false;
			this.isPressed_Top = true;
			if ( this.isPressed_PTZ == true ) {
				this.isPressed_PTZ = false;
				this.isPressed_Top_Act = true;
			}
			console.log( "isPressed_Top_Act: " + this.isPressed_Top_Act );
			this.y = this.COORDINATES[ 0 ].y;
			let shiftY = Number( this.shiftY );
			this.y += shiftY;
			if ( this.y > 1800 ) {
				this.y = 1800;
			};
			this.COORDINATES[ 0 ].y = this.y;
			this.ACT_MOVE_UP( this.COORDINATES );
			this.timer = setTimeout( () => this.moveUp(), this.interval );
		},
		makePhoto() {
			alert( "Выполнен скриншот" );
		},
		startRecord() {
			if ( this.isRecording == false ) {
				this.isRecording = true;
				setTimeout( () => alert( "Выполняется запись" ) );
			} else if ( this.isRecording == true ) {
				this.isRecording = false;
				setTimeout( () => alert( "Запись остановлена" ) );
			}
		},
		logOut() {
			this.isPressed_1 = true;
			setTimeout( () => alert( "Выход из учетной записи" ) );
		},
		logOutOff() {
			this.isPressed_1 = false;
		},

		//ползунки почему-то не считывают значение...
		setMovementSpeed() {
			this.shiftX = this.moveSpeed;
			this.shiftY = this.moveSpeed;
			console.log( "shiftX: " + this.shiftX );
			console.log( "shiftY: " + this.shiftY );
		},
		sendMovementSpeed() {
			this.PARAMETERS[ 0 ].moveSpeed = this.moveSpeed;
			console.log( JSON.stringify( this.PARAMETERS ) );
			this.SET_MOVEMENT_SPEED( this.PARAMETERS );
		},
		zoomMinus() {
			this.isPressed_2 = true
			this.zoom--
			if ( this.zoom < 1 ) {
				this.zoom = 1;
			}
			this.PARAMETERS[ 0 ].zoom = this.zoom
			this.CHANGE_ZOOM( this.PARAMETERS );
		},
		zoomPlus() {
			this.isPressed_3 = true
			this.zoom++
			if ( this.zoom > 10 ) {
				this.zoom = 10;
			}
			this.PARAMETERS[ 0 ].zoom = this.zoom
			this.CHANGE_ZOOM( this.PARAMETERS );
		},
		focusMinus() {
			this.isPressed_4 = true
			this.focus--
			if ( this.focus < 1 ) {
				this.focus = 1;
			}
			this.PARAMETERS[ 0 ].focus = this.focus
			this.CHANGE_FOCUS( this.PARAMETERS );
		},
		focusPlus() {
			this.isPressed_5 = true
			this.focus++
			if ( this.focus > 10 ) {
				this.focus = 10;
			}
			this.PARAMETERS[ 0 ].focus = this.focus
			this.CHANGE_FOCUS( this.PARAMETERS );
		},
		pressedOff() {
			this.isPressed_2 = false;
			this.isPressed_3 = false;
			this.isPressed_4 = false;
			this.isPressed_5 = false;
		}
	},

	mounted() {
		this.GET_COORDINATES_FROM_API()
			.then( ( response ) => {
				if ( response.data ) {
					console.log( 'mounted COORDINATES arrived' );
					console.log( JSON.stringify( response.data ) );
				}
			} )
		this.GET_PARAMETERS_FROM_API()
			.then( ( response ) => {
				if ( response.data ) {
					console.log( 'mounted PARAMETERS arrived' );
					console.log( JSON.stringify( response.data ) );
				}
			} )
	},
}
</script>

<style lang="css" src="./PTZVideoScreen.css">

</style>
