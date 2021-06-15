<template>
<div class="settings">
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
					<router-link :to="{ name: item.path }">
						<button type="button" name="button" @mouseenter="item.hover = true" @mouseleave="item.hover = false" :class="
							item.hover ? 'navigationButtonMouseEnter' : 'navigationButton'
							">
							{{ item.title }}
						</button>
					</router-link>
				</span>
			</div>
		</li>
		<li class="object_list">
			<div class="settingsCommon">
				<!-- персональные данные устройства -->
				<div class="CommonPersonel">
		<li class="list_settings">
			<div class="divPersonalData">
				<p class="pPersonalData">Персональные данные устройства</p>
			</div>
		</li>
		<li class="list_settings">
			<div class="Div_InputDeviceName">
				<p class="pInput">Имя устройства:</p>
				<input v-model="deviceName" placeholder="Имя устройства" class="inputDeviceName" @change="sendDeviceName" />
			</div>
		</li>
		<li class="list_settings">
			<div class="Div_InputMacAddr">
				<p class="pInput">MAC-адрес устройства:</p>
				<input v-model="MAC_addr" placeholder="MAC-адрес устройства" class="inputMacAddr" @change="sendMAC_addr" />
			</div>
		</li>
		<li class="list_settings">
			<div class="Div_InputCompany">
				<p class="pInput">Название организации:</p>
				<input v-model="company" placeholder="Название организации" class="inputCompany" @change="sendCompany" />
			</div>
		</li>
</div>
<!-- настройки изображения -->
<div class="CommonPicture">
	<li class="list_settings">
		<div class="divPictureSettings">
			<p class="pPictureSettings">Настройки изображения</p>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Brightness">
			<p class="pInput">Яркость:</p>
			<input class="Brighness" type="range" min="1" max="100" step="1" v-model="Brightness" @input="setBrightness" @change="sendBrightness" />
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Saturation">
			<p class="pInput">Насыщенность:</p>
			<input class="Saturation" type="range" min="1" max="100" step="1" v-model="Saturation" @input="setSaturation" @change="sendSaturation" />
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Contrast">
			<p class="pInput">Контрастность:</p>
			<input class="Contrast" type="range" min="1" max="100" step="1" v-model="Contrast" @input="setContrast" @change="sendContrast" />
		</div>
	</li>
</div>
<!-- настройки потока -->
<div class="CommonStream">
	<li class="list_settings">
		<div class="divStreamSettings">
			<p class="pStreamSettings">Настройки потока</p>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Stream">
			<p class="pInput">ID потока:</p>
			<select class="IDstreamSelect" v-model="IDstreamSelected" @change="sendIDstreamSelected">
				<option v-for="item in streamOptions" :value="item.text">{{
									item.text
								}}</option>
			</select>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Resolution">
			<p class="pInput">Разрешение:</p>
			<select class="ResolutionSelect" v-model="ResolutionSelected" v-show="isMainStream" @change="sendResolutionSelected">
				<option v-for="item in resolutionOptions" :value="item.text">{{item.text}}</option>
			</select>
			<select class="ResolutionSelect" v-model="SubResolutionSelected" v-show="isSubStream" @change="sendSubResolutionSelected">
				<option v-for="item in SubResolutionOptions" :value="item.text">{{ item.text }}</option>
			</select>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_FrameInterval">
			<p class="pInput">Интервал кадров:</p>
			<input class="FrameInterval" type="number" min="1" max="120" step="1" v-model="FrameInterval" @change="FrameIntervalChanged" />
			<p class="pInputBlue">( 1-120)</p>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_Bitrate">
			<p class="pInput">Скорость передачи:</p>
			<input class="Bitrate" type="number" min="1" max="999999999999" step="1" v-model="Bitrate" @change="BitrateChanged" />
			<p class="pInputBlue">( 1-120)</p>
		</div>
	</li>
	<li class="list_settings">
		<div class="Div_FPS">
			<p class="pInput">Частота кадров:</p>
			<select class="FPS_select" v-model="FPS_set" @change="FPS_setChanged">
				<option v-for="item in FPSOptions" :value="Number(item.text)">{{ item.text }}</option>
			</select>
			<p class="pInputBlue">( 1-25)</p>
		</div>
	</li>
</div>
</div>
<div class="settingsAlarm">
	<div class="alarm_queue">
		<p class="pAlarm">Настройки расписания</p>
		<input v-model="isChecked_All_time" class="check_All_time" type="checkbox" name="check_All_time">
		<label class="all_time_label" for="check_All_time">Круглосуточно</label>
		<div class="div_Days">
			<span v-for="item in DaysRadio">
				<input type="radio" :id="item.day" :value="item.day" v-model="DayPicked">
				<label :for="item.day">{{item.text}}</label>
			</span>

			<!-- ======================================= расписание ==============================================-->
			<div class="Queues">
				<!-- =========================================================================================== monday -->
				<div class="queuesOption" v-show="isMonday">

					<span>
						<input class="QueueCheck" id="QueueList_Monday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_0_0">
						<label class="QueueCheck_label" for="QueueList_Monday_text_1">{{QueueList_Monday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_0_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_0_0">
					</span>
				</div>

				<div class="queuesOption" v-show="isMonday">
					<span>
						<input class="QueueCheck" id="QueueList_Monday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_0_1">
						<label class="QueueCheck_label" for="QueueList_Monday_text_2">{{QueueList_Monday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_0_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_0_1">
					</span>
				</div>

				<div class="queuesOption" v-show="isMonday">
					<span>
						<input class="QueueCheck" id="QueueList_Monday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_0_2">
						<label class="QueueCheck_label" for="QueueList_Monday_text_3">{{QueueList_Monday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_0_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_0_2">
					</span>
				</div>

				<!-- ============================================================================================= tuesday -->
				<div class="queuesOption" v-show="isTuesday">

					<span>
						<input class="QueueCheck" id="QueueList_Tuesday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_1_0">
						<label class="QueueCheck_label" for="QueueList_Tuesday_text_1">{{QueueList_Tuesday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_1_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_1_0">
					</span>

				</div>
				<div class="queuesOption" v-show="isTuesday">

					<span>
						<input class="QueueCheck" id="QueueList_Tuesday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_1_1">
						<label class="QueueCheck_label" for="QueueList_Tuesday_text_2">{{QueueList_Tuesday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_1_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_1_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isTuesday">

					<span>
						<input class="QueueCheck" id="QueueList_Tuesday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_1_2">
						<label class="QueueCheck_label" for="QueueList_Tuesday_text_3">{{QueueList_Tuesday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_1_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_1_2">
					</span>
				</div>

				<!-- =============================================================================================== wednesday -->
				<div class="queuesOption" v-show="isWednesday">

					<span>
						<input class="QueueCheck" id="QueueList_Wednesday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_2_0">
						<label class="QueueCheck_label" for="QueueList_Wednesday_text_1">{{QueueList_Wednesday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_2_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_2_0">
					</span>
				</div>
				<div class="queuesOption" v-show="isWednesday">

					<span>
						<input class="QueueCheck" id="QueueList_Wednesday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_2_1">
						<label class="QueueCheck_label" for="QueueList_Wednesday_text_2">{{QueueList_Wednesday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_2_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_2_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isWednesday">

					<span>
						<input class="QueueCheck" id="QueueList_Wednesday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_2_2">
						<label class="QueueCheck_label" for="QueueList_Wednesday_text_3">{{QueueList_Wednesday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_2_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_2_2">
					</span>
				</div>

				<!-- ========================================================================= =======================Thursday -->
				<div class="queuesOption" v-show="isThursday">

					<span>
						<input class="QueueCheck" id="QueueList_Thursday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_3_0">
						<label class="QueueCheck_label" for="QueueList_Thursday_text_1">{{QueueList_Thursday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_3_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_3_0">
					</span>
				</div>
				<div class="queuesOption" v-show="isThursday">

					<span>
						<input class="QueueCheck" id="QueueList_Thursday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_3_1">
						<label class="QueueCheck_label" for="QueueList_Thursday_text_2">{{QueueList_Thursday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_3_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_3_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isThursday">

					<span>
						<input class="QueueCheck" id="QueueList_Thursday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_3_2">
						<label class="QueueCheck_label" for="QueueList_Thursday_text_3">{{QueueList_Thursday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_3_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_3_2">
					</span>
				</div>

				<!-- ================================================================================================ Friday -->
				<div class="queuesOption" v-show="isFriday">

					<span>
						<input class="QueueCheck" id="QueueList_Friday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_4_0">
						<label class="QueueCheck_label" for="QueueList_Friday_text_1">{{QueueList_Friday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_4_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_4_0">
					</span>

				</div>
				<div class="queuesOption" v-show="isFriday">

					<span>
						<input class="QueueCheck" id="QueueList_Friday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_4_1">
						<label class="QueueCheck_label" for="QueueList_Friday_text_2">{{QueueList_Friday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_4_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_4_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isFriday">

					<span>
						<input class="QueueCheck" id="QueueList_Friday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_4_2">
						<label class="QueueCheck_label" for="QueueList_Friday_text_3">{{QueueList_Friday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_4_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_4_2">
					</span>
				</div>
				<!-- =============================================================================================== Saturday -->
				<div class="queuesOption" v-show="isSaturday">

					<span>
						<input class="QueueCheck" id="QueueList_Saturday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_5_0">
						<label class="QueueCheck_label" for="QueueList_Saturday_text_1">{{QueueList_Saturday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_5_0">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_5_0">
					</span>

				</div>
				<div class="queuesOption" v-show="isSaturday">

					<span>
						<input class="QueueCheck" id="QueueList_Saturday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_5_1">
						<label class="QueueCheck_label" for="QueueList_Saturday_text_2">{{QueueList_Saturday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_5_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_5_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isSaturday">

					<span>
						<input class="QueueCheck" id="QueueList_Saturday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_5_2">
						<label class="QueueCheck_label" for="QueueList_Saturday_text_3">{{QueueList_Saturday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_5_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_5_2">
					</span>
				</div>

				<!-- ================================================================================================ Sunday -->
				<div class="queuesOption" v-show="isSunday">

					<span>
						<input class="QueueCheck" id="QueueList_Sunday_text_1" type="checkbox" name="QueueCheck" v-model="isChecked_6_0">
						<label class="QueueCheck_label" for="QueueList_Sunday_text_1">{{QueueList_Sunday_text_1}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_6_0">
					</span>
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_6_0">
					</span>

				</div>
				<div class="queuesOption" v-show="isSunday">

					<span>
						<input class="QueueCheck" id="QueueList_Sunday_text_2" type="checkbox" name="QueueCheck" v-model="isChecked_6_1">
						<label class="QueueCheck_label" for="QueueList_Sunday_text_2">{{QueueList_Sunday_text_2}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_6_1">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_6_1">
					</span>

				</div>
				<div class="queuesOption" v-show="isSunday">

					<span>
						<input class="QueueCheck" id="QueueList_Sunday_text_3" type="checkbox" name="QueueCheck" v-model="isChecked_6_2">
						<label class="QueueCheck_label" for="QueueList_Sunday_text_3">{{QueueList_Sunday_text_3}}</label>
					</span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_from_6_2">
					</span>
					<span> - </span>
					<span>
						<input type="time" name="cron" min="00:00:00" max="23:59:59" v-model="time_to_6_2">
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="Detection">
		<p class="pDetection">Область обнаружения</p>
		<div class="Div_Sensivity">
			<p class="pInput">Чувствительность:</p>
			<input class="Sensivity" type="range" min="1" max="100" step="1" v-model="Sensivity" @input="setSensivity" @change="sendSensivity" />
		</div><br>
		<div class="Div_Threshold">
			<p class="pInput">Пороговый сигнал:</p>
			<input class="Threshold" type="range" min="1" max="100" step="1" v-model="Threshold" @input="setThreshold" @change="sendThreshold" />
		</div><br>
	</div>
	<div class="DetectionArea">
		<img src="images/DetectArea.jpg" alt="background.jpg">
	</div>
</div>

</li>
<li class="object_list">
	<div class="footer">
		<p align="center">
			labelabracadabra Lorem ipsum dolor sit amet, consectetur adipisicing
			elit. Molestias, iste.
		</p>
	</div>
</li>
</ul>


</div>
</template>

<script>
import {
	mapActions,
	mapGetters
}
from 'vuex'
import axios from 'axios'
export default {
	name: "Settings",
	data() {
		return {
			title: 'Settings.vue',
			//v-models
			deviceName: '',
			MAC_addr: '',
			company: '',
			Brightness: 50,
			Saturation: 50,
			Contrast: 50,
			Sensivity: 50,
			Threshold: 50,
			IDstreamSelected: 'Основной поток',
			ResolutionSelected: '2560x1440',
			SubResolutionSelected: '1024x768',
			FrameInterval: 75,
			Bitrate: 6000,
			FPS_set: 25,
			isChecked_All_time: false,
			DayPicked: 'Monday',

			//флажки стилей
			isPressed_1: false,
			//флажки v-show
			isMainStream: true,
			isSubStream: false,

			isMonday: true,
			isTuesday: false,
			isWednesday: false,
			isThursday: false,
			isFriday: false,
			isSaturday: false,
			isSunday: false,
			//навигация
			naviReferences: [
				{
					title: "Настройки",
					path: "Settings",
					hover: false,
					picked: false
				},
				{
					title: "Просмотр",
					path: "PTZVideoScreen",
					hover: false,
					picked: false
				} ],
			streamOptions: [
				{ text: 'Основной поток', }, { text: 'Дополнительный поток', }
			],
			resolutionOptions: [
				{ text: '2560x1440', }, { text: '1920x1080', }, { text: '1600x900', }, { text: '1366x768', },
			],
			SubResolutionOptions: [
				{ text: '1024x768', }, { text: '800x600', }, { text: '640x480', },
			],
			FPSOptions: [
				{ text: 1 }, { text: 2 }, { text: 3 }, { text: 4 }, { text: 5 }, { text: 6 }, { text: 7 }, { text: 8 },
				{ text: 9 }, { text: 10 }, { text: 11 }, { text: 12 }, { text: 13 }, { text: 14 }, { text: 15 }, { text: 16 }, { text: 17 },
				{ text: 18 }, { text: 19 }, { text: 20 }, { text: 21 }, { text: 22 }, { text: 23 }, { text: 24 }, { text: 25 },
			],
			DaysRadio: [
				{ day: 'Monday', text: 'Понедельник' }, { day: 'Tuesday', text: 'Вторник' }, { day: 'Wednesday', text: 'Среда' },
				{ day: 'Thursday', text: 'Четверг' }, { day: 'Friday', text: 'Пятница' }, { day: 'Saturday', text: 'Суббота' }, { day: 'Sunday', text: 'Воскресенье' },
			],

			//расписания

			//понедельник
			QueueList_Monday_text_1: 'Расписание 1',
			QueueList_Monday_text_2: 'Расписание 2',
			QueueList_Monday_text_3: 'Расписание 3',
			//вторник
			QueueList_Tuesday_text_1: 'Расписание 1',
			QueueList_Tuesday_text_2: 'Расписание 2',
			QueueList_Tuesday_text_3: 'Расписание 3',
			//среда
			QueueList_Wednesday_text_1: 'Расписание 1',
			QueueList_Wednesday_text_2: 'Расписание 2',
			QueueList_Wednesday_text_3: 'Расписание 3',
			//четверг
			QueueList_Thursday_text_1: 'Расписание 1',
			QueueList_Thursday_text_2: 'Расписание 2',
			QueueList_Thursday_text_3: 'Расписание 3',
			//пятница
			QueueList_Friday_text_1: 'Расписание 1',
			QueueList_Friday_text_2: 'Расписание 2',
			QueueList_Friday_text_3: 'Расписание 3',
			//суббота
			QueueList_Saturday_text_1: 'Расписание 1',
			QueueList_Saturday_text_2: 'Расписание 2',
			QueueList_Saturday_text_3: 'Расписание 3',
			//воскресенье
			QueueList_Sunday_text_1: 'Расписание 1',
			QueueList_Sunday_text_2: 'Расписание 2',
			QueueList_Sunday_text_3: 'Расписание 3',

			//флажки v-model расписаний
			//monday
			isChecked_0_0: false,
			isChecked_0_1: false,
			isChecked_0_2: false,
			//tuesday
			isChecked_1_0: false,
			isChecked_1_1: false,
			isChecked_1_2: false,
			//wednesday
			isChecked_2_0: false,
			isChecked_2_1: false,
			isChecked_2_2: false,
			//thursday
			isChecked_3_0: false,
			isChecked_3_1: false,
			isChecked_3_2: false,
			//friday
			isChecked_4_0: false,
			isChecked_4_1: false,
			isChecked_4_2: false,
			//saturday
			isChecked_5_0: false,
			isChecked_5_1: false,
			isChecked_5_2: false,
			//sunday
			isChecked_6_0: false,
			isChecked_6_1: false,
			isChecked_6_2: false,

			//time
			//monday
			time_from_0_0: "00:00:00",
			time_to_0_0: "00:00:00",
			time_from_0_1: "00:00:00",
			time_to_0_1: "00:00:00",
			time_from_0_2: "00:00:00",
			time_to_0_2: "00:00:00",
			//tuesday
			time_from_1_0: "00:00:00",
			time_to_1_0: "00:00:00",
			time_from_1_1: "00:00:00",
			time_to_1_1: "00:00:00",
			time_from_1_2: "00:00:00",
			time_to_1_2: "00:00:00",
			//wednesday
			time_from_2_0: "00:00:00",
			time_to_2_0: "00:00:00",
			time_from_2_1: "00:00:00",
			time_to_2_1: "00:00:00",
			time_from_2_2: "00:00:00",
			time_to_2_2: "00:00:00",
			//thursday
			time_from_3_0: "00:00:00",
			time_to_3_0: "00:00:00",
			time_from_3_1: "00:00:00",
			time_to_3_1: "00:00:00",
			time_from_3_2: "00:00:00",
			time_to_3_2: "00:00:00",
			//friday
			time_from_4_0: "00:00:00",
			time_to_4_0: "00:00:00",
			time_from_4_1: "00:00:00",
			time_to_4_1: "00:00:00",
			time_from_4_2: "00:00:00",
			time_to_4_2: "00:00:00",
			//saturday
			time_from_5_0: "00:00:00",
			time_to_5_0: "00:00:00",
			time_from_5_1: "00:00:00",
			time_to_5_1: "00:00:00",
			time_from_5_2: "00:00:00",
			time_to_5_2: "00:00:00",
			//sunday
			time_from_6_0: "00:00:00",
			time_to_6_0: "00:00:00",
			time_from_6_1: "00:00:00",
			time_to_6_1: "00:00:00",
			time_from_6_2: "00:00:00",
			time_to_6_2: "00:00:00",
		}
	},
	beforeRouteLeave( to, from, next ) {
		// localStorage.setItem( "name", to.name );
		$cookies.set( "name", to.name );
		next()
	},
	created() {
		axios.get( 'http://localhost:3000/settings' )
			.then( settings => {
				//id 0
				this.deviceName = settings.data[ 0 ].deviceName;
				this.MAC_addr = settings.data[ 0 ].MAC_addr;
				this.company = settings.data[ 0 ].company;
				//id 1
				this.Brightness = settings.data[ 1 ].Brightness;
				this.Saturation = settings.data[ 1 ].Saturation;
				this.Contrast = settings.data[ 1 ].Contrast;
				//id 2
				this.IDstreamSelected = settings.data[ 2 ].IDstreamSelected;
				this.ResolutionSelected = settings.data[ 2 ].ResolutionSelected;
				this.SubResolutionSelected = settings.data[ 2 ].SubResolutionSelected;
				this.FrameInterval = settings.data[ 2 ].FrameInterval;
				this.Bitrate = settings.data[ 2 ].Bitrate;
				this.FPS_set = settings.data[ 2 ].FPS_set;
				//id 3
				this.Sensivity = settings.data[ 3 ].Sensivity;
				this.Threshold = settings.data[ 3 ].Threshold;


				return settings.data;
			} )
			.catch( ( error ) => {
				console.log( error );
				return error;
			} );
		axios.get( 'http://localhost:3000/DaysRadio' )
			.then( DaysRadio => {
				this.DayPicked = DaysRadio.data[ 0 ].DayPicked;
				this.isChecked_All_time = DaysRadio.data[ 1 ].isChecked_All_time;
				return DaysRadio.data;
			} )
			.catch( ( error ) => {
				console.log( error );
				return error;
			} );
		axios.get( 'http://localhost:3000/QueueList' )
			.then( QueueList => {

				this.isChecked_0_0 = QueueList.data[ 0 ].isChecked_0_0;
				this.isChecked_0_1 = QueueList.data[ 0 ].isChecked_0_1;
				this.isChecked_0_2 = QueueList.data[ 0 ].isChecked_0_2;
				this.isChecked_1_0 = QueueList.data[ 0 ].isChecked_1_0;
				this.isChecked_1_1 = QueueList.data[ 0 ].isChecked_1_1;
				this.isChecked_1_2 = QueueList.data[ 0 ].isChecked_1_2;
				this.isChecked_2_0 = QueueList.data[ 0 ].isChecked_2_0;
				this.isChecked_2_1 = QueueList.data[ 0 ].isChecked_2_1;
				this.isChecked_2_2 = QueueList.data[ 0 ].isChecked_2_2;
				this.isChecked_3_0 = QueueList.data[ 0 ].isChecked_3_0;
				this.isChecked_3_1 = QueueList.data[ 0 ].isChecked_3_1;
				this.isChecked_3_2 = QueueList.data[ 0 ].isChecked_3_2;
				this.isChecked_4_0 = QueueList.data[ 0 ].isChecked_4_0;
				this.isChecked_4_1 = QueueList.data[ 0 ].isChecked_4_1;
				this.isChecked_4_2 = QueueList.data[ 0 ].isChecked_4_2;
				this.isChecked_5_0 = QueueList.data[ 0 ].isChecked_5_0;
				this.isChecked_5_1 = QueueList.data[ 0 ].isChecked_5_1;
				this.isChecked_5_2 = QueueList.data[ 0 ].isChecked_5_2;
				this.isChecked_6_0 = QueueList.data[ 0 ].isChecked_6_0;
				this.isChecked_6_1 = QueueList.data[ 0 ].isChecked_6_1;
				this.isChecked_6_2 = QueueList.data[ 0 ].isChecked_6_2;

				this.time_from_0_0 = QueueList.data[ 1 ].time_from_0_0
				this.time_to_0_0 = QueueList.data[ 1 ].time_to_0_0
				this.time_from_0_1 = QueueList.data[ 1 ].time_from_0_1
				this.time_to_0_1 = QueueList.data[ 1 ].time_to_0_1
				this.time_from_0_2 = QueueList.data[ 1 ].time_from_0_2
				this.time_to_0_2 = QueueList.data[ 1 ].time_to_0_2

				this.time_from_1_0 = QueueList.data[ 1 ].time_from_1_0
				this.time_to_1_0 = QueueList.data[ 1 ].time_to_1_0
				this.time_from_1_1 = QueueList.data[ 1 ].time_from_1_1
				this.time_to_1_1 = QueueList.data[ 1 ].time_to_1_1
				this.time_from_1_2 = QueueList.data[ 1 ].time_from_1_2
				this.time_to_1_2 = QueueList.data[ 1 ].time_to_1_2

				this.time_from_2_0 = QueueList.data[ 1 ].time_from_2_0
				this.time_to_2_0 = QueueList.data[ 1 ].time_to_2_0
				this.time_from_2_1 = QueueList.data[ 1 ].time_from_2_1
				this.time_to_2_1 = QueueList.data[ 1 ].time_to_2_1
				this.time_from_2_2 = QueueList.data[ 1 ].time_from_2_2
				this.time_to_2_2 = QueueList.data[ 1 ].time_to_2_2

				this.time_from_3_0 = QueueList.data[ 1 ].time_from_3_0
				this.time_to_3_0 = QueueList.data[ 1 ].time_to_3_0
				this.time_from_3_1 = QueueList.data[ 1 ].time_from_3_1
				this.time_to_3_1 = QueueList.data[ 1 ].time_to_3_1
				this.time_from_3_2 = QueueList.data[ 1 ].time_from_3_2
				this.time_to_3_2 = QueueList.data[ 1 ].time_to_3_2

				this.time_from_4_0 = QueueList.data[ 1 ].time_from_4_0
				this.time_to_4_0 = QueueList.data[ 1 ].time_to_4_0
				this.time_from_4_1 = QueueList.data[ 1 ].time_from_4_1
				this.time_to_4_1 = QueueList.data[ 1 ].time_to_4_1
				this.time_from_4_2 = QueueList.data[ 1 ].time_from_4_2
				this.time_to_4_2 = QueueList.data[ 1 ].time_to_4_2

				this.time_from_5_0 = QueueList.data[ 1 ].time_from_5_0
				this.time_to_5_0 = QueueList.data[ 1 ].time_to_5_0
				this.time_from_5_1 = QueueList.data[ 1 ].time_from_5_1
				this.time_to_5_1 = QueueList.data[ 1 ].time_to_5_1
				this.time_from_5_2 = QueueList.data[ 1 ].time_from_5_2
				this.time_to_5_2 = QueueList.data[ 1 ].time_to_5_2

				this.time_from_6_0 = QueueList.data[ 1 ].time_from_6_0
				this.time_to_6_0 = QueueList.data[ 1 ].time_to_6_0
				this.time_from_6_1 = QueueList.data[ 1 ].time_from_6_1
				this.time_to_6_1 = QueueList.data[ 1 ].time_to_6_1
				this.time_from_6_2 = QueueList.data[ 1 ].time_from_6_2
				this.time_to_6_2 = QueueList.data[ 1 ].time_to_6_2

				return QueueList.data;
			} )
			.catch( ( error ) => {
				console.log( error );
				return error;
			} );
	},
	computed: {
		...mapGetters( [
			'SETTINGS',
			'DAYSRADIO',
			'QUEUELIST',
			] ),
	},
	watch: {


		//monday
		isChecked_0_0: function () {
			this.QUEUELIST[ 0 ].isChecked_0_0 = this.isChecked_0_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_0_1: function () {
			this.QUEUELIST[ 0 ].isChecked_0_1 = this.isChecked_0_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_0_2: function () {
			this.QUEUELIST[ 0 ].isChecked_0_2 = this.isChecked_0_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//tuesday
		isChecked_1_0: function () {
			this.QUEUELIST[ 0 ].isChecked_1_0 = this.isChecked_1_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_1_1: function () {
			this.QUEUELIST[ 0 ].isChecked_1_1 = this.isChecked_1_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_1_2: function () {
			this.QUEUELIST[ 0 ].isChecked_1_2 = this.isChecked_1_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//wednesday
		isChecked_2_0: function () {
			this.QUEUELIST[ 0 ].isChecked_2_0 = this.isChecked_2_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_2_1: function () {
			this.QUEUELIST[ 0 ].isChecked_2_1 = this.isChecked_2_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_2_2: function () {
			this.QUEUELIST[ 0 ].isChecked_2_2 = this.isChecked_2_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//thursday
		isChecked_3_0: function () {
			this.QUEUELIST[ 0 ].isChecked_3_0 = this.isChecked_3_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_3_1: function () {
			this.QUEUELIST[ 0 ].isChecked_3_1 = this.isChecked_3_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_3_2: function () {
			this.QUEUELIST[ 0 ].isChecked_3_2 = this.isChecked_3_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//friday
		isChecked_4_0: function () {
			this.QUEUELIST[ 0 ].isChecked_4_0 = this.isChecked_4_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_4_1: function () {
			this.QUEUELIST[ 0 ].isChecked_4_1 = this.isChecked_4_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_4_2: function () {
			this.QUEUELIST[ 0 ].isChecked_4_2 = this.isChecked_4_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//saturday
		isChecked_5_0: function () {
			this.QUEUELIST[ 0 ].isChecked_5_0 = this.isChecked_5_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_5_1: function () {
			this.QUEUELIST[ 0 ].isChecked_5_1 = this.isChecked_5_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_5_2: function () {
			this.QUEUELIST[ 0 ].isChecked_5_2 = this.isChecked_5_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		//sunday
		isChecked_6_0: function () {
			this.QUEUELIST[ 0 ].isChecked_6_0 = this.isChecked_6_0;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_6_1: function () {
			this.QUEUELIST[ 0 ].isChecked_6_1 = this.isChecked_6_1;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},
		isChecked_6_2: function () {
			this.QUEUELIST[ 0 ].isChecked_6_2 = this.isChecked_6_2;
			this.SET_QUEUELIST_0( this.QUEUELIST );
		},

		//time
		//monday
		time_from_0_0: function () {
			this.QUEUELIST[ 1 ].time_from_0_0 = this.time_from_0_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_0_0: function () {
			this.QUEUELIST[ 1 ].time_to_0_0 = this.time_to_0_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_0_1: function () {
			this.QUEUELIST[ 1 ].time_from_0_1 = this.time_from_0_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_0_1: function () {
			this.QUEUELIST[ 1 ].time_to_0_1 = this.time_to_0_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_0_2: function () {
			this.QUEUELIST[ 1 ].time_from_0_2 = this.time_from_0_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_0_2: function () {
			this.QUEUELIST[ 1 ].time_to_0_2 = this.time_to_0_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//tuesday
		time_from_1_0: function () {
			this.QUEUELIST[ 1 ].time_from_1_0 = this.time_from_1_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_1_0: function () {
			this.QUEUELIST[ 1 ].time_to_1_0 = this.time_to_1_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_1_1: function () {
			this.QUEUELIST[ 1 ].time_from_1_1 = this.time_from_1_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_1_1: function () {
			this.QUEUELIST[ 1 ].time_to_1_1 = this.time_to_1_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_1_2: function () {
			this.QUEUELIST[ 1 ].time_from_1_2 = this.time_from_1_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_1_2: function () {
			this.QUEUELIST[ 1 ].time_to_1_2 = this.time_to_1_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//wednesday
		time_from_2_0: function () {
			this.QUEUELIST[ 1 ].time_from_2_0 = this.time_from_2_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_2_0: function () {
			this.QUEUELIST[ 1 ].time_to_2_0 = this.time_to_2_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_2_1: function () {
			this.QUEUELIST[ 1 ].time_from_2_1 = this.time_from_2_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_2_1: function () {
			this.QUEUELIST[ 1 ].time_to_2_1 = this.time_to_2_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_2_2: function () {
			this.QUEUELIST[ 1 ].time_from_2_2 = this.time_from_2_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_2_2: function () {
			this.QUEUELIST[ 1 ].time_to_2_2 = this.time_to_2_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//thursday
		time_from_3_0: function () {
			this.QUEUELIST[ 1 ].time_from_3_0 = this.time_from_3_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_3_0: function () {
			this.QUEUELIST[ 1 ].time_to_3_0 = this.time_to_3_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_3_1: function () {
			this.QUEUELIST[ 1 ].time_from_3_1 = this.time_from_3_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_3_1: function () {
			this.QUEUELIST[ 1 ].time_to_3_1 = this.time_to_3_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_3_2: function () {
			this.QUEUELIST[ 1 ].time_from_3_2 = this.time_from_3_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_3_2: function () {
			this.QUEUELIST[ 1 ].time_to_3_2 = this.time_to_3_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//friday
		time_from_4_0: function () {
			this.QUEUELIST[ 1 ].time_from_4_0 = this.time_from_4_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_4_0: function () {
			this.QUEUELIST[ 1 ].time_to_4_0 = this.time_to_4_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_4_1: function () {
			this.QUEUELIST[ 1 ].time_from_4_1 = this.time_from_4_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_4_1: function () {
			this.QUEUELIST[ 1 ].time_to_4_1 = this.time_to_4_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_4_2: function () {
			this.QUEUELIST[ 1 ].time_from_4_2 = this.time_from_4_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_4_2: function () {
			this.QUEUELIST[ 1 ].time_to_4_2 = this.time_to_4_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//saturday
		time_from_5_0: function () {
			this.QUEUELIST[ 1 ].time_from_5_0 = this.time_from_5_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_5_0: function () {
			this.QUEUELIST[ 1 ].time_to_5_0 = this.time_to_5_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_5_1: function () {
			this.QUEUELIST[ 1 ].time_from_5_1 = this.time_from_5_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_5_1: function () {
			this.QUEUELIST[ 1 ].time_to_5_1 = this.time_to_5_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_5_2: function () {
			this.QUEUELIST[ 1 ].time_from_5_2 = this.time_from_5_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_5_2: function () {
			this.QUEUELIST[ 1 ].time_to_5_2 = this.time_to_5_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		//saturday
		time_from_6_0: function () {
			this.QUEUELIST[ 1 ].time_from_6_0 = this.time_from_6_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_6_0: function () {
			this.QUEUELIST[ 1 ].time_to_6_0 = this.time_to_6_0;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_6_1: function () {
			this.QUEUELIST[ 1 ].time_from_6_1 = this.time_from_6_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_6_1: function () {
			this.QUEUELIST[ 1 ].time_to_6_1 = this.time_to_6_1;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_from_6_2: function () {
			this.QUEUELIST[ 1 ].time_from_6_2 = this.time_from_6_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},
		time_to_6_2: function () {
			this.QUEUELIST[ 1 ].time_to_6_2 = this.time_to_6_2;
			this.SET_QUEUELIST_1( this.QUEUELIST );
		},

		//others
		isChecked_All_time: function () {
			this.DAYSRADIO[ 1 ].isChecked_All_time = this.isChecked_All_time;
			this.SET_DAYSRADIO_1( this.DAYSRADIO );
		},
		DayPicked: function () {
			this.isMonday = false
			this.isTuesday = false
			this.isWednesday = false
			this.isThursday = false
			this.isFriday = false
			this.isSaturday = false
			this.isSunday = false
			if ( this.DayPicked == 'Monday' ) {
				this.isMonday = true
			} else if ( this.DayPicked == 'Tuesday' ) {
				this.isTuesday = true
			} else if ( this.DayPicked == 'Wednesday' ) {
				this.isWednesday = true
			} else if ( this.DayPicked == 'Thursday' ) {
				this.isThursday = true
			} else if ( this.DayPicked == 'Friday' ) {
				this.isFriday = true
			} else if ( this.DayPicked == 'Saturday' ) {
				this.isSaturday = true
			} else if ( this.DayPicked == 'Sunday' ) {
				this.isSunday = true
			}
			this.DAYSRADIO[ 0 ].DayPicked = this.DayPicked;
			this.SET_DAYSRADIO_0( this.DAYSRADIO );
		},
		IDstreamSelected: function () {
			if ( this.IDstreamSelected == 'Основной поток' ) {
				this.isMainStream = true;
				this.isSubStream = false;
			} else if ( this.IDstreamSelected == 'Дополнительный поток' ) {
				this.isSubStream = true;
				this.isMainStream = false;
			}
		},
	},
	methods: {
		...mapActions( [
			'GET_SETTINGS_FROM_API',
			'GET_DAYSRADIO_FROM_API',
			'GET_QUEUELIST_FROM_API',
			'SET_DEVICE_NAME',
			'SET_MAC_ADDR',
			'SET_COMPANY',
			'SET_SETTINGS_1',
			'SET_SETTINGS_2',
			'SET_SETTINGS_3',
			'SET_DAYSRADIO_0',
			'SET_DAYSRADIO_1',
			'SET_QUEUELIST_0',
			'SET_QUEUELIST_1'
		] ),
		logOut() {
			this.isPressed_1 = true;
			setTimeout( () => alert( "Выход из учетной записи" ) );
		},
		logOutOff() {
			this.isPressed_1 = false;
		},
		//settings 0
		sendDeviceName() {
			this.SETTINGS[ 0 ].deviceName = this.deviceName;
			this.SET_DEVICE_NAME( this.SETTINGS );
		},
		sendMAC_addr() {
			this.SETTINGS[ 0 ].MAC_addr = this.MAC_addr;
			this.SET_MAC_ADDR( this.SETTINGS );
		},
		sendCompany() {
			this.SETTINGS[ 0 ].company = this.company;
			this.SET_COMPANY( this.SETTINGS );
		},
		//settings 1
		setBrightness() {
			console.log( "Brightness: " + this.Brightness );
		},
		sendBrightness() {
			this.SETTINGS[ 1 ].Brightness = this.Brightness;
			this.SET_SETTINGS_1( this.SETTINGS );
			console.log( "Brightness: " + this.Brightness );
		},
		setSaturation() {
			console.log( "Saturation: " + this.Saturation );
		},
		sendSaturation() {
			this.SETTINGS[ 1 ].Saturation = this.Saturation;
			this.SET_SETTINGS_1( this.SETTINGS );
			console.log( "Saturation: " + this.Saturation );
		},
		setContrast() {
			console.log( "Contrast: " + this.Contrast );
		},
		sendContrast() {
			this.SETTINGS[ 1 ].Contrast = this.Contrast;
			this.SET_SETTINGS_1( this.SETTINGS );
			console.log( "Contrast: " + this.Contrast );
		},
		//settings 2
		sendIDstreamSelected() {
			this.SETTINGS[ 2 ].IDstreamSelected = this.IDstreamSelected;
			this.SET_SETTINGS_2( this.SETTINGS );
			console.log( "Contrast: " + this.Contrast );
		},
		sendResolutionSelected() {
			this.SETTINGS[ 2 ].ResolutionSelected = this.ResolutionSelected;
			this.SET_SETTINGS_2( this.SETTINGS );
			console.log( "Contrast: " + this.Contrast );
		},
		sendSubResolutionSelected() {
			this.SETTINGS[ 2 ].SubResolutionSelected = this.SubResolutionSelected;
			this.SET_SETTINGS_2( this.SETTINGS );
			console.log( "Contrast: " + this.Contrast );
		},
		FrameIntervalChanged() {
			console.log( "FrameInterval: " + this.FrameInterval );
			if ( !this.FrameInterval ) {
				this.FrameInterval = 75;
			} else if ( this.FrameInterval > 120 ) {
				this.FrameInterval = 120;
			} else if ( this.FrameInterval < 1 ) {
				this.FrameInterval = 1;
			}
			this.SETTINGS[ 2 ].FrameInterval = this.FrameInterval;
			this.SET_SETTINGS_2( this.SETTINGS );
		},
		BitrateChanged() {
			console.log( "Bitrate: " + this.Bitrate );
			if ( !this.Bitrate ) {
				this.Bitrate = 6000;
			} else if ( this.Bitrate > 999999999999 ) {
				this.Bitrate = 999999999999;
			} else if ( this.Bitrate < 1 ) {
				this.Bitrate = 1;
			}
			this.SETTINGS[ 2 ].Bitrate = this.Bitrate;
			this.SET_SETTINGS_2( this.SETTINGS );
		},
		FPS_setChanged() {
			this.SETTINGS[ 2 ].FPS_set = this.FPS_set;
			this.SET_SETTINGS_2( this.SETTINGS );
		},
		//settings 3
		setSensivity() {
			console.log( "Sensivity: " + this.Sensivity );
		},
		sendSensivity() {
			this.SETTINGS[ 3 ].Sensivity = this.Sensivity;
			this.SET_SETTINGS_3( this.SETTINGS );
		},
		setThreshold() {
			console.log( "Threshold: " + this.Threshold );
		},
		sendThreshold() {
			this.SETTINGS[ 3 ].Threshold = this.Threshold;
			this.SET_SETTINGS_3( this.SETTINGS );
		}
	},

	//mounted ============================================================
	mounted() {
		this.GET_SETTINGS_FROM_API()
			.then( ( response ) => {
				if ( response.data ) {
					console.log( 'mounted SETTINGS arrived' );
					console.log( JSON.stringify( response.data ) );
				}
			} );
		this.GET_DAYSRADIO_FROM_API()
			.then( ( response ) => {
				if ( response.data ) {
					console.log( 'mounted DAYSRADIO arrived' );
				}
			} );
		this.GET_QUEUELIST_FROM_API()
			.then( ( response ) => {
				if ( response.data ) {
					console.log( 'mounted GET_QUEUELIST_FROM_API arrived' );
				}
			} );
	},
}
</script>

<style lang="css" src="./Settings.css"></style>
