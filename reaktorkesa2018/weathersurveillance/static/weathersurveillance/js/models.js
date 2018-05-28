React = require('react');
ReactDOM = require('react-dom');
const {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} = require('react-google-maps');
const{LocationChart} = require('./charts.js');
const {Modal} = require('./forms.js');
const Home = require("react-icons/lib/fa/home");
const {mapStyle} = require("./mapStyle.js");

class HomeButton extends React.Component{
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.props.toggleShowGraph(this.props.value)
	}
	render(){
		return <button onClick={this.handleClick}><Home/></button>
	}
}

class Measurement extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>
					<HomeButton toggleShowGraph={this.props.toggleShowGraph} value={this.props.location_id}/>
					<div>Current temperature: {this.props.current_temperature.temperature} at {this.props.current_temperature.time}</div>
					<div>Maximum temperature: {this.props.maximum_temperature.temperature} at {this.props.maximum_temperature.time}</div>
					<div>Minimum temperature: {this.props.minimum_temperature.temperature} at {this.props.minimum_temperature.time}</div>
				</div>
	}
}

class Location extends React.Component{
	constructor(props){
		super(props)
		this.state = {isOpen:true}
		this.onToggleOpen = this.onToggleOpen.bind(this);
	}

	onToggleOpen(){
		var isOpen = this.state.isOpen;
		this.setState({isOpen:!isOpen})
	}	
	render(){
		return <Marker key={this.props.id} onClick={this.onToggleOpen}
		 position={{ lat: this.props.latitude, lng:this.props.longitude }}>
		 	{this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
		 		{this.props.current_temperature?<Measurement key={this.props.current_temperature.id}
		 										location_id={this.props.id}
												current_temperature={this.props.current_temperature}
												maximum_temperature={this.props.maximum_temperature}
												minimum_temperature={this.props.minimum_temperature}
												toggleShowGraph={this.props.toggleShowGraph}
												/>
												:
												<div>No temperatures available</div>}
		 	</InfoWindow>}
		 </Marker>
	}
}

const MapComponent = withScriptjs(withGoogleMap((props) =>{
	var center = props.zoomedLocation;
	var options = {streetViewControl:false,fullscreenControl:false,mapTypeControl:false,styles:mapStyle}
	if(center){
  		return <GoogleMap
    		defaultZoom={8}
    		center={center}
    		streetViewControl={false}
  			options={options}
  			 >
  			{props.locations}
  			</GoogleMap>
  	}
  	else{
  		return <GoogleMap
    	defaultZoom={8}
    	defaultCenter={{ lat: 60.000, lng: 24.000 }}
    	options={options}
  		>
  		{props.locations}
  		</GoogleMap>		
  	}
  }
))

class GoogleMapsWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {mapHeight:window.innerHeight/1.3333}


	}
	updateDimensions(){
		this.setState({mapHeight:window.innerHeight/1.3333})
	}
	componentDidMount(){
		window.addEventListener('resize',this.updateDimensions.bind(this));
	}
	render(){
		return <div className="pure-u-1-1">
		<MapComponent
  		isMarkerShown
  		googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  		loadingElement={<div style={{ height: `100%` }} />}
  		containerElement={<div style={{ height: this.state.mapHeight }} />}
  		mapElement={<div style={{ height: `100%` }} />}
  		locations={this.props.locations}
  		zoomedLocation={this.props.zoomedLocation}
  		changeLocation={this.props.changeLocation}
		/>
		{this.props.showGraph && <Modal onClose={this.props.toggleShowGraph}><div><h3>{this.props.detailedLocation.props.name}</h3><LocationChart location={this.props.detailedLocation}/></div></Modal>}
		</div>
	}
}

module.exports.Location = Location
module.exports.MapComponent = MapComponent
module.exports.GoogleMapsWrapper = GoogleMapsWrapper