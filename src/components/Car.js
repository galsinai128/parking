import React from 'react';
import Geocode from 'react-geocode';
import {  Marker } from "react-google-maps";

export default class Car extends React.Component {
    
  state = {
    position : this.props.defaultPosition 
  }
  
  componentDidMount() {
    Geocode.setApiKey('AIzaSyA8tV-qb3xg_SIu-NM4QJpFx1hC299CES8');
    Geocode.fromAddress(this.props.car.address).then(res=>{
      this.setState({position : res.results[0].geometry.location})
    },  error => {console.error(error);})
  }


  render() {  
    return (<div>
                  <Marker
                    position={this.state.position} 
                    label={`car`}
                  >
                  </Marker>    
                
            </div>);
  }
}

  
