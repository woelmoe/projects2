import {
	createApp
} from './app.js'
console.log( "entry-server.start" );
export default context => {
	// поскольку могут быть асинхронные хуки маршрута или компоненты,
	// мы будем возвращать Promise, чтобы сервер смог дожидаться
	// пока всё не будет готово к рендерингу.
	return new Promise( ( resolve, reject ) => {
		const {
			app,
			router
		} = createApp()
		// устанавливаем маршрут для маршрутизатора серверной части
		// metadata is provided by vue-meta plugin
		console.log( "server entry promise" );
		const meta = app.$meta();
		router.push( context.url );

		context.meta = meta;
		// ожидаем, пока маршрутизатор разрешит возможные асинхронные компоненты и хуки
		router.onReady( () => {
			const matchedComponents = router.getMatchedComponents()
			// нет подходящих маршрутов, отклоняем с 404

			if ( !matchedComponents.length ) {
				return reject( {
					code: 404
				} )
			}
			console.log( "server entry resolve" );
			// Promise должен разрешиться экземпляром приложения, который будет отрендерен
			resolve( app )
		}, reject );

	} )
}
