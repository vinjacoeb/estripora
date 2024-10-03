import Star2Img from "../../assets/images/v1/star2.png";
import QuestionImg from "../../assets/images/icon/question.svg";
const faqData = {
	faq1: [
		{
			id: crypto.randomUUID(),
			title: "Apa saja layanan yang disediakan oleh Estripora Kota Semarang?",
			text: "Kami menyediakan layanan penyewaan berbagai fasilitas olahraga dan sarana publik yang dikelola oleh Dinas Estripora Kota Semarang, termasuk lapangan olahraga, gedung pertemuan, dan lainnya.",
		},
		{
			id: crypto.randomUUID(),
			title: "Bagaimana proses penyewaan sarana?",
			text: "Proses penyewaan kami mudah. Pilih sarana yang ingin disewa, tentukan tanggal dan waktu, lalu selesaikan pembayaran. Kami akan mengonfirmasi penyewaan Anda segera setelah pembayaran selesai.",
		},
		{
			id: crypto.randomUUID(),
			title: "Bagaimana alur pemesanan penyewaan?",
			text: "Alur pemesanan kami dimulai dengan pemilihan sarana yang ingin disewa, memilih tanggal yang tersedia, mengisi informasi penyewa, dan menyelesaikan pembayaran.",
		},
	],
	faq2: [
		{
			id: crypto.randomUUID(),
			title: "Berapa biaya sewa sarana?",
			text: "Biaya sewa sarana bervariasi tergantung pada jenis sarana dan durasi pemakaian. Harga yang ditampilkan pada platform kami sudah termasuk biaya pemakaian standar.",
		},
		{
			id: crypto.randomUUID(),
			title: "Bagaimana kami menanggapi masukan pengguna?",
			text: "Kami sangat menghargai masukan dari para penyewa. Jika Anda memiliki saran atau pertanyaan, Anda dapat menghubungi kami melalui halaman 'Kontak Kami' atau langsung melalui email.",
		},
		{
			id: crypto.randomUUID(),
			title: "Apakah kami bisa melihat detail sarana yang tersedia?",
			text: "Ya, Anda dapat melihat detail lengkap dari setiap sarana yang tersedia, termasuk foto, deskripsi, dan fasilitas yang ditawarkan, pada halaman utama kami.",
		},
	],
};
function TwoColumnFaq() {
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						These FAQs help
						<span className="aximo-title-animation">
							clients learn about us
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="aximo-accordion-normal-wrap responsive-margin">
							{faqData.faq1.map((faq) => (
								<div key={faq.id} className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<img src={QuestionImg} alt="QuestionImg" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>{faq.title}</h3>
										<p>{faq.text}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="col-lg-6">
						<div className="aximo-accordion-normal-wrap">
							{faqData.faq2.map((faq) => (
								<div key={faq.id} className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<img src={QuestionImg} alt="QuestionImg" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>{faq.title}</h3>
										<p>{faq.text}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TwoColumnFaq;
