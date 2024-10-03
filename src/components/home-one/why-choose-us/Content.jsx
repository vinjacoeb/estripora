import Star2Img from "../../../assets/images/v1/star2.png";
function Content() {
	return (
		<div className="aximo-default-content">
			<h2>
				<span className="aximo-title-animation">
				Dilaksanakan 
					<span className="aximo-title-icon">
						<img src={Star2Img} alt="Star2Img" />
					</span>
				</span>{" "}
				Kapanpun dan Dimanapun
			</h2>
			<p style={{ textAlign: 'justify' }}>
			Dengan sistem yang online maka kewajiban Retribusi dapat dilaksanakan dimanapun dan kapanpun selama ada akses internet, 
			dan untuk pembayaran Wajib Retribusi dapat membayar 
			melalui Bank Persepsi, ATM, e-Banking, m-Banking, e-Wallet, dan gerai pembayaran.
			</p>
		</div>
	);
}

export default Content;
