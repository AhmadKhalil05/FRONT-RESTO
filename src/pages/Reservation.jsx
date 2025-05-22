import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state || {};

  // لو ما في بيانات تنقل للصفحة الرئيسية أو صفحة الحجز
  if (!bookingData.date || !bookingData.hour || !bookingData.tableNumber) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontFamily: "'Gendy', cursive" }}>
        <h2>Booking data is missing.</h2>
        <button onClick={() => navigate("/reservation")} style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer", marginTop: 20 }}>
          Go Back to Reservation
        </button>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Gendy:wght@300&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "'Gendy', cursive", maxWidth: 600, margin: "40px auto", padding: 20, border: "2px solid #bd2031", borderRadius: 12, textAlign: "center", backgroundColor: "#fff6f6" }}>
        <h1 style={{ color: "#bd2031", marginBottom: 30 }}>Booking Confirmed!</h1>
        <p style={{ fontSize: 18, marginBottom: 15 }}>
          <strong>Date:</strong> {bookingData.date}
        </p>
        <p style={{ fontSize: 18, marginBottom: 15 }}>
          <strong>Hour:</strong> {bookingData.hour}
        </p>
        <p style={{ fontSize: 18, marginBottom: 15 }}>
          <strong>Table Number:</strong> {bookingData.tableNumber}
        </p>

        {/* ممكن تضيف اسم المطعم أو بيانات إضافية هنا */}
        {bookingData.restaurantName && (
          <p style={{ fontSize: 18, marginBottom: 15 }}>
            <strong>Restaurant:</strong> {bookingData.restaurantName}
          </p>
        )}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 30,
            padding: "12px 28px",
            fontSize: 16,
            backgroundColor: "#bd2031",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Back to Home
        </button>
      </div>
    </>
  );
};

export default BookingConfirmation;
