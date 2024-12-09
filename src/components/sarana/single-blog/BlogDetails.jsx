import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importing date picker styles
import { format } from "date-fns";

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
  const currentDay = new Date().toLocaleDateString("id-ID", { weekday: "long" });

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
                backgroundColor: jam.hari === currentDay ? "#d4edda" : "transparent",
                color: jam.hari === currentDay ? "#155724" : "#000",
                border: jam.hari === currentDay ? "1px solid #c3e6cb" : "none",
                borderRadius: jam.hari === currentDay ? "5px" : "0",
              }}
            >
              <span>{jam.hari}</span>
              <span>{formatTime(jam.jam_mulai)} - {formatTime(jam.jam_selesai)}</span>
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
const BookingSection = ({ jamOperasional, harga }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id) {
      fetch(`http://localhost:3001/api/payment/user?id=${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User data fetched:", data);
          if (data.id && data.name && data.email) {
            setUser(data); // Set state user jika data lengkap
          } else {
            console.error("Data pengguna tidak lengkap:", data);
          }
        })
        .catch((error) => console.error("Failed to load user data:", error));
    } else {
      console.error("Token or id not found.");
    }
  }, []);

  const getAvailableTimesForDay = (dayName) => {
    const dayOperasional = jamOperasional.find((jam) => jam.hari === dayName);
    return dayOperasional ? generateAvailableTimes(dayOperasional.jam_mulai, dayOperasional.jam_selesai) : [];
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedDates, selectedTimes]);

  const calculateTotalPrice = () => {
    if (selectedDates.length === 0) {
      setTotalPrice(0);
      return;
    }

    let total = 0;
    selectedDates.forEach((date) => {
      const dateString = format(date, "yyyy-MM-dd");
      const selectedTimeForDate = selectedTimes[dateString] || [];
      total += harga * selectedTimeForDate.length;
    });

    setTotalPrice(total);
  };

  const handleTimeClick = (time, date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const timesForThisDate = selectedTimes[dateString] || [];

    const updatedTimes = timesForThisDate.includes(time)
      ? timesForThisDate.filter((t) => t !== time)
      : [...timesForThisDate, time];

    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [dateString]: updatedTimes,
    }));
  };

  const handleDateClick = (date) => {
    const dateString = format(date, "yyyy-MM-dd");

    if (selectedDates.find((d) => format(d, "yyyy-MM-dd") === dateString)) {
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((d) => format(d, "yyyy-MM-dd") !== dateString)
      );
    } else {
      setSelectedDates((prevSelectedDates) => [...prevSelectedDates, date]);
    }
  };

  const handleSelectAllTimes = (date, availableTimes) => {
    const dateString = format(date, "yyyy-MM-dd");
    const allTimesSelected = selectedTimes[dateString]?.length === availableTimes.length;

    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [dateString]: allTimesSelected ? [] : availableTimes,
    }));
  };

  const handleBooking = async () => {
    if (selectedDates.length === 0 || totalPrice === 0) {
      alert("Silakan pilih tanggal dan waktu bermain terlebih dahulu.");
      return;
    }
  
    const bookingData = {
      transaction_details: {
        order_id: `order-${new Date().getTime()}`,
        gross_amount: totalPrice,
      },
      customer_details: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      item_details: selectedDates.map((date) => ({
        name: `Pemesanan pada ${format(date, "yyyy-MM-dd")}`,
        price: harga,
        quantity: (selectedTimes[format(date, "yyyy-MM-dd")] || []).length,
      })),
    };
  
    console.log("Booking Data yang dikirim:", bookingData);  // Log untuk memverifikasi data
  
    try {
      const response = await fetch("http://localhost:3001/api/payment/bayar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
      if (!response.ok || !data.token) {
        throw new Error("Gagal memproses transaksi.");
      }
  
      // Panggil Midtrans Snap untuk memulai transaksi
      snap.pay(data.token, {
        onSuccess: function(result) {
          alert("Pembayaran berhasil!");
          console.log(result);
        },
        onPending: function(result) {
          alert("Pembayaran masih pending.");
          console.log(result);
        },
        onError: function(result) {
          alert("Terjadi kesalahan saat pembayaran.");
          console.log(result);
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };
  
  

  return (
    <div className="booking-section" style={{ marginTop: "40px" }}>
      <h4>Pilih Tanggal Bermain</h4>
      <DatePicker
        selected={null}
        onChange={handleDateClick}
        minDate={new Date()}
        dateFormat="yyyy/MM/dd"
        inline
        highlightDates={selectedDates}
        filterDate={(date) => {
          const dayName = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ][date.getDay()];
          return jamOperasional.some((jam) => jam.hari === dayName);
        }}
      />

      {selectedDates.map((date, index) => {
        const dayName = [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ][date.getDay()];
        const availableTimesForDay = getAvailableTimesForDay(dayName);
        const dateString = format(date, "yyyy-MM-dd");
        const allTimesSelected =
          selectedTimes[dateString]?.length === availableTimesForDay.length;

        return (
          <div key={index}>
            <h5>Jam Bermain {date.toLocaleDateString("id-ID")}</h5>
            <div style={{ marginBottom: "5px", display: "flex", alignItems: "center", fontSize: "14px" }}>
              <input
                type="checkbox"
                id={`select-all-${dateString}`}
                checked={allTimesSelected}
                onChange={() => handleSelectAllTimes(date, availableTimesForDay)}
                style={{ marginRight: "6px", width: "20px", height: "20px" }}
              />
              <label htmlFor={`select-all-${dateString}`}>1 hari</label>
            </div>

            {availableTimesForDay.map((time, idx) => (
              <button
                key={idx}
                onClick={() => handleTimeClick(time, date)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  margin: "5px",
                  backgroundColor: selectedTimes[dateString]?.includes(time)
                    ? "#007bff"
                    : "#f8f9fa",
                  color: selectedTimes[dateString]?.includes(time) ? "#fff" : "#000",
                }}
              >
                {time}
              </button>
            ))}
          </div>
        );
      })}

      <p style={{ fontSize: "16px", fontWeight: "bold", margin: "20px 0", color: "#333" }}>
        Total Harga: Rp {totalPrice.toLocaleString()}
      </p>
      <button
        onClick={handleBooking}
        style={{
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Pesan Sarana
      </button>
    </div>
  );
};

// Main Component
function BlogDetails({ id, nama, sarana, gambar, harga, kecamatan, jam_operasional }) {
  return (
    <>
      <LazyLoadImage
        src={`/${gambar}`}
        width={850}
        height={400}
        alt={nama}
        effect="blur"
      />
      <h2>{nama} - {sarana}</h2>
      <OperationalHours jamOperasional={jam_operasional} />
      <BookingSection jamOperasional={jam_operasional} harga={harga} />
    </>
  );
}

export default BlogDetails;
