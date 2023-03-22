import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

import { isInWishlist, isInCompare } from '~/utils';

function ProductEleven ( props ) {
    const router = useRouter();
    const { product, wishlist, index } = props;
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
        // {product?.map( item => {
        //     if ( min > item.price ) min = item.price;
        //     if ( max < item.price ) max = item.originalprice;
        // }, [] )};

        if ( product.length == 0 ) {
            min = product.price
                ? product.price
                : product.originalprice;
            max = product.originalprice;
        }

        setMinPrice( min );
        setMaxPrice( max );
    }, [] )

    function onCartClick ( e ) {
        e.preventDefault();
        props.addToCart( product );
    }

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, product ) ) {
            props.addToWishlist( product );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function onCompareClick ( e ) {
        e.preventDefault();
        if ( !isInCompare( props.comparelist, product ) ) {
            props.addToCompare( product );
        }
    }

    function onQuickView ( e ) {
        e.preventDefault();
        props.showQuickView( product.slug );
    }

    return (
        <div className="product product-7 text-center w-100">
            <figure className="product-media">
                {
                    product.status ?
                        <span className="product-label label-new">New</span>
                        : ""
                }

                {
                    product.price ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                }

                {
                    product.top ?
                        <span className="product-label label-top">Top</span>
                        : ""
                }

                {
                    !product.quantity || product.quantity == 0 ?
                        <span className="product-label label-out">Out of Stock</span>
                        : ""
                }

                <ALink href={ `/product/default/${product.slug}` }>
                    <LazyLoadImage
                        alt="product"
                        src={ product.image }
                        threshold={ 500 }
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product.image.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ product.image}
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>

                {
                    product.quantity > 0 ?
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                            }
                            <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a>
                            <a href="#" className="btn-product-icon btn-compare" onClick={ onCompareClick }><span>compare</span></a>
                        </div>
                        :
                        <div className="product-action-vertical">
                            {
                                isInWishlist( wishlist, product ) ?
                                    <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                    :
                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={ onWishlistClick }><span>add to wishlist</span></a>

                            }
                            <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={ onQuickView }><span>quick view</span></a>
                        </div>
                }

                {
                    product.quantity && product.quantity !== 0 ?
                        <div className="product-action">
                            {
                                product.length > 0 ?
                                    <ALink href={ `/product/default/${product.slug}` } className="btn-product btn-cart btn-select">
                                        <span>select options</span>
                                    </ALink>
                                    :
                                    <button className="btn-product btn-cart" onClick={ onCartClick }>
                                        <span>add to cart</span>
                                    </button>
                            }
                        </div>
                        : ""
                }

            </figure>

            <div className="product-body">
                <div className="product-cat">
                    {
                       <React.Fragment key={ product.slug + '-' + index }>
                       <ALink href={ { pathname: '/shop/sidebar/list', query: { category: product.slug } } }>
                           { product.parent }
                       </ALink>
                       { index < product.parent.length - 1 ? ', ' : "" }
                   </React.Fragment>
                    }
                </div>

                <h3 className="product-title">
                    <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                </h3>

                {
                    !product.quantity || product.quantity == 0 ?
                        <div className="product-price">
                            <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                        </div>
                        :
                        product.price == product.originalprice ?
                            <div className="product-price">kshs. { product.price.toFixed( 2 ) }</div>
                            :
                            product.length == 0 ?
                                <div className="product-price">
                                    <span className="new-price">kshs. { product.price.toFixed( 2 ) }</span>
                                    <span className="old-price">kshs. { product.originalprice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">kshs. { product.originalprice.toFixed( 2 ) }&ndash;kshs. { product.price.toFixed( 2 ) }</div>
                }

                <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                        <span className="tooltip-text">Ratings</span>
                    </div>
                    <span className="ratings-text">Reviews</span>
                </div>

                
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction } )( ProductEleven );