import { Link } from "react-router-dom";
function ProjectCard({ project: { title, description, harga, img } }) {
	return (
		<div className="aximo-project-thumb">
			<img src={img} alt={title} style={{ width: "100%", height: "auto" }} />
			<div className="aximo-project-wrap" style={{ padding: "10px", margin: "0" }}>
				<div className="aximo-project-data">
					<Link to="/single-portfolio">
						<h3 style={{ margin: "0", padding: "0" }}>{title}</h3>
					</Link>
					<p style={{ margin: "5px 0" }}>{harga}</p>
				</div>
				<Link className="aximo-project-icon" to="/single-portfolio">
					<svg
						width="30"
						height="15"
						viewBox="0 0 30 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
							stroke="#FDFDE1"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}

export default ProjectCard;
