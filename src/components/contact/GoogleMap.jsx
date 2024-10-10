import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Star2Img from "../../assets/images/v1/star2.png";
// Custom marker icon to resemble the Google Maps pin
const customMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});
function OpenStreetMap() {
  const position = [-6.99067950780461, 110.39651020968479]; // Coordinates for DISPORA Semarang
  // Scroll to center on the map load
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      
      {/* Map Section */}
      <div style={{ padding: "20px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Judul dengan H2 */}
          <div className="aximo-contact-info-title">
            <h2>
              <span className="aximo-title-animation">
                Location
				<span className="aximo-title-icon">
					<img src={Star2Img} alt="Star" />
				</span>
              </span>
            </h2>
          </div>
          {/* Map Container */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              zIndex: 1, // Ensuring the map doesn't overlap header
            }}
          >
            <div id="map" style={{ height: "500px", width: "100%" }}>
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customMarker}>
                  <Popup>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        lineHeight: "1.4",
                      }}
                    >
                      <b>DISPORA Semarang</b>
                      <br />
                      <a
                        href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenStreetMap;