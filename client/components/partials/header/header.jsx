import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { Avatar, Badge } from '@windmill/react-ui';

import ALink from "~/components/features/alink";
import LoginModal from "~/components/features/modals/login-modal";
import HeaderSearch from "~/components/partials/header/partials/header-search";
import WishlistMenu from "~/components/partials/header/partials/wishlist-menu";
import CartMenu from "~/components/partials/header/partials/cart-menu";
import CompareMenu from "./partials/compare-menu";
import MainMenu from "~/components/partials/header/partials/main-menu";
import StickyHeader from "~/components/features/sticky-header";
import CategoryMenu from "./partials/category-menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationOnIcon from '@mui/icons-material/LocationOn'


const Header = ({ user }) => {
  const [profileOpen, setProfileOpen] = useState(false);


  const router = useRouter();
  const [containerClass, setContainerClass] = useState("container");

  function openMobileMenu() {
    document.querySelector("body").classList.add("mmenu-active");
  }

  useEffect(() => {
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };



  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false)

  const fetchData = () => {
    fetch("http://localhost:5000/api/view")

      .then(response => {

        return response.json()

      })

      .then(categories => {

        setCategories(categories)
        setLoading(false)

      })
  }
  useEffect(() => {
    setLoading(true)


    fetchData()

  }, [])
  console.log(categories, 'categorie')
  const customId = "custom-id-yes";
  const Toasty = () =>
    toast.success("🚀You have been successfuly logged In ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: customId,
      theme: "colored",
    });

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);

  };


  return (
  
    <header className="header header-22" >
      
      <div className="header-middle " style={{ background: "white", backgroundColor: "white" }}>
        <nav className="dl-x-block top-menu-nav " style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #f2f2f2", listStyle: "none" }}>
          <div className="container">

            <div className="header-left">
              <button
                className="mobile-menu-toggler text-white"
                onClick={openMobileMenu}
              >
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars"></i>
              </button>

              <ALink href="/" >
                <span className="text-center welcome">    Welcome to Atana Mall Online Shopping</span>
              </ALink>
              </div>
          
            <div className="header-right" >
              <div>
                <li> <a href="" id="menu-item" ><LocationOnIcon /> Store locator</a></li>

              </div>
              <div>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item"><a title="Track Your Order" id="menu-item" href="https://atana.co.ke/track-your-order/">Track Your Order</a></li>

              </div>
              <div>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item"><a title="Shop" href="https://atana.co.ke/track-your-order/" id="menu-item" > Shop</a></li>

              </div>
              <div>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item"><a  href={<LoginModal />} id="menu-item"  title="My Account " style={{borderRight:"none"}}><i className="icon-user p-2"></i>My Account</a></li>

              </div>

            </div>
          </div>
        </nav>
        <div className={containerClass}>
          <div className="header-left">
            <button
              className="mobile-menu-toggler text-white"
              onClick={openMobileMenu}
            >
              <span className="sr-only">Toggle mobile menu</span>
              <i className="icon-bars"></i>
            </button>

            <ALink href="/" className="logo">
              <img
                src="https://atana.co.ke/wp-content/uploads/2019/11/atana.png"
                alt="Molla Logo"
                className="bg-transparent"
                width="150"
                height="150"
              />
            </ALink>
          </div>

          <div className="header-center">
            <HeaderSearch />
          </div>

          <div className="header-right">
            <CompareMenu />

            <WishlistMenu />

            <CartMenu />
          </div>
          <div className=" header-right ">
            {user ? (
              // (Toasty(),
              // (
              //   <ToastContainer
              //     autoClose={3000}

              //   />
              // ),
              (console.log({ user }),
                (

                  <ul className="text-center" >
                    <button
                      className="rounded-full dark:bg-gray-500 bg-green-500 text-black h-8 w-8 font-medium mx-auto focus:outline-none mt-2 "
                      onClick={handleProfileOpen}
                    >
                      {user.photos ? (
                        <li className="top-menu top-link-menu header-right header-text ">
                          {""}
                          <img
                            src={`${user.photos[0].value}`}
                            alt="avatar"
                            width="40"
                            height="20"
                            style={{
                              borderRadius: "70%",
                              objectFit: "cover",
                            }}
                          />
                        </li>
                      ) : (
                        <span>
                          <LazyLoadImage
                            alt={user.displayName}
                            src={user.photos[0].value}
                            threshold={200}
                            width="100"
                            height="50"
                            effect="blur"
                          />

                        </span>
                      )}
                    </button>
                    {profileOpen && (
                      <div className="ml-5">
                        <li
                          className="listItem mb-1 "
                          style={{
                            fontWeight: "500",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "black",
                          }}
                        >
                          {""}
                          {user.displayName}

                        </li>

                        <li className="listItem" onClick={logout} >
                          <button
                            className="btn btn-outline-dark btn-sm   btn-rounded "
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            {" "}
                            Logout{" "}
                          </button>
                        </li>
                      </div>
                    )}

                  </ul>

                ))

            ) : (
              <ALink className="link ml-5 p-5" href={<LoginModal />}>
                <div className="header-right">
                  <div className="header-text">
                    <ul className="top-menu top-link-menu">
                      <li>
                        <ul>
                          <LoginModal />
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </ALink>
            )}
          </div>

        </div>

      </div>

      <StickyHeader>
        <div className="wrap-container sticky-header" style={{background:"white", borderBottom:"4px solid #f5f5f5"}}>
          <div className="header-bottom">
            <div className={containerClass} >

              {categories.length > 0 && <CategoryMenu cat={categories} />}

              <div className="header-center mr-5">
                <MainMenu />
              </div>


            </div>
          </div>
        </div>
      </StickyHeader>
    </header>
  );
};

export default Header;