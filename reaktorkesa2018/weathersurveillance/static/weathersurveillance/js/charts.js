React = require('react');
ReactDOM = require('react-dom');
var BarChart = require("react-chartjs").Bar;

class LocationChart extends React.Component{

	constructor(props){
		super(props)
	}
	render(){
		var chartData = {
		labels: ["Current temperature", "Maximum temperature", "Minimum temperature"],
		datasets: [
				{
				label: this.props.location.name,
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [this.props.location.props.current_temperature.temperature, 
					   this.props.location.props.maximum_temperature.temperature, 
					   this.props.location.props.minimum_temperature.temperature]
				}
			]
		}
		var options = {
			responsive:true,
    		scaleBeginAtZero:false,
    		barBeginAtOrigin:true
		}
		return <BarChart data={chartData} options={options}  width="600" height="250"/>
	}

}
module.exports.LocationChart = LocationChart;