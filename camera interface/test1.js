let a = {
	"coordinates": [
		{
			"x": 0,
			"y": 90
	}
],
}

s = JSON.stringify( a );
t = JSON.parse( s );
console.log( s );
console.log( t );
