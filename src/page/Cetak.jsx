import React from "react";
import BreadCrumb from "../components/common/Breadcrumb";
import CetakComponent from "../components/cetak";



function Cetak() {  // Komponen ini tetap menggunakan nama Sarana
	return (
		<>
			<BreadCrumb title="Cetak" />
			<CetakComponent /> {/* Menggunakan SaranaComponent di sini */}
		</>
	);
}

export default Cetak;
