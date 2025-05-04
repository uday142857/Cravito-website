import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

function AppDownload() {
  return (
    <div className="app-download" id='app-download'>
      <h1>For Better Experience Download Here</h1>
      <div className="download-logos">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default AppDownload