React = require('react');
ReactDOM = require('react-dom');
const{Location} = require('./models.js')
const{LocationService} = require('./services.js');

class Modal extends React.Component{
	constructor(props){
		super(props)
	}
	render(){

    return (
      <div className="backdrop">
      	<div className="modal responsive-modal">
        		{this.props.children}
          		<div className="footer">
            		<button className="pure-button pure-button-primary" onClick={this.props.onClose}>
             	 		Close
            		</button>
          		</div>
        </div>
      </div>
    );
    }
}

class TemperatureForm extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {modal:null};
		this.closeModal = this.closeModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	formDataToJSON(data){
		var dataJSON = {}
		for(var[key,value] of data.entries()){
			dataJSON[key] = value;
		}
		return JSON.stringify(dataJSON);
	}
	handleChange(event){
		var location = this.props.locations.find((location)=>{return location.props.id==event.target.value});
		var latLng = {lat:location.props.latitude,lng:location.props.longitude};
		this.props.changeLocation(latLng);
	}
	closeModal(){
		this.setState({modal:null});
	}
	handleSubmit(event){
		event.preventDefault();
		var data = this.formDataToJSON(new FormData(event.target));
		this.props.sendData(data).then((response)=>{
			var message = response.ok?"Measurement was added succesfully":"Something went wrong, measurement was not added";
			this.setState({modal:<Modal onClose={this.closeModal}>{message}</Modal>})
		});
	}
	render(){
		var options = this.props.locations.map((location)=>{
			return <option value={location.props.id} key={location.props.id}>{location.props.name}</option>
		})
		return  <div>
					<form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
						<fieldset>
							<legend>Add a temperature observation</legend>
								<div className="pure-g-r">
									<div className="pure-u-1">
										<label htmlFor="location">Location</label>
										<select  className="pure-u-sm-23-24 pure-u-lg-1-3" onChange={this.handleChange} id="location" name="location">
										{options}
										</select>
									</div>
									<div className="pure-u-1">
										<label htmlFor="temperature">Temperature</label>
										<input  className="pure-u-sm-23-24 pure-u-lg-1-3"  id="temperature" name="temperature" type="text"/>
									</div>
									<div className="pure-u-1">
										<input type="submit" className="pure-button pure-button-primary responsive-button pure-u-sm-23-24 pure-u-lg-1-3" value="Add temperature"/>
									</div>
								</div>
						</fieldset>
					</form>
					{this.state.modal}
				</div>
	}
}

module.exports.Modal = Modal
module.exports.TemperatureForm = TemperatureForm
