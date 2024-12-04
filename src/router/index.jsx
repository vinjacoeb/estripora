import { createBrowserRouter } from "react-router-dom";
import LayoutEight from "../components/layout/LayoutEight.jsx";
import LayoutFive from "../components/layout/LayoutFive.jsx";
import LayoutFour from "../components/layout/LayoutFour.jsx";
import LayoutOne from "../components/layout/LayoutOne.jsx";
import LayoutSeven from "../components/layout/LayoutSeven.jsx";
import LayoutSix from "../components/layout/LayoutSix.jsx";
import LayoutThree from "../components/layout/LayoutThree.jsx";
import LayoutTwo from "../components/layout/LayoutTwo.jsx";
import Layout from "../components/layout/index.jsx";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import ErrorPage from "../error-page";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import Pricing from "../page/Pricing";
import Reset from "../page/auth/ResetPassword.jsx";
import SignIn from "../page/auth/SignIn";
import SignUp from "../page/auth/SignUp";
import BlogGridPage from "../page/blog/BlogGridPage.jsx";
import BlogPage from "../page/blog/BlogPage.jsx";
import SingleBlogPage from "../page/blog/SingleBlog.jsx";
import HomeFive from "../page/home/HomeFive.jsx";
import HomeFour from "../page/home/HomeFour.jsx";
import HomeOne from "../page/home/HomeOne.jsx";
import HomeSeven from "../page/home/HomeSeven.jsx";
import HomeSix from "../page/home/HomeSix.jsx";
import HomeThree from "../page/home/HomeThree.jsx";
import HomeTwo from "../page/home/HomeTwo.jsx";
import PortfolioOneColumn from "../page/portfolio/PortfolioOneColoum";
import PortfolioTwoColumn from "../page/portfolio/PortfolioTwoColumn";
import SinglePortfolio from "../page/portfolio/SinglePortfolio";
import Service from "../page/service";
import SingleService from "../page/service/SingleService.jsx";
import Team from "../page/team";
import SingleTeam from "../page/team/SingleTeam.jsx";
import CommingSoon from "../page/utility/CommingSoon.jsx";
import Faq from "../page/utility/Faq.jsx";
import TestimonialPage from "../page/utility/Testimonial.jsx";
import Sarana from "../page/Sarana.jsx";
import SaranaDetail from "../page/SaranaDetailPage.jsx";
import Cetak from "../page/Cetak.jsx";
import Dashboard from "../page/admin/Dashboard.jsx";
import AdminSarana from "../page/admin/Sarana.jsx";
import AdminSaranaEdit from "../page/admin/SaranaEdit.jsx";
import AdminSaranaTambah from "../page/admin/SaranaTambah.jsx";
import AdminJamOperasional from "../page/admin/JamOperasional.jsx";
import AdminJamOperasionalEdit from "../page/admin/JamOperasionalEdit.jsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LayoutOne />,
				children: [
					{
						path: "/",
						element: <HomeOne />,
					},
					{
						path: "/sarana",
						element: <Sarana />,
					},
					{
						path: "/sarana-detail/:id", // Use a dynamic segment for the ID
						element: <SaranaDetail />,
					  },
					{
						path: "/cetak",
						element: <Cetak />,
					},
					{
						path: "/about-us",
						element: <AboutUs />,
					},
					{
						path: "/contact-us",
						element: <ContactUs />,
					},
					{
						path: "/faq",
						element: <Faq />,
					},

					{
						path: "/testimonial",
						element: <TestimonialPage />,
					},

					{
						path: "/pricing",
						element: <Pricing />,
					},
					{
						path: "/blog",
						element: <BlogPage />,
					},
					{
						path: "/single-blog",
						element: <SingleBlogPage />,
					},
					{
						path: "/blog-grid",
						element: <BlogGridPage />,
					},
					{
						path: "/service",
						element: <Service />,
					},
					{
						path: "/single-service",
						element: <SingleService />,
					},
					{
						path: "/team",
						element: <Team />,
					},
					{
						path: "/single-team",
						element: <SingleTeam />,
					},
					{
						path: "/portfolio-one",
						element: <PortfolioOneColumn />,
					},
					{
						path: "/portfolio-two",
						element: <PortfolioTwoColumn />,
					},					
					{
						path: "/single-portfolio",
						element: <SinglePortfolio />,
					},
					{
						path: "*",
						element: <ErrorPage />,
					},
					{
						path: "/reset-password",
						element: <Reset />,
					},
					{
						path: "/sign-up",
						element: <SignUp />,
					},
					{
						path: "/sign-in",
						element: <SignIn />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutTwo />,
				children: [
					{
						path: "/home-two",
						element: <HomeTwo />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutThree />,
				children: [
					{
						path: "/home-three",
						element: <HomeThree />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutFour />,
				children: [
					{
						path: "/home-four",
						element: <HomeFour />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutFive />,
				children: [
					{
						path: "/home-five",
						element: <HomeFive />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutSix />,
				children: [
					{
						path: "/home-six",
						element: <HomeSix />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutSeven />,
				children: [
					{
						path: "/home-seven",
						element: <HomeSeven />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutEight />,
				children: [
					{
						path: "/coming-soon",
						element: <CommingSoon />,
					},
					
				],
				path: "/",
				element: <DashboardLayout />,
				children: [
					{
						path: "/dashboard",
						element: <Dashboard />, // Dashboard component
					},
					{
						path: "/admin-sarana",
						element: <AdminSarana />, // Dashboard component
					},
					{
						path: "/admin-sarana/add",
						element: <AdminSaranaTambah />, // Dashboard component
					},
					{
						path: "/admin-sarana/edit/:id",
						element: <AdminSaranaEdit />, // Dashboard component
					},
					{
						path: "/admin-JamOperasional",
						element: <AdminJamOperasional />, // Dashboard component
					},
					{
						path: "/admin-JamOperasional/edit/:id",
						element: <AdminJamOperasionalEdit />, // Dashboard component
					},
					{
						path: "*",
						element: <ErrorPage />, // Handle errors
					},
				],
			},
		],
	},
]);




