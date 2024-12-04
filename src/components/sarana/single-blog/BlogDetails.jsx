import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importing date picker styles

// Format Time Function
function formatTime(time) {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
}

// Generate Available Times Based on Operational Hours
function generateAvailableTimes(jam_mulai, jam_selesai) {
  const start = parseInt(jam_mulai.split(":")[0]);
  const end = parseInt(jam_selesai.split(":")[0]);
  const times = [];

  for (let i = start; i < end; i++) {
    const timeSlot = `${String(i).padStart(2, "0")}:00 - ${String(i + 1).padStart(2, "0")}:00`;
    times.push(timeSlot);
  }

  return times;
}

// Operational Hours Component
function OperationalHours({ jamOperasional }) {
  return (
    <div className="operational-hours" style={{ marginTop: "20px", width: "100%" }}>
      <h4>Jam Operasional</h4>
      <br />
      {jamOperasional.length > 0 ? (
        <div className="operational-container">
          {jamOperasional.map((jam, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
              }}
            >
              <span>{jam.hari}</span>
              <span>
                {formatTime(jam.jam_mulai)} - {formatTime(jam.jam_selesai)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada jam operasional yang tersedia.</p>
      )}
    </div>
  );
}

// Booking Section Component
const BookingSection = ({ jamOperasional }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const dayIndex = selectedDate.getDay(); // 0: Sunday, 6: Saturday
      const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][dayIndex];

      const selectedDay = jamOperasional.find((jam) => jam.hari === dayName);

      if (selectedDay) {
        const times = generateAvailableTimes(selectedDay.jam_mulai, selectedDay.jam_selesai);
        setAvailableTimes(times);
      } else {
        setAvailableTimes([]);
      }
    }
  }, [selectedDate, jamOperasional]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Pilih tanggal dan jam bermain.");
      return;
    }

    const bookingData = {
      date: selectedDate.toISOString().split("T")[0], // Format tanggal
      time: selectedTime,
    };

    try {
      const response = await fetch("/api/save-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking berhasil!");
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        alert("Booking gagal, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during booking", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <div className="booking-section" style={{ marginTop: "40px" }}>
      <h4>Pilih Tanggal Bermain</h4>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        inline
      />

      <h4>Pilih Jam Bermain</h4>
      <div className="time-selection" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => setSelectedTime(time)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: selectedTime === time ? "#007bff" : "#f1f1f1",
                color: selectedTime === time ? "#fff" : "#000",
                cursor: "pointer",
                minWidth: "100px",
              }}
            >
              {time}
            </button>
          ))
        ) : (
          <p>Tidak ada jam bermain tersedia.</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h5>Durasi Booking</h5>
        <p>
          {selectedDate ? selectedDate.toLocaleDateString("id-ID") : "Pilih tanggal"} -{" "}
          {selectedTime || "Pilih waktu"}
        </p>
      </div>

      <button
        onClick={handleBooking}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Booking Sekarang
      </button>
    </div>
  );
};

// Main BlogDetails Component
function BlogDetails({ id, nama, gambar, harga, kecamatan, deskripsi, jam_operasional }) {
  return (
    <>
      <div className="post-thumbnail" style={{ marginBottom: "20px" }}>
        <LazyLoadImage
          src={`/${gambar}`}
          width={850}
          height={400}
          alt={nama}
          effect="blur"
          style={{ borderRadius: "8px" }}
        />
      </div>

      <div className="post-details-content" style={{ marginTop: "30px" }}>
        <h2>{nama}</h2>
        <p>{deskripsi}</p>
        <div className="details">
          <div className="price">
            <span>Harga: {harga}</span>
          </div>
          <div className="location">
            <span>{kecamatan}</span>
          </div>
        </div>

        <OperationalHours jamOperasional={jam_operasional} />
        <BookingSection jamOperasional={jam_operasional} />
      </div>
    </>
  );
}

export default BlogDetails;
