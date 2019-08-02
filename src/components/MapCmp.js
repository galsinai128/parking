import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap,Marker,InfoWindow   } from "react-google-maps"
import { compose, withProps } from "recompose"
import {getParkings} from '../services/ParkingService'
import Parking from './Parking'
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
const DEFAULT_CENTER_LAT_LNG = {lat: 35.917973,lng: 14.409943} //malta lat lng


export default MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8tV-qb3xg_SIu-NM4QJpFx1hC299CES8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={DEFAULT_CENTER_LAT_LNG}
  ><MarkerClusterer
      defaultCalculator={(markers)=>{
        var total = 0; 
        for (var i = 0; i < markers.length; i++) { 
            if (markers[i].label > 0) { // if markers speed is 0 skip 
                total += parseInt(markers[i].label); 
            } 
        }   
        return { 
            text: total , 
            index: total 
        }; 
      }}
  >
    {renderMarkers(props)}  
  </MarkerClusterer>
  </GoogleMap>
)

const renderMarkers = (props) => {
  console.log(props.clustererRef)
  if (props.parkings) {
    return props.parkings.map(parking => <Parking parking = {parking} key={parking.address} markerClicked={props.markerClicked}/>)
  } 
}
