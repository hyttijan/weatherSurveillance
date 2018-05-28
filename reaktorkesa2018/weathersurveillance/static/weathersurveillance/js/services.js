class LocationService{
	constructor(){
		this.locationURL = window.location.origin+"/weathersurveillance/api/location/";
		this.measurementURL = window.location.origin+"/weathersurveillance/api/measurement/";
	}
	sendTemperatureData(data){
		return fetch(this.measurementURL,{
			body: data,
			method: "POST",
			headers: {
				'content-type': "application/json"
			}
		}).then((response)=>{
			return response;
		});
	}
	fetchLocations(){
		return fetch(this.locationURL).then((response)=>{
			return response.json();
		}).then((json)=>{
			return json;
		})
		.catch((error)=>{
			return error;
		});
	}
	fetcDetailedLocation(id){
		return fetch(this.locationURL+id).then((response)=>{
			return response.json();
		}).then((json)=>{
			return json;
		}).catch((error)=>{
			return error;
		})
	}

}

module.exports.LocationService = LocationService