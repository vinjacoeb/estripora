import SearchIcon from "../../assets/images/icon/search.svg";

function Search() {
	return (
		<div className="widget" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
			<div className="wp-block-search__inside-wrapper" style={{ display: "flex", alignItems: "center" }}>
				<input
					type="search"
					placeholder="Type keyword here"
					className="wp-block-search__input"
					style={{ flexGrow: 1, marginRight: "8px" }} // Adjust the margin as needed
					
				/>
			
				<button id="wp-block-search__button" type="submit" style={{ border: "none", background: "none", cursor: "pointer" }}>
				<i className="icon-search"></i>
				</button>
			</div>
		</div>
	);
}

export default Search;
