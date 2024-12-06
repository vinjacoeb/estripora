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
				  backgroundColor: jam.hari === currentDay ? "#d4edda" : "transparent", // Hijau untuk hari ini
				  color: jam.hari === currentDay ? "#155724" : "#000", // Warna teks hijau gelap untuk hari ini
				  border: jam.hari === currentDay ? "1px solid #c3e6cb" : "none", // Tambahkan border untuk visualisasi
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
	const [totalPrice, setTotalPrice] = useState(0); // State for total price
  
	// Fungsi untuk mendapatkan jam yang tersedia per hari
	const getAvailableTimesForDay = (dayName) => {
	  const dayOperasional = jamOperasional.find((jam) => jam.hari === dayName);
	  if (dayOperasional) {
		return generateAvailableTimes(dayOperasional.jam_mulai, dayOperasional.jam_selesai); // Generate times based on jam_operasional
	  }
	  return []; // Return empty array if no operational hours for the selected day
	};
  
	// Fungsi untuk menghasilkan rentang waktu
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
  
	useEffect(() => {
	  // Menghitung total harga setiap kali selectedDates atau selectedTimes berubah
	  calculateTotalPrice();
	}, [selectedDates, selectedTimes, harga]);
  
	// Fungsi untuk menghitung total harga
	const calculateTotalPrice = () => {
	  if (selectedDates.length === 0) {
		setTotalPrice(0);
		return;
	  }
  
	  let total = 0;
	  selectedDates.forEach((date) => {
		const dateString = date.toISOString().split("T")[0]; // Format date as string (YYYY-MM-DD)
		const selectedTimeForDate = selectedTimes[dateString] || [];
		total += harga * selectedTimeForDate.length;
	  });
  
	  setTotalPrice(total);
	};
  
	const handleTimeClick = (time, date) => {
	  const dateString = date.toISOString().split("T")[0]; // Format date as string (YYYY-MM-DD)
  
	  // Check if the time is already selected for this date
	  const timesForThisDate = selectedTimes[dateString] || [];
  
	  if (timesForThisDate.includes(time)) {
		// If time is already selected, remove it
		setSelectedTimes({
		  ...selectedTimes,
		  [dateString]: timesForThisDate.filter((t) => t !== time),
		});
	  } else {
		// If time is not selected, add it
		setSelectedTimes({
		  ...selectedTimes,
		  [dateString]: [...timesForThisDate, time],
		});
	  }
	};
  
	const handleDateClick = (date) => {
		// Pastikan tanggal diformat dengan benar
		const dateString = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
	  
		// Periksa apakah tanggal sudah dipilih
		if (selectedDates.find((selectedDate) => selectedDate.toISOString().split("T")[0] === dateString)) {
		  // Hapus tanggal jika sudah dipilih
		  setSelectedDates(selectedDates.filter((selectedDate) => selectedDate.toISOString().split("T")[0] !== dateString));
		} else {
		  // Tambahkan tanggal jika belum dipilih
		  setSelectedDates([...selectedDates, date]);
		}
	  };
	  
	  const handleBooking = async () => {
		if (selectedDates.length === 0) {
		  alert("Pilih tanggal bermain.");
		  return;
		}
	  
		const bookingData = {
		  dates: selectedDates.map((date) => date.toISOString().split("T")[0]), // Pastikan format tanggal konsisten
		  times: selectedTimes,
		  totalPrice,
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
			setSelectedDates([]);
			setSelectedTimes({});
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
		  selected={null}
		  onChange={handleDateClick}
		  minDate={new Date()}
		  dateFormat="dd/MM/yyyy"
		  inline
		  highlightDates={selectedDates}
		  filterDate={(date) => {
			const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][date.getDay()];
			return jamOperasional.some((jam) => jam.hari === dayName);
		  }}
		/>
  
		{/* Menampilkan tanggal yang dipilih beserta jam operasionalnya */}
		{selectedDates.length > 0 && (
		  <div className="selected-dates-times">
			{selectedDates.map((date, index) => {
			  const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][date.getDay()];
			  const availableTimesForDay = getAvailableTimesForDay(dayName);
			  const formattedDate = date.toLocaleDateString("id-ID");
  
			  return (
				<div key={index} className="day-times">
				  <h5>Jam Bermain {formattedDate}</h5>
				  <div className="times">
					{availableTimesForDay.map((time, idx) => {
					  const isSelected = (selectedTimes[date.toISOString().split("T")[0]] || []).includes(time);
					  return (
						<button
						  key={idx}
						  onClick={() => handleTimeClick(time, date)}
						  style={{
							padding: "10px 20px",
							borderRadius: "8px",
							border: "1px solid #ccc",
							backgroundColor: isSelected ? "#007bff" : "#f1f1f1",
							color: isSelected ? "#fff" : "#333",
							cursor: "pointer",
						  }}
						>
						  {time}
						</button>
					  );
					})}
				  </div>
				</div>
			  );
			})}
		  </div>
		)}
  
		<div className="total-price" style={{ marginTop: "20px", fontSize: "18px" }}>
		  <p>Total Biaya: Rp {totalPrice.toLocaleString()}</p>
		</div>
  
		<div className="booking-button" style={{ marginTop: "30px" }}>
		  <button
			onClick={handleBooking}
			style={{
			  padding: "10px 20px",
			  backgroundColor: "#28a745",
			  border: "none",
			  color: "#fff",
			  fontSize: "16px",
			  cursor: "pointer",
			  borderRadius: "5px",
			}}
		  >
			Booking Sekarang
		  </button>
		</div>
	  </div>
	);
  };
  
// Main BlogDetails Component
function BlogDetails({ id, nama, sarana, gambar, harga, kecamatan, jam_operasional }) {
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
        <h2>
          {sarana} - {nama}
        </h2>
        <div className="location">
          <span>{kecamatan}</span>
        </div>
        <div className="details">
          <div className="price">
            <span>Harga: Rp {harga}/jam</span>
          </div>
        </div>

        <OperationalHours jamOperasional={jam_operasional} />
        <BookingSection harga={harga} jamOperasional={jam_operasional} />
      </div>
    </>
  );
}

export default BlogDetails;
