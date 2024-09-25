import { Link } from "react-router-dom";
import ShapeImg from "../../../assets/images/v1/shape1.png";
function HeroContent() {
	return (
		<div className="aximo-hero-content">
			<h1>
				<span className="aximo-title-animation">
				Estripora
				</span>{" "}
				Kota Semarang
			</h1>
			<p>
				{`ESTRIPORA adalah layanan Pemerintah Kota Semarang untuk pemesanan, pendataan, penetapan, dan pembayaran retribusi pada obyek tertentu. Layanan ini bertujuan memudahkan akses masyarakat, meningkatkan akuntabilitas, dan menciptakan pelayanan publik yang unggul dalam sektor pendapatan daerah.`}
			</p>
			<div class="dropdown">
			<button class="aximo-call-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				Pilih Kategori <i className="icon-search"></i>
			</button>
			<ul class="dropdown-menu ">
				<li><a class="dropdown-item" href="#">Manunnggal Jati</a></li>
				<li><a class="dropdown-item" href="#">Sidodadi</a></li>
				<li><a class="dropdown-item" href="#">Tri Lomba Juang</a></li>
				<li><a class="dropdown-item" href="#">Lapangan Citarum</a></li>
				<li><a class="dropdown-item" href="#">Tri Lomba Juang</a></li>
				<li><a class="dropdown-item" href="#">Gelanggang Pemuda</a></li>
				<li><a class="dropdown-item" href="#">Lapangan Tambora</a></li>
				<li><a class="dropdown-item" href="#">Gedung Serba Guna</a></li>
			</ul>
			</div>
			<div className="aximo-hero-shape">
				<img src={ShapeImg} alt="ShapeImg" />
			</div>
		</div>
	);
}

export default HeroContent;
