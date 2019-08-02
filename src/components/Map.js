import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap , Marker  } from "react-google-maps"
import { compose, withProps } from "recompose"
import {getParkings} from '../services/ParkingService'
import Parking from './Parking'
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
const DEFAULT_CENTER_LAT_LNG = {lat: 35.917973,lng: 14.409943} //malta lat lng


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8tV-qb3xg_SIu-NM4QJpFx1hC299CES8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` ,width: `500px`, marginTop: '20px' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.center}
  ><MarkerClusterer
      defaultCalculator={(markers)=>{
        var total = 0; 
        for (var i = 0; i < markers.length; i++) { 
            if (parseInt(markers[i].label) && markers[i].label > 0) { 
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
  if (props.parkings) {
    return props.parkings.map(parking => <Parking parking = {parking} key={parking.address} markerClicked={props.markerClicked}/>)
  } 
}

export default class Map extends React.Component {
    constructor(props){
      super(props)

      //Get data from server and set it on state
      getParkings().then(res=>{
        this.setState({parkings:res.data.a2B});
      }).catch(e => {
        console.log('error: ',e)
      })

      //set center of map on current location
      this.setLocation();
    }

    state = {
      parkings: null,
      center: DEFAULT_CENTER_LAT_LNG
    }

    render() {
      return (<div style={{ display: `flex`, justifyContent: `center` }}>
                <MyMapComponent 
                    parkings = {this.state.parkings}
                    center={this.state.center}
                    markerClicked ={this.markerClicked}
                    clustererRef={this.clustererRef}
                    />
        </div>);
    }

    setLocation = ()=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position)=> {
          this.setState({center: {lat: position.coords.latitude,lng: position.coords.longitude}})
          
        });
      }
      return false;
    }
  }
