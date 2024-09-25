/* eslint-disable for-direction */
import useMenu from "../../../hooks/useMenu";
import Navbar from "../../common/menu/Navbar";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";

function Header() {
	const {
		toggleMenu,
		mobileSubMenu,
		mobileSubMenuSub,
		handleSubMenu,
		handleSubMenuSub,
		handleGoBack,
		handleMenu,
		menuTitle,
		setToggleMenu,
	} = useMenu();

	return (
		<header className="site-header aximo-header-section aximo-header1 dark-bg" id="sticky-menu">
			<div className="container">
				<nav className="navbar site-navbar">
					<HeaderLogo />
					<div className="menu-block-wrapper">
						<div
							className={`menu-overlay ${toggleMenu ? "active" : ""}`}
							onClick={handleMenu}
							aria-hidden="true" // Hides from screen readers
						></div>
						<Navbar
							toggleMenu={toggleMenu}
							handleMenu={handleMenu}
							handleGoBack={handleGoBack}
							mobileSubMenu={mobileSubMenu}
							handleSubMenu={handleSubMenu}
							mobileSubMenuSub={mobileSubMenuSub}
							handleSubMenuSub={handleSubMenuSub}
							menuTitle={menuTitle}
						/>
					</div>
					<HeaderButton />
					<div
						className="mobile-menu-trigger light"
						onClick={() => setToggleMenu(true)}
						aria-label="Open mobile menu" // Accessibility label
					>
						<span></span>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default Header;