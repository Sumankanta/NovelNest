import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//react icon
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from '../contects/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { user } = useContext(AuthContext);
    console.log(user);
    //toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])

    //navItems here
    const navItems = [
        { link: "Home", path: "/" },
        { link: "Shop", path: "/shop" },
        { link: "Blog", path: "/blog" },
        { link: "Sell Your Book", path: "/admin/dashboard" },
        { link: "About", path: "/about" }
    ]
    const cartItem = [
        { link: "Cart", path: "/cart" }
    ]
    return (
        <header className='w-full backdrop-blur-md fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-40'>
            {/**backdrop-blur-md */}
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 text-blue-300" : "bg-blue-200"}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* logo */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block' />NovelNest</Link>

                    {/* nav item for large device */}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
                        }
                    </ul>

                    {/* button for lg devices */}
                    <div className='space-x-1 hidden lg:flex items-center text-black'>
                        <Link to="/cart" className='text-xl font-bold flex items-center gap-2'><FaCartShopping className='inline-block' />|</Link>
                        <button><FaBarsStaggered className='w-5 hidden' /></button>
                        {
                            user ? user.displayName  ||"User":<Link to="/Login" className='flex items-center gap-2'>Login</Link>
                        }
                    </div>

                    {/* menu btn for the mobile device */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                </div>

                {/**navitems for sm devices*/}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>)
                    }
                    {
                        cartItem.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>)
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar