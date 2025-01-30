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

const BookingSection = ({ jamOperasional, harga, kategori }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({ id_user: "", user: "", email: "" });
  const [blockedTimes, setBlockedTimes] = useState({}); // State untuk menyimpan waktu yang sudah dibooking

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
          if (data.id_user && data.user && data.email) {
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
    if (selectedDates.length === 0 || !harga) {
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

  // Fungsi untuk memeriksa ketersediaan waktu
  const checkAvailability = async (date, sarana) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/payment/check-availability?tanggal=${date}&sarana=${sarana}`
      );
      const data = await response.json();
      return data.blockedTimes || [];
    } catch (error) {
      console.error("Error checking availability:", error);
      return [];
    }
  };

  // Handle klik waktu
  const handleTimeClick = async (time, date) => {
    const dateString = format(date, "yyyy-MM-dd");

    // Memeriksa ketersediaan waktu
    const blockedTimesForDate = await checkAvailability(dateString, kategori.nama_kategori);

    // Memeriksa apakah waktu yang dipilih sudah dibooking
    const isBooked = blockedTimesForDate.some(
      (blocked) =>
        time >= blocked.start_time && time <= blocked.end_time
    );

    if (isBooked) {
      alert(`Waktu ${time} pada tanggal ${dateString} sudah dibooking!`);
      return;
    }

    const timesForThisDate = selectedTimes[dateString] || [];
    const updatedTimes = timesForThisDate.includes(time)
      ? timesForThisDate.filter((t) => t !== time)
      : [...timesForThisDate, time];

    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [dateString]: updatedTimes,
    }));
  };

  // Handle klik tanggal (untuk blok tanggal 1 hari)
  const handleDateClick = async (date) => {
    const dateString = format(date, "yyyy-MM-dd");

    // Memeriksa ketersediaan waktu
    const blockedTimesForDate = await checkAvailability(dateString, kategori.nama_kategori);

    // Memeriksa apakah tanggal sudah penuh
    const availableTimes = getAvailableTimesForDay(
      ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][date.getDay()]
    );

    const isFullyBooked = availableTimes.every((time) =>
      blockedTimesForDate.some(
        (blocked) =>
          time >= blocked.start_time && time <= blocked.end_time
      )
    );

    if (isFullyBooked) {
      alert(`Tanggal ${dateString} sudah penuh dibooking.`);
      return;
    }

    if (selectedDates.find((d) => format(d, "yyyy-MM-dd") === dateString)) {
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((d) => format(d, "yyyy-MM-dd") !== dateString)
      );
    } else {
      setSelectedDates((prevSelectedDates) => [...prevSelectedDates, date]);
    }
  };

  // Fungsi untuk menentukan apakah tanggal diblok di kalender
  const isDateBlocked = async (date) => {
    const dateString = format(date, "yyyy-MM-dd");

    // Memeriksa ketersediaan waktu
    const blockedTimesForDate = await checkAvailability(dateString, kategori.nama_kategori);

    // Memeriksa apakah tanggal sudah penuh
    const availableTimes = getAvailableTimesForDay(
      ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][date.getDay()]
    );

    const isFullyBooked = availableTimes.every((time) =>
      blockedTimesForDate.some(
        (blocked) =>
          time >= blocked.start_time && time <= blocked.end_time
      )
    );

    return isFullyBooked;
  };

  const handleSelectAllTimes = (date, availableTimes) => {
    const dateString = format(date, "yyyy-MM-dd");

    // Jika memilih "1 hari", blokir seluruh hari
    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [dateString]: availableTimes,
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
        id_user: user.id_user,
        user: user.user,
        email: user.email,
      },
      item_details: selectedDates.map((date) => {
        const dateString = format(date, "yyyy-MM-dd");
        const times = selectedTimes[dateString] || [];

        const jamMulai = times.length > 0 ? times[0] : "N/A";
        const jamSelesai = times.length > 0 ? times[times.length - 1] : "N/A";

        return {
          tanggal: `${dateString}`,
          name: kategori.nama_kategori,
          price: harga,
          quantity: times.length,
          start_time: jamMulai,
          end_time: jamSelesai,
        };
      }),
    };

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

      snap.pay(data.token, {
        onSuccess: async (result) => {
          alert("Pembayaran berhasil!");
          console.log(result);

          const saveResponse = await fetch("http://localhost:3001/api/payment/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...bookingData,
              transaction_id: result.transaction_id,
            }),
          });

          if (!saveResponse.ok) {
            throw new Error("Gagal menyimpan data booking.");
          }

          alert("Data booking berhasil disimpan.");
        },
        onPending: function (result) {
          alert("Pembayaran masih pending.");
          console.log(result);
        },
        onError: function (result) {
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
        filterDate={async (date) => {
          const dayName = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ][date.getDay()];
          const isOperationalDay = jamOperasional.some((jam) => jam.hari === dayName);
          const isBlocked = await isDateBlocked(date);
          return isOperationalDay && !isBlocked;
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
function BlogDetails({ id, nama, kategori, gambar, harga, jam_operasional, fasilitas }) {
  return (
    <>
      <div className="blog-header">
        <LazyLoadImage
          src={`/${gambar}`}
          width={850}
          height={400}
          alt={nama}
          effect="blur"
          className="blog-image"
        />
      </div>

      <div className="blog-info">
        <h2 className="blog-title">
          {nama} - {kategori && kategori.nama_kategori ? kategori.nama_kategori : "Kategori tidak tersedia"}
        </h2>

        <div className="blog-details">
          <p><strong>Alamat:</strong> {kategori && kategori.alamat ? kategori.alamat : "Alamat tidak tersedia"}</p>
          <p><strong>Kecamatan:</strong> {kategori && kategori.kecamatan ? kategori.kecamatan : "Kecamatan tidak tersedia"}</p>
          <div className="blog-location">
            <p><strong>Lokasi:</strong></p>
            {kategori && kategori.lokasi ? (
              <iframe 
                src={kategori.lokasi}
                width="100%" 
                height="450" 
                style={{ border: 'none', borderRadius: '8px' }} 
                allowFullScreen=""
                loading="lazy"
                title="Lokasi Sarana"
              ></iframe>
            ) : (
              <p>Lokasi tidak tersedia</p>
            )}
          </div>
        </div>

        <div className="blog-fasilitas">
          <h4>Fasilitas:</h4>
          <ul className="fasilitas-list">
            {fasilitas && fasilitas.length > 0 ? (
              fasilitas.map((item, index) => (
                <li key={index} className="fasilitas-item">
                  <strong>{item.nama_fasilitas}</strong> - {item.qty} unit, <em>Kondisi:</em> {item.kondisi}
                </li>
              ))
            ) : (
              <p>Fasilitas tidak tersedia</p>
            )}
          </ul>
        </div>

        {/* Menampilkan jam operasional */}
        <OperationalHours jamOperasional={jam_operasional} />

        {/* Menampilkan section booking */}
        <BookingSection kategori={kategori} jamOperasional={jam_operasional} harga={harga} />
      </div>
    </>
  );
}

export default BlogDetails;