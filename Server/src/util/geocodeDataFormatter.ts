interface geoCode {
    name: string;
    lat: number;
    long: number;
}

export const formatGeocodeData = (data: any): geoCode => {
    console.log('Received data:', data);
    if (!data.results) {
        throw new Error('Invalid data structure for GeoCode');
    }
    return {
        name: data.results[0].name,
        lat: data.results[0].latitude,
        long: data.results[0].longitude
    }
}