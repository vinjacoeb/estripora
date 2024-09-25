import { Link } from "react-router-dom";

function HeaderMenu() {
	return (
		<div className="menu-block-wrapper">
			<div className="menu-overlay"></div>
			<nav className="menu-block" id="append-menu-header">
				<div className="mobile-menu-head">
					<div className="go-back">
						<i className="fa fa-angle-left"></i>
					</div>
					<div className="current-menu-title"></div>
					<div className="mobile-menu-close">&times;</div>
				</div>
				<ul className="site-menu-main">
					<li className="nav-item">
						<Link to="/" className="nav-link-item">
							<i className="fas fa-home" style={{ color: 'white' }}></i> Beranda
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/keranjang" className="nav-link-item">
							<i className="fas fa-shopping-cart" style={{ color: 'white' }}></i> Keranjang
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/cetak-bukti" className="nav-link-item">
							<i className="fas fa-print" style={{ color: 'white' }}></i> Cetak Bukti Pembayaran
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/contact-us" className="nav-link-item">
							<i className="fas fa-envelope" style={{ color: 'white' }}></i> Kontak Kami
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link-item">
							<i className="fas fa-user" style={{ color: 'white' }}></i> Login
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default HeaderMenu;
