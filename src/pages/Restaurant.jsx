import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GENDY_FONT_LINK = "https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap";


const cities = [
  { label: "Istanbul", value: "Istanbul", coords: [41.0082, 28.9784] },
  { label: "Elazig", value: "Elazig", coords: [38.6741, 39.2226] },
  { label: "Ankara", value: "Ankara", coords: [39.9334, 32.8597] },
  { label: "Izmir", value: "Izmir", coords: [38.4192, 27.1287] },
];

const RestaurantPage = ({
  restaurantName = "Nusr•Et",
  rating = 4.7,
  reviewsCount = 900,
  priceRange = "€30 and under",
  cuisine = "Mexican",
  description = `Effortless table reservations across Turkey! Discover, book, and enjoy the finest dining experiences in top restaurants, from the vibrant streets of Istanbul to the charming eateries of Ankara and beyond. Your perfect table is just a click away!`,
  guestsInitial = 4,
  mainImage = "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80",
  photoGallery = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  ],
  menuItems = [
    { name: "SALSA MEXICANA", price: "€4.90", desc: "mit Tortilla-Chips" },
    { name: "FRIJOLES REFritos", price: "€4.90", desc: "Bohnenmus mit Tortilla-Chips" },
    { name: "CHILI CON QUESO", price: "€6.50", desc: "Käsesauce mit Tortilla-Chips" },
    { name: "QUESADILLAS VEGETARIANA", price: "€6.90", desc: "Käsetaschen mit 3 verschiedenen Füllungen: Spinat, Bohnenmus und Käse." },
  ],
}) => {
  const [guests, setGuests] = useState(guestsInitial);
  const [location, setLocation] = useState(cities[0].value);
  const [mapPosition, setMapPosition] = useState(cities[0].coords);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    const selectedCity = cities.find((c) => c.value === e.target.value);
    setLocation(selectedCity.value);
    setMapPosition(selectedCity.coords);
  };


  

  return (
    <>
      <link href={GENDY_FONT_LINK} rel="stylesheet" />
      <style>{`
        body {
          background-color: #f7f1e9;
          font-family: 'Gendy', cursive;
          margin: 0; padding: 0;
          color: #3f2c23;
        }
        .container {
          max-width: 1024px;
          margin: 40px auto;
          padding: 0 20px 60px;
        }
        .header-logo {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          cursor: default;
          user-select: none;
        }
        .header-logo .red {
          color: #b82f38;
          font-weight: 900;
        }
        .rating-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 400;
          font-size: 14px;
          margin-bottom: 12px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .reviews-count, .price-range, .cuisine {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b4e3a;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .rating-bar svg {
          cursor: default;
        }
        .description {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 30px;
          max-width: 700px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .map-container {
          height: 250px;
          width: 100%;
          border-radius: 6px;
          margin-bottom: 40px;
          box-shadow: 0 3px 12px rgb(0 0 0 / 0.15);
        }
        .main-section {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 60px;
        }
        .left-col {
          flex: 1 1 400px;
          min-width: 300px;
        }
        .right-col {
          flex: 0.8 1 280px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .main-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgb(209 2 27 / 0.3);
          user-select: none;
        }
        .form-group {
          background-color: #502e19;
          color: white;
          padding: 12px 18px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        select, input[type="date"] {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
          font-size: 16px;
          padding: 6px 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          user-select: auto;
          outline: none;
        }
        select:focus, input[type="date"]:focus {
          outline: 2px solid #b82f38;
        }
        .guests-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 6px;
          font-weight: 900;
          font-size: 16px;
          user-select: none;
        }
        .guests-controls button {
          background-color: #3f2c23;
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          font-weight: 900;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .guests-controls button:hover {
          background-color: #b82f38;
        }
        .book-btn {
          background-color: #b82f38;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 15px;
          border-radius: 4px;
          border: none;
          padding: 16px 30px;
          cursor: pointer;
          letter-spacing: 1px;
          user-select: none;
          align-self: flex-start;
          transition: background-color 0.3s ease;
        }
        .book-btn:hover {
          background-color: #b82f38;
        }
        .photos-section {
          margin-top: 40px;
        }
        .photos-section h3 {
          font-weight: 900;
          margin-bottom: 14px;
          font-size: 20px;
          letter-spacing: 0.3px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .photo-gallery img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          margin-bottom: 20px;
          border-radius: 4px;
          box-shadow: 0 1px 5px rgb(0 0 0 / 0.15);
          user-select: none;
        }
        .menu-section {
          margin-top: 40px;
        }
        .menu-section h3 {
          font-weight: 900;
          margin-bottom: 14px;
          font-size: 20px;
          letter-spacing: 0.3px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .menu-item {
          margin-bottom: 14px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
          font-size: 14px;
        }
        .menu-item-name {
          font-weight: 900;
          font-size: 15px;
          color: #502e19;
          display: flex;
          justify-content: space-between;
          letter-spacing: 0.4px;
        }
        .menu-item-desc {
          font-size: 13px;
          color: #6b4e3a;
          margin-top: 3px;
        }
        @media (max-width: 768px) {
          .main-section {
            flex-direction: column;
          }
          .right-col {
            flex: none;
            min-width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <header className="header-logo" aria-label="Restaurant logo">
          {restaurantName.split("•").map((part, idx) =>
            idx === 1 ? (
              <span key={idx} className="red">•Et</span>
            ) : (
              <span key={idx}>{part}</span>
            )
          )}
        </header>

        <div className="rating-bar" aria-label={`Rating ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => {
            const filled = i < Math.floor(rating);
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={filled ? "#D0021B" : "#ddd"}
                viewBox="0 0 16 16"
                style={{ marginLeft: 4 }}
                className="bi bi-star-fill"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            );
          })}
          <span style={{ marginLeft: 10, fontWeight: "700" }}>{rating.toFixed(1)}</span>
          <span className="reviews-count" style={{ marginLeft: 15 }}>
            {reviewsCount} Reviews
          </span>
          <span className="price-range" style={{ marginLeft: 15 }}>
            {priceRange}
          </span>
          <span className="cuisine" style={{ marginLeft: 15 }}>
            {cuisine}
          </span>
        </div>

        <p className="description">{description}</p>

        <div className="map-container" aria-label={`Map showing ${location} location`}>
          <MapContainer
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            aria-hidden="false"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapPosition}>
              <Popup>{restaurantName} Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="main-section">
          <div className="left-col">
            <img src={mainImage} alt="Main restaurant view" className="main-image" />
          </div>
          <div className="right-col" aria-label="Booking form">
            <div className="form-group">
              <label htmlFor="location-select" className="form-label">Location</label>
              <select
                id="location-select"
                value={location}
                onChange={handleLocationChange}
                aria-label="Select location"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date-picker" className="form-label">Date</label>
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Select date"
              />
            </div>

            <div className="form-group">
              <div className="form-label">Guest(s)</div>
              <div className="guests-controls">
                <button
                  aria-label="Decrease guests"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                >
                  −
                </button>
                <span>{guests} Guests</span>
                <button
                  aria-label="Increase guests"
                  onClick={() => setGuests(guests + 1)}
                >
                  +
                </button>
              </div>
            </div>

           <Link to="/reservation" className="book-btn" aria-label="Book Now">
               Book Now
           </Link>

          </div>
        </div>

        <section className="photos-section" aria-label="Photos gallery">
          <h3>Photos</h3>
          <div className="photo-gallery">
            {photoGallery.map((photo, i) => (
              <img key={i} src={photo} alt={`Photo ${i + 1}`} />
            ))}
          </div>
        </section>

        <section className="menu-section" aria-label="Menu">
          <h3>Menu</h3>
          {menuItems.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="menu-item-name">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
              <div className="menu-item-desc">{item.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default RestaurantPage;
