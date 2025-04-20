import React, { useEffect, useState } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from "react-redux"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"

// const subLinks = [
// 	{
// 		title: "Python",
// 		link: "/catalog/python",
// 	},
// 	{
// 		title: "Javascript",
// 		link: "/catalog/javascript",
// 	},
// 	{
// 		title: "Web Development",
// 		link: "/catalog/web-development",
// 	},
// 	{
// 		title: "Android Development",
// 		link: "/catalog/android-development",
// 	},
// ];

const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);
	const location = useLocation();

	const [subLinks, setSubLinks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				const result = await apiConnector("GET", categories.CATEGORIES_API);
				console.log("Printing Sublinks result:", result);
				setSubLinks(result.data.data);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, [])

	const matchRoute = (route) => {
		return matchPath({ path: route }, location.pathname);
	}

	return (
		<div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
			${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
			<div className='flex w-11/12 max-w-(--max-content) items-center justify-between'>
				<Link to='/'>
					<img src={logo} width={160} height={32} loading="lazy" />
				</Link>

				<nav className="hidden md:block">
					<ul className="flex gap-x-6 text-richblack-25">
						{
							NavbarLinks.map((link, index) => {
								return (
									<li key={index}>
										{
											link.title === "Catalog" ? (
												<div className={`group relative flex items-center gap-1 cursor-pointer
													${matchRoute("/catalog/:catalogName")
														? "text-yellow-25"
														: "text-richblack-25"
													}`}
												>
													<p>{link.title}</p>
													<BsChevronDown />
													<div className='invisible absolute left-[50%] top-[50%] z-[1000] w-[200px]
                                    		translate-x-[3em] translate-y-[3em] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900
                                				opacity-0 transition-all duration-150 group-hover:visible
                                				group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

														<div className='absolute left-[50%] top-0 translate-x-[80%]
                                					translate-y-[-45%] h-6 w-6 -z-10 rotate-45 rounded bg-richblack-5 select-none'>
														</div>
														{
															subLinks.length ? (
																subLinks.map((subLink, index) => (
																	<Link to={`${subLink.link}`} key={index}>
																		<p>{subLink.title}</p>
																	</Link>
																))
															) : (<p className="text-center">No Courses Found</p>)
														}
													</div>
												</div>
											) : (
												<Link to={link?.path}>
													<p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
														{link.title}
													</p>
												</Link>
											)
										}
									</li>
								)
							})
						}
					</ul>
				</nav>

				{/* Login/SignUp/Dashboard */}
				<div className="flex gap-x-4 items-center">
					{
						user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
							<Link to="/dashboard/cart" className="relative">
								<AiOutlineShoppingCart className="text-2xl text-richblack-100" />
							</Link>
						)
					}
					{
						token === null && (
							<Link to="/login">
								<button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
									Log in
								</button>
							</Link>
						)
					}
					{
						token === null && (
							<Link to="/signup">
								<button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
									Sign Up
								</button>
							</Link>
						)
					}
					{
						token !== null && <ProfileDropDown />
					}
					<button className="mr-4 md:hidden">
						<AiOutlineMenu fontSize={24} fill="#AFB2BF" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar