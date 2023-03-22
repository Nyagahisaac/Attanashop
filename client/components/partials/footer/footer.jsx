import { useRouter } from 'next/router';
import ALink from '~/components/features/alink';
import React, { useState, useEffect } from 'react';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';

function Footer() {
    const router = useRouter("");
    const [isBottomSticky, setIsBottomSticky] = useState(false);
    const [containerClass, setContainerClass] = useState('container');

    useEffect(() => {
        handleBottomSticky();
        setContainerClass(router.asPath.includes('fullwidth') ? 'container-fluid' : 'container');
    }, [router.asPath]);

    useEffect(() => {
        window.addEventListener('resize', handleBottomSticky, { passive: true });
        return () => {
            window.removeEventListener('resize', handleBottomSticky);
        }
    }, [])

    function handleBottomSticky() {
        setIsBottomSticky(router.pathname.includes('product/default') && (window.innerWidth > 991));
    }

    return (
        <footer className="footer footer-light">
            <div className="footer-middle">
                <div className={containerClass}>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="widget widget-about">
                                <ALink href="/" style={{ height: '100px', width: '100px' }}>
                                    <img src="https://atana.co.ke/wp-content/uploads/2019/11/atana.png" className="footer-logo" alt="Footer Logo" />

                                </ALink>

                                <div className="social-icons">
                                    <div style={{ display: 'flex' }} >
                                        < HeadsetMicOutlinedIcon style={{ color: "rgb(255, 210, 48)", height: '50px', width: '100px',fontWeight:'100' }} />
                                        <div className="dis" style={{ display: 'inline-block' }}>
                                            <h3 style={{ fontSize: '15px', color: '#464242', fontWeight: '100'}}>

                                                Got Questions ? Call us 24/7! <br />


                                            </h3>
                                            <span>
                                                <strong style={{ fontSize: '23px', color: '#464242', fontWeight: '300' }}> (+254) 793 290 986 </strong>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">About ATTANA</h4>

                                <ul className="widget-list">
                                    <li><ALink href="/pages/about">About us</ALink></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#" onClick={e => { e.preventDefault(); }}>Terms and Condition</a></li>
                                    <li><a href="#" onClick={e => { e.preventDefault(); }}>Privacy Policy</a></li>

                                    <li><ALink href="/pages/contact">Contact us</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">My Atana  Shopping</h4>

                                <ul className="widget-list">
                                    <li><a href="#" onClick={e => { e.preventDefault(); }}>My Account</a></li>
                                    <li><ALink href="/shop/cart">View Cart</ALink></li>
                                    <li><ALink href="/shop/wishlist">My Wishlist</ALink></li>
                                    <li><a href="#" onClick={e => { e.preventDefault(); }}>Track My Order</a></li>


                                    <li><a href="#" onClick={e => { e.preventDefault(); }}>Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">Download our App</h4>

                                <ul className="widget-list">
                                    <li><a href="https://play.google.com/store/apps/details?id=co.ke.atana.android" onClick={e => { e.preventDefault(); }}><img src='https://atana.co.ke/wp-content/uploads/2019/11/Google-App.png' alt="test" /> </a></li>

                                    <li><a href="https://apps.apple.com/app/id1507370058" onClick={e => { e.preventDefault(); }}><img src="https://atana.co.ke/wp-content/uploads/2019/11/Apple-Store.png" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className={containerClass}>
                    <p className="footer-copyright">Copyright © {(new Date()).getFullYear()} Atana Mall. Brand Development by Ilani Concepts All Rights Reserved.</p>
                    <figure className="footer-payments">
                        <img src="images/payments.png" alt="Payment methods" width="272" height="20" />
                    </figure>
                </div>
            </div>
            {
                isBottomSticky ?
                    <div className="mb-10"></div>
                    : ""
            }
        </footer>
    );
}

export default React.memo(Footer);