import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    TableCell,
    TableBody,
    TableRow,
    Badge,
    Avatar,
} from '@windmill/react-ui';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

import { isInWishlist, isInCompare } from '~/utils';

function ProductSix(props) {
    const router = useRouter();
    const { product, wishlist, index } = props;
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(99999);

    const [isLoading, setLoading] = useState(false)

   

   

    function onCartClick(e) {
        e.preventDefault();
        props.addToCart(product);
    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            props.addToWishlist(product);
        } else {
            router.push('/pages/wishlist');
        }
    }

    function onCompareClick(e) {
        e.preventDefault();
        if (!isInCompare(props.comparelist, product)) {
            props.addToCompare(product);
        }
    }

    function onQuickView(e) {
        e.preventDefault();
        props.showQuickView(product.slug);
    }

    return (
        <div className="product product-5 text-center">
         

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



                    <ALink href={`/product/default/${product.id}`}  >


                        <LazyLoadImage
                            alt={product.title}
                            src={product.image}
                            threshold={200}
                            width="100%"
                            height="auto"
                            effect="blur"
                            wrapperClassName="product-image"
                            style={{ objectFit: 'cover', height: '100%', width: '100%', backgroundSize: 'cover' }}

                        />
                    </ALink>




                    {
                        product.quantity > 0 ?
                            <div className="product-action-vertical">
                                {
                                    isInWishlist(wishlist, product) ?
                                        <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={onWishlistClick}><span>add to wishlist</span></a>
                                }
                                <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={onQuickView}><span>quick view</span></a>
                                <a href="#" className="btn-product-icon btn-compare" onClick={onCompareClick}><span>compare</span></a>
                            </div>
                            :
                            <div className="product-action-vertical">
                                {
                                    isInWishlist(wishlist, product) ?
                                        <ALink href="/shop/wishlist" className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"><span>go to wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable" onClick={onWishlistClick}><span>add to wishlist</span></a>
                                }
                                <a href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={onQuickView}><span>quick view</span></a>
                                <a href="#" className="btn-product-icon btn-compare" onClick={onCompareClick}><span>compare</span></a>
                            </div>
                    }

                    {
                        product.quantity && product.quantity !== 0 ?
                            <div className="product-action" >
                                {
                                    index == 0 ?
                                        <ALink href={`/product/default/${product.slug}`} className="btn-product btn-cart btn-select">
                                            <span>select options</span>
                                        </ALink>
                                        :
                                        <button className="btn-product btn-cart" onClick={onCartClick}>
                                            <span>add to cart</span>
                                        </button>
                                }
                            </div>
                            : ""
                    }

                </figure>
          
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction, ...compareAction, ...demoAction })(ProductSix);
