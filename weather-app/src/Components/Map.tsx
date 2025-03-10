import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

type MapProps = {
	lat: number;
	lng: number;
};

const containerStyle = {
	width: '800px',
	height: '400px',
}

function Map({lat, lng}: MapProps) {

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_KEY}`,
	})

	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map : any) {
		const bounds = new window.google.maps.LatLngBounds({lat, lng})
		map.fitBounds(bounds);
		map.setZoom(12);

		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map : any) {
		setMap(null)
	}, [])

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={{lat, lng}}
			zoom={12}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{/* Child components, such as markers, info windows, etc. */}
			<></>
		</GoogleMap>
	) : (
		<></>
	)
}

export default React.memo(Map)