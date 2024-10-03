import Shape2Img from "../../../assets/images/v4/shape2.png";
import Thumb1Img from "../../../assets/images/v4/new2.png";

function WhyChooseUs() {
	return (
		<div className="section" style={{ paddingTop: '50px', paddingBottom: '50px',}}> {/* Tambahkan margin atau padding */}
			<div className="container">
				<div className="row align-items-center"> {/* Tambahkan align-items-center untuk menyelaraskan */}
					<div className="col-lg-5 mb-4 mb-lg-0"> {/* Tambahkan margin bottom untuk layar kecil */}
						<div className="aximo-content-thumb border-radius">
							<img src={Thumb1Img} alt="Thumb1Img" />
							<div className="aximo-thumb-shape4">
								<img src={Shape2Img} alt="Shape2Img" />
							</div>
						</div>
					</div>
					<div className="col-lg-7">
						<div className="aximo-default-content arimo-font m-left-gap">
							<span className="aximo-subtitle">Kenapa Estripora?</span>
							<h2 style={{ fontSize: '50px' }}>
      							Jenis-jenis Layanan
    						</h2>
							<p style={{ textAlign: 'justify' }}>
      							Beberapa layanan pada situs ini diantaranya, Sewa Lahan, Gedung Pertemuan Manunggal Jati, Ruangan/Toko di Lapangan Citarum, Tempat Penginapan Gelanggang Pemuda, Penggunaan Gedung Tri Lomba Juang, Lapangan Sepakbola Sidodadi, Lapangan Sepakbola Citarum, Lapangan Tenis Tambora, Lapangan GOR Tri Lomba Juang, GOR Gelanggang Pemuda Manunggal Jati, Penggunaan Sirkuit Mijen, Gedung Serba Guna, Penginapan, Gelanggang Renang, Padepokan Pencak Silat Gunung Talang, Sport Center Mangkang Wetan, Fitnes GOR Tri Lomba Juang, Penginapan Range, dan masih banyak layanan lagi yang akan di sediakan pada situs ini.
    						</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WhyChooseUs;
