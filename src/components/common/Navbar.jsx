import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"

const Navbar = () => {
    return (
        <div>
            <div>
                <Link to='/'>
                    <img src={logo} width={160} height={42} loading="lazy" />
                </Link>

                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (<div></div>) : (<Link to={link?.path}>
                                                <p>
                                                    {link.title}
                                                </p>
                                            </Link>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar