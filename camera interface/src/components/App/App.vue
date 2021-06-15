<template>
<div id="app">
	<router-view>
	</router-view>
</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			title: 'App.vue'
		}
	},
	metaInfo: {
		title: 'Camera',
		titleTemplate: '%s - Web-interface!',
		meta: [
			{
				hid: 'og:title',
				name: 'og:title',
				content: 'Веб-интерфейс видеокамеры'
				},
			{
				hid: 'description',
				name: 'description',
				content: 'Вряд ли это нужно для веб-интерфейса камеры, но пусть будет...'
				}
		]
	}

}
</script>

<style lang="scss"
       src="./App.scss"
>
</style>
