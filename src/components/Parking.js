import React from 'react';
import {  Marker } from "react-google-maps";
import Car from './Car'

export default class Parking extends React.Component {
    
  render() {
    
    return (<div>
              
              <Marker
                  position={{ lat: this.props.parking.location.latitude, lng: this.props.parking.location.longitude}} 
                  defaultLabel={`${this.props.parking.amount}`}
                  label={`${this.props.parking.amount}`}
                  >
              </Marker>
              {this.props.parking.cars.map(car=>{
                return (
                  <Car
                    car = {car}
                    defaultPosition={{ lat: this.props.parking.location.latitude, lng: this.props.parking.location.longitude}}
                  >
                  </Car> 
                  // <div></div>   
                )
              })}
              
            </div>);
  }
}

  
