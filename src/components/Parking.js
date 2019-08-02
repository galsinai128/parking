import React from 'react';
import {  Marker,InfoWindow } from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

export default class Parking extends React.Component {
    
    render() {
      return (<div>
                <Marker
                   position={{ lat: this.props.parking.location.latitude, lng: this.props.parking.location.longitude}} 
                   onClick={this.props.markerClicked}
                   defaultLabel={`${this.props.parking.amount}`}
                   label={`${this.props.parking.amount}`}
                   >
                </Marker>
              </div>);
    }
  }

  
