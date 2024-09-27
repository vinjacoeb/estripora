import React from "react";
import BreadCrumb from "../components/common/Breadcrumb";
import SaranaComponent from "../components/sarana";



function Sarana() {  // Komponen ini tetap menggunakan nama Sarana
	return (
		<>
			<BreadCrumb title="Sarana" />
			<SaranaComponent /> {/* Menggunakan SaranaComponent di sini */}
		</>
	);
}

export default Sarana;
