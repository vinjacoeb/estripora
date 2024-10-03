function Accordion() {
	return (
		<div className="accordion aximo-accordion-wrap" id="aximo-accordion">
			<div className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
					>
						01/ Pesan
					</button>
				</h3>
				<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Pilih sarana yang ingin disewa.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<h3 className="accordion-header" id="headingOne">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
					>
						02/ Verifikasi
					</button>
				</h3>
				<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Pesanan akan diverifikasi oleh OPD yang terkait.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseThree"
					>
						03/ Cetak ID
					</button>
				</h3>
				<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Cetak ID billing pemesanan.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseFour"
					>
						04/ Pembayaran
					</button>
				</h3>
				<div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
					Pembayaran dapat melalui Bank Persepsi, ATM, e-Banking, m-Banking, e-Wallet, dan gerai pembayaran.
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
