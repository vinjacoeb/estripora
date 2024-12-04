import React from "react"; // Import React
import SaranaDetail from "../components/sarana/single-blog"; // Import the SaranaDetail component
import BreadCrumb from "../components/common/Breadcrumb"; // Import the BreadCrumb component

function SaranaDetailPage() {
	return (
		<>
			<BreadCrumb title="Sarana Detail" />
			<SaranaDetail /> {/* Render the SaranaDetail component */}
		</>
	);
}

export default SaranaDetailPage;