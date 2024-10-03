import Star2Img from "../../../assets/images/v1/star2.png";
import Project1Img from "../../../assets/images/v1/tenis.jpeg";
import Project2Img from "../../../assets/images/v1/sirkuit.jpg";
import Project3Img from "../../../assets/images/v1/futsal.jpg";
import Project4Img from "../../../assets/images/v1/kantin.jpeg";
import Project5Img from "../../../assets/images/v1/tenis2.png";
import Project6Img from "../../../assets/images/v1/sepakbola.jpeg";
import ProjectCard from "./ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";

const projectsData = [
	{
		id: crypto.randomUUID(),
		title: "LAPANGAN TENIS MANUNGGAL JATI",
		description: "Harga Sewa: ",
		harga: "Harga Sewa: Rp.200.000/jam",
		img: Project1Img,
	},
	{
		id: crypto.randomUUID(),
		title: "SIRKUIT MIJEN",
		description: "Creating or refreshing a company's logo and developing a cohesive visual identity.",
		harga: "Harga Sewa: Rp.400.000/jam",
		img: Project2Img,
	},
	{
		id: crypto.randomUUID(),
		title: "GEDUNG FUTSAL GOR MANUNGGAL JATI",
		description: "Designing the UI/UXe for mobile apps and web applications to ensure usability & engagement.",
		harga: "Harga Sewa: Rp.150.000/jam",
		img: Project3Img,
	},
	{
		id: crypto.randomUUID(),
		title: "LAHAN KANTIN A MANUNGGAL JATI",
		description: "Creating packaging solutions for products that not only protect attract customers on store.",
		harga: "Harga Sewa: Rp.250.000/jam",
		img: Project4Img,
	},
	{
		id: crypto.randomUUID(),
		title: "LAPANGAN TENIS GOR TRI LOMBA JUANG",
		description: "Developing the look and feel of physical products, aesthetics, and functionality.",
		harga: "Harga Sewa: Rp.500.000/jam",
		img: Project5Img,
	},
	{
		id: crypto.randomUUID(),
		title: "LAPANGAN SEPAKBOLA SIDODADI",
		description: "Creating or refreshing a company's logo and developing a cohesive visual identity.",
		harga: "Harga Sewa: Rp.350.000/jam",
		img: Project6Img,
	},
];

const swiperSettings = {
	spaceBetween: 15, // Pastikan tidak ada jarak antar slide
	direction: "horizontal",
	pagination: {
		clickable: true,
	},
	modules: [Pagination, Mousewheel],
	mousewheel: true,
	breakpoints: {
		640: {
			slidesPerView: 3,
		},
		900: {
			slidesPerView: 3,
		},
		1600: {
			slidesPerView: 3.5,
		},
	},
};

function Projects() {
	return (
		<div className="section dark-bg aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center light">
					<h2>
						<span className="aximo-title-animation">
							Layanan Sarana
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star2Img" />
							</span>
						</span>
					</h2>
				</div>
			</div>
			<div className="swiper aximo-project-slider">
				<Swiper {...swiperSettings}>
					{projectsData.map((project) => (
						<SwiperSlide key={project.id}>
							<div style={{ width: '100%', padding: '0', margin: '0' }}>
								<ProjectCard project={project} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default Projects;
