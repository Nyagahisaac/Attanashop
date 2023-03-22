import Reveal from 'react-awesome-reveal';
import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Apollo And Queries
import withApollo from '~/server/apollo';
import { GET_HOME_DATA } from '~/server/queries';

// Import Custom Component
import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import FeauredCollection from '~/components/partials/home/featured-collection';
import SpecialCollection from '~/components/partials/home/special-collection';
import BlogCollection from '~/components/partials/home/blog-collection';
import NewsletterModal from "~/components/features/modals/newsletter-modal";

// Import Utils
import { attrFilter } from '~/utils';
import { brandSlider } from '~/utils/data';
import { useEffect, useState } from "react";
import {
    TableCell,
    TableBody,
    TableRow,
    Badge,
    Avatar,
} from '@windmill/react-ui';
import { height } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import ProgressBar from "@ramonak/react-progress-bar";



const Home = () => {
    const { data, loading, error } = useQuery(GET_HOME_DATA);
    const product = data && data.homeData.products;
    const topProducts = attrFilter(data && data.homeData.products, 'top');
    const posts = data && data.homeData.posts;

    const [coupons, setCoupons] = useState([]);
    const [brands, setBrands] = useState();
    const [isLoading, setLoading] = useState(false)

    const fetchCouponData = () => {
        fetch("http://localhost:5000/api/coupon")

            .then(response => {

                return response.json()

            })

            .then(coupons => {

                setCoupons(coupons)
                setLoading(false)

            })
    }
    useEffect(() => {
        setLoading(true)


        fetchCouponData()

    }, [])

    const fetchBrandData = () => {
        fetch("http://localhost:5000/api/brand")

            .then(response => {

                return response.json()

            })

            .then(brands => {

                setBrands(brands)
                setLoading(false)

            })
    }
    useEffect(() => {
        setLoading(true)


        fetchBrandData()

    }, [])

    if (error) {
        return <div></div>
    }

    if (isLoading) return <p>Loading...</p>
    if (!coupons) return <p>No profile data</p>
    if (!product) return <p>No profile data</p>
    if (!brands) return <p>No profile data</p>

    return (
        <div className={`main home-page skeleton-body skel-shop-products ${isLoading ? '' : 'loaded'}`}>
            <div className="container">
                <div className="row " >

                    <div className="col-lg-12 col-12 " style={{ background: " #f5f5f5" }}>
                        <div className="intro-slider-container  ">
                            <OwlCarousel adClass="intro-slider  owl-nav-inside owl-light" options={{ responsive: { 992: { nav: true } } }}>
                                <div className="intro-slide banner-lg  container  ">
                                    <div className="intro ">
                                        <div className="intro-head">
                                            <h1> AFFORDABLE <br /><a>  NEW</a></h1>
                                            
                                        </div>
                                        <div className='content' >
                                            <h3 className='' style={{ fontWeight: '500', fontSize: '15px' }}> Featured Smartphones <br /><span >From</span></h3>
                                            <h4 style={{ fontWeight: '500' ,color:'rgb(51, 62, 72)' }}  > ksh 5000.00 </h4>
                                        </div>
                                        <div className="action">
                                            <a className='btn btn' href="/shop/sidebar/list" style={{ backgroundColor: '#fed700' }}>Start Buying</a>
                                        </div>
                                    </div>
                                    <div style={{ height: '30vh' }}>
                                        <img src="/images/banners/atanatest.png" alt="Los Angeles" className="d-block" />
                                    </div>
                                </div>

                                <div className="intro-slide banner-lg " >

                                    <div className="intro ">
                                        <div className="carousel-title">
                                            <a >Shop For The Latest</a>
                                        </div>
                                        <div className="content" >
                                            <h3 style={{ fontWeight: '500' }} >Electronics Discounted<br />up to <span>30% off</span></h3>
                                        </div>
                                        <div className="action">
                                            <a className='btn btn' href="/shop/sidebar/list" style={{ backgroundColor: '#fed700' }}>Start Buying</a>
                                        </div>
                                    </div>
                                    <div style={{ height: '20vh', width: '100%' }}>
                                        <img src="/images/banners/zoom.png" alt="Los Angeles" className="d-block" />
                                    </div>

                                </div>
                                <div className="intro-slide banner-lg " >

                                    <div className="intro ">
                                        <div className="title-carousel">
                                            <a >Need some new kitchenware</a>
                                        </div>
                                        <div className="content" >
                                            <h3 style={{ fontWeight: '500' }} >No worries<br />Tumekusort  <span>Tena sana</span></h3>
                                        </div>
                                        <div className="action">
                                            <a className='btn btn' href="/shop/sidebar/list" style={{ backgroundColor: '#fed700' }}>Start Buying</a>
                                        </div>
                                    </div>
                                    <div style={{ height: '50vh' }}>
                                    <img src="images/banners/cookware.png" alt="Los Angeles" className="d-block" />
                                    </div>

                                </div>
                                
                            </OwlCarousel>

                            <span className="slider-loader" ></span>
                        </div>
                        {/* <div className="intro-slide ">
                            <div id="demo" class="carousel slide" data-bs-ride="carousel"><span className="slider-loader"></span>

                               
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                                </div>

                                <div class="carousel-inner">
                                    <div className="carousel-item active " >

                                        <div className="carousel-caption ">
                                            <h3>Los Angeles</h3>
                                            <p>We had such a great time in LA!</p>
                                        </div>
                                        <div className="corousel-img">
                                            <img src="/images/banners/atanatest.png" alt="Los Angeles" className="d-block" style={{ height: '40vh' }} />
                                        </div>

                                    </div>
                                    <div className="carousel-item" >

                                        <div className="carousel-caption" >
                                            <h3>Chicago</h3>
                                            <p>Thank you, Chicago!</p>
                                        </div>
                                        <div className="carousel-img">
                                            <img src="images/banners/zoom.png" alt="Los Angeles" className="d-block" style={{ height: '50vh' }} />
                                        </div>
                                    </div>
                                    <div className="carousel-item" >

                                        <div className="carousel-caption">
                                            <h3>New York</h3>
                                            <p>We love the Big Apple!</p>
                                        </div>
                                        <div className="banner-img">
                                            <img src="images/banners/cookware.png" alt="Los Angeles" className="d-block" style={{ height: '40vh' }} />
                                        </div>
                                    </div>
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </button>
                            </div>

                        </div> */}
                    </div>

                    <div className="container banner ">

                        <div className="row">
                            <div className="col-lg-12 col-8" style={{ display: "flex", justifyContent: "space-between" }}>
                                {coupons?.slice(0, 4).map((coupon, i) => (
                                    <div className="media p-5"
                                        style={{ backgroundImage: `url('${coupon.logo}')` }}
                                    >
                                        <div className="intro">
                                            <div className="title">
                                                <h3>New arrivals</h3>
                                            </div>
                                            <div className="content">
                                                <h3>up to </h3>
                                                <h3 className="highlight">&nbsp;{coupon.discountpercentage}% off</h3>
                                            </div>
                                            <div className="action">
                                                <ALink href="/shop/sidebar/list">shop now</ALink>
                                            </div>
                                        </div>
                                    </div>
                                ))};
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center shop mb-5">
                {/* <h2 className="title mt-4 mb-3"> Shop by Brands </h2>

                <OwlCarousel adClass="mb-3 owl-simple" options={brandSlider}>\
                    {brands?.map((brand, index) =>
                        <a href="#" className="brand" onClick={e => { e.preventDefault(); }}>
                            <img src={brand.image} alt="Brand Name" />
                        </a>
                    )};
                </OwlCarousel> */}
            </div>
            <div className="container">
                <div className="row ">
                    <div className="feature col-md-12 ">
                        <div className="col-md-4 " >
                            <div className="container banner-container card p-5" style={{ border: '2px solid yellow'}}>
                                <div className=" banner-lg ">
                                    <div className="card-header" style={{ border: 'none', background: 'white' }}>
                                        <div className="heading " style={{ float: 'inline-start' }}>
                                            <h1 className='p-3'>Special Offer</h1>
                                        </div>
                                        <div className="discount text-center" style={{ float: 'inline-end' }} >
                                            <div className="title " >
                                                <h4 style={{ background: '#fed700', borderRadius: '50px', width: '80px', height: '80px', padding: '10px' }} >
                                                    <span>Save <br /> <strong style={{ fontWeight: 'bolder', fontSize: "23px" }}>25%</strong> </span>

                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" lazy-media text-center card-body mb-5 mt-5" style={{ border: 'none', background: "white" }}>
                                        <figure className="mb-0">
                                            <div className="lazy-overlay"></div>
                                            <LazyLoadImage
                                                alt="banner"
                                                src="https://atana.co.ke/wp-content/uploads/2020/03/product_image_a036c056-2f31-48ba-810e-8acb1cec7d15-300x300.jpg"
                                                threshold={200}
                                                width="10"
                                                height="auto"
                                                effect="blur"
                                            />
                                        </figure>

                                    </div>
                                    <h5 className='text-center p-3' style={{ color: 'blue' }}> matresss and bed 5 by 4 inches</h5>
                                    <div className="card-footer" style={{ border: 'none' }}>
                                        <div className="head mb-5">
                                            <h3>
                                                <span style={{ float: 'inline-start' }}>Already Sold: 999</span>
                                                <span style={{ float: 'inline-end' }}>Available: 5</span>
                                            </h3>
                                        </div>

                                        <div className="progress">
                                            <ProgressBar
                                                completed={80}
                                                className="wrapper"
                                                barContainerClassName="container"
                                                completedClassName="barCompleted"
                                                labelClassName="label"
                                            />
                                        </div>


                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <FeauredCollection product={product} />

                        </div>
                    </div>
                </div>
            </div>




            {/* <div className="container banner-container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 banner-lg">
                        <div className="position-relative lazy-media">
                            <figure className="mb-0">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/home/banner/banner-1.jpg"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>
                        </div>

                        <div className="banner-content">
                            <div className="title">
                                <ALink href="/shop/sidebar/list">save up to 30%</ALink>
                            </div>
                            <div className="content">
                                <ALink href="/shop/sidebar/list">
                                    <h3 className="highlight">Premium Brands</h3>
                                    <h4>for the Toughest Jobs</h4>
                                </ALink>
                            </div>
                            <div className="action">
                                <ALink href="/shop/sidebar/list">discover now</ALink>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 banner-lg">
                        <div className="position-relative lazy-media">
                            <figure className="mb-0">
                                <div className="lazy-overlay"></div>
                                <LazyLoadImage
                                    alt="banner"
                                    src="images/home/banner/banner-2.jpg"
                                    threshold={200}
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>
                        </div>

                        <div className="banner-content">
                            <div className="title">
                                <ALink href="/shop/sidebar/list">best sellers in tools</ALink>
                            </div>
                            <div className="content">
                                <ALink href="/shop/sidebar/list">
                                    <h3>Pro-level tools</h3>
                                    <h4 className="highlight">Save on Bestsellers</h4>
                                </ALink>
                            </div>
                            <div className="action">
                                <ALink href="/shop/sidebar/list">shop now</ALink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container service">
                <div className="row">
                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-rocket"></i>
                            </span>

                            <div className="icon-box-content">
                                <h3 className="icon-box-title">Free Shipping</h3>
                                <p>Orders $50 or more</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-rotate-left"></i>
                            </span>

                            <div className="icon-box-content">
                                <h3 className="icon-box-title">Free Returns</h3>
                                <p>Within 30 days</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-info-circle"></i>
                            </span>

                            <div className="icon-box-content">
                                <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                                <p>When you sign up</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-life-ring"></i>
                            </span>

                            <div className="icon-box-content">
                                <h3 className="icon-box-title">We Support</h3>
                                <p>24/7 amazing services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="  container">
                <img src="https://atana.co.ke/wp-content/uploads/2019/12/Atana-Banner.png" alt="" />
            </div>

            <SpecialCollection product={product} />


            {/* <div className="container bannerad">
                <div className="banner-lg" style={{ backgroundImage: 'url(images/home/bannerad/background.jpg)' }} >
                    <div className="price">
                        <h4 className="highlight">from</h4>
                        <h3>$39</h3><sup className="highlight">,99</sup>
                    </div>
                    <div className="content">
                        <h4>woodworking tools</h4>
                        <h3>from top rated brands</h3>
                        <div className="action">
                            <ALink href="/shop/sidebar/list">discover now</ALink>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="newsletter bg-warning" >
                <div className="news">
                    <div className="subscribe ">
                        <div className="intro ">
                            <h3 className="title">Sign Up to Our Newsletter</h3>
                        </div>
                        <div className="intro  p-2">
                            <h4 className="content">...and receive <strong>updates for our deals and discounts</strong></h4>

                        </div>
                        <div className="subscribe action ">
                            <form action="#">
                                <div className="input-group">
                                    <input type="email" placeholder="Enter your Email Address" aria-label="Email Adress" style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}
                                        required />
                                    <div className="input-group-append">
                                        <button className="btn btn-subscribe bg-dark" type="submit" style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}><span>Sign Up</span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <BlogCollection posts={posts} /> */}

            {/* <NewsletterModal product={product} />/ */}
        </div>
    )
}


export default withApollo({ ssr: typeof window == 'undefined' })(Home);
