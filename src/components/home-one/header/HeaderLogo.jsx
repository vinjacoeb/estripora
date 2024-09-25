import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo/Lambang_Kota_Semarang.png";

function HeaderLogo() {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			padding: "10px 20px",
		}}>
			<Link to="/">
				<img
					src={Logo}
					alt="Logo"
					className="light-version-logo"
					style={{ width: "40px", height: "50px", marginRight: "15px" }}
				/>
			</Link>
			<p style={{
				fontSize: "medium",
				color: "white"
			}}>
				<b>Estripora Kota Semarang</b>
			</p>
		</div>
	);
}

export default HeaderLogo;
