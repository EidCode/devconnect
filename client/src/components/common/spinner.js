import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
 export default class Spinner extends React.Component {
  //other logic
    render() {
     return(
      <Loader
         type="ThreeDots"
         color="#00BFFF"
         height={50}
         width={100}
         timeout={3000} //3 secs

      />
     );
    }
 }