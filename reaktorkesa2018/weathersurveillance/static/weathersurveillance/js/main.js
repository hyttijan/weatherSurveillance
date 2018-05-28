React = require('react');
ReactDOM = require('react-dom');
const {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} = require('react-google-maps');
const{Location, MyMapComponent, GoogleMapsWrapper} = require('./models.js');
const{TemperatureForm} = require('./forms.js');
const{LocationService} = require('./services.js');


class App extends React.Component{
	
	constructor(props){
		super(props);
		this.service = new LocationService();
		this.state = {locations:[],zoomedLocation:null,showGraph:false,detailedLocation:null,loading:true}
		this.sendData = this.sendData.bind(this);
		this.changeLocation = this.changeLocation.bind(this);
		this.toggleShowGraph= this.toggleShowGraph.bind(this);
	}
	changeLocation(location){
		this.setState({zoomedLocation:location})
	}
	sendData(data){
		return this.service.sendTemperatureData(data).then((response)=>{
			return response;
		});
	}
	toggleShowGraph(location_id){
		var showGraph = this.state.showGraph;
		var detailedLocation = this.state.locations.find((location)=>{return location.props.id==location_id});
		console.log(detailedLocation);
		this.setState({showGraph:!showGraph,detailedLocation:detailedLocation});	
		
	}
	componentDidMount(){
		this.locationsId = setInterval(()=>this.updateLocations(), 5000);
	}
	componentWillUnmount(){
		clearInterval(this.locationsId);
	}
	updateLocations(){
		this.service.fetchLocations().then((locations)=>{
			locations = locations.map((location)=>{
				return <Location key={location.id}
				id={location.id}
				name={location.name} 
  				latitude={location.latitude} 
  				longitude={location.longitude}
  				current_temperature={location.current_temperature}
  				maximum_temperature={location.maximum_temperature}
  				minimum_temperature={location.minimum_temperature}
				toggleShowGraph={this.toggleShowGraph}
				/>
			})
			this.setState({locations:locations,
						   loading:false})
			if(this.state.detailedLocation!=null){
				var detailedLocation = locations.find((location)=>{return location.props.id==this.state.detailedLocation.props.id});
				console.log(detailedLocation);
				this.setState({detailedLocation:detailedLocation});
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	render(){
		const {loading} = this.state;
		if(loading){
			return <p className="pure-u-sm-23-24 pure-u-lg-1-3">Loading...</p>
		}
		else{
			return <div>
						<GoogleMapsWrapper 
						locations={this.state.locations} 
						zoomedLocation={this.state.zoomedLocation}
						toggleShowGraph={this.toggleShowGraph} 
						showGraph={this.state.showGraph}
						detailedLocation={this.state.detailedLocation}
						/>
						<TemperatureForm locations={this.state.locations}
						changeLocation={this.changeLocation}
						sendData={this.sendData}/>
					</div>	
		}
	}
}

var app = <App/>
ReactDOM.render(
	app,
	document.getElementById("root")
);
