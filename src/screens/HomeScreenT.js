import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeScreenT() {
  return (
    <>
     <div className="wm-main-wrapper">
      
      {/* Main Banner */}
      <div className="wm-main-banner">
        <div className="wm-banner-one">
          <div className="wm-banner-one-for">
            <div className="wm-banner-one-for-layer" style={{    transform: 'scale(-0.5)',
    height: '90vh'}}> <img src="extra-images/banner-view1-1.jpg" alt="" /> </div>
            <div className="wm-banner-one-for-layer"> <img src="extra-images/banner-view1-2.jpg" alt="" /> </div>
            <div className="wm-banner-one-for-layer"> <img src="extra-images/banner-view1-3.jpg" alt="" /> </div>
            <div className="wm-banner-one-for-layer"> <img src="extra-images/banner-view1-1.jpg" alt="" /> </div>
          </div>
          <div className="wm-banner-one-nav">
            <div className="wm-banner-one-nav-layer">
              <h1>Database Principles</h1>
              <p>The study programmes of the Enroll Campus University are open to people from all nationalities.</p>
              <a href="#" className="wm-banner-btn">learn more</a>
            </div>
      
          </div>
        </div>
      </div>
      {/* Main Banner */}
    </div>
    </>
  )
}
