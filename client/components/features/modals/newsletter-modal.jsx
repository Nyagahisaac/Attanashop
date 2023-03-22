import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'react-modal';
import Cookie from 'js-cookie';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(51,51,51,0.6)',
        zIndex: '10001'
    }
};

Modal.setAppElement( 'body' );

function NewsletterModal () {

    const [ open, setOpen ] = useState( false );
    const [ doNotShow, setDoNotShow ] = useState( false );
    const [coupons, setCoupons] = useState([]);
    const [products, setProducts] = useState();

    const [isLoading, setLoading] = useState(false)

    const fetchData = () => {
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


        fetchData()

    }, [])

    useEffect( () => {
        let timer;
        Cookie.get( `hideNewsletter-${coupons.image}` ) || ( timer = setTimeout( () => {
            setOpen( true );
        }, 5000 ) );

        return () => {
            timer && clearTimeout( timer );
        };
    }, [] )

    function closeModal ( e ) {
        document.getElementById( "newsletter-popup-form" ).classList.remove( "ReactModal__Content--after-open" );

        if ( document.querySelector( ".ReactModal__Overlay" ) ) {
            document.querySelector( ".ReactModal__Overlay" ).style.opacity = '0';
        }

        setTimeout( () => {
            setOpen( false );
            doNotShow && Cookie.set( `hideNewsletter-${coupons.image}`, "true", { expires: 7 } );
        }, 350 );
    }

    function handleChange ( e ) {
        setDoNotShow( e.target.checked );
    }

    return (
        <Modal
            isOpen={ open }
            onRequestClose={ closeModal }
            style={ customStyles }
            shouldReturnFocusAfterClose={ false }
            contentLabel="Newsletter Modal"
            className="container newsletter-popup-container h-auto"
            overlayClassName="d-flex align-items-center justify-content-center"
            id="newsletter-popup-form"
        >
            <div className="modal-content overflow-hidden">
                <div className="row justify-content-center position-relative">
                    <div className="col-12">
                    {coupons?.slice(0,1).map((coupon, i) => (

                        <div key={i + 1} className="row no-gutters bg-white newsletter-popup-content">
                            <div className="col-xl-3-5col col-lg-7 banner-content-wrap">

                                <div className="banner-content text-center">

                                    <img src={coupon.logo} alt="logo" className="logo" width="60" height="15" />
                                    <h2 className="banner-title">get <span>{coupon.discountpercentage}<span style={ { fontWeight: '400' } }>%</span></span> off</h2>
                                    <p>Subscribe to the TOOLIT eCommerce newsletter to receive timely updates from your favorite products.</p>

                                    <form action="#">
                                        <div className="input-group input-group-round">
                                            <input type="email" className="form-control form-control-white" placeholder="Your Email Address" aria-label="Email Adress" required />
                                            <div className="input-group-append">
                                                <button className="btn" type="submit"><span>go</span></button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="custom-control custom-checkbox pl-4 ml-3">
                                        <input type="checkbox" className="custom-control-input" id="register-policy" onChange={ handleChange } />
                                        <label className="custom-control-label" htmlFor="register-policy">Do not show this popup again</label>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-2-5col col-lg-5 d-none d-lg-block">
                                <div className="lazy-overlay"></div>
                                
                                <LazyLoadImage
                                    alt={coupon.campaignname}
                                    src={coupon.logo}
                                    threshold={ 0 }
                                    width="100%" 
                                    height="100%"
                                   
                                    effect="blur"
                                    // style={{objectFit: 'cover', height:'50vh'}}
                                    className="newsletter-img"
                                />
                            </div>
                        </div>
                    ))};
                    </div>
                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeModal }><span>×</span></button>
                </div>
            </div>
        </Modal>
    );
}

export default NewsletterModal;