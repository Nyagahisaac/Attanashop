import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

function Wishlist(props) {
    const [wishItems, setWishItems] = useState([]);

    useEffect(() => {
        setWishItems(props.wishlist.reduce((acc, product) => {
            let max = 0;
            let min = 999999;
            // product.map( item => {
            //     if ( min > item.price ) min = item.price;
            //     if ( max < item.originalprice ) max = item.originalprice;
            // }, [] );

            if (product.length == 0) {
                min = product.price
                    ? product.price
                    : product.originalprice;
                max = product.originalprice;
            }

            return [
                ...acc,
                {
                    ...product,
                    minPrice: min,
                    maxPrice: max
                }
            ];
        }, []));
    }, [props.wishlist])

    function moveToCart(product) {
        props.removeFromWishlist(product);
        props.addToCart(product);
    }

    return (
        <main className="main">
            <PageHeader
                title="Wishlist"
                subTitle="Shop"
            />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Wishlist</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5">
                {
                    wishItems.length > 0 ?
                        <div
                            className="container"
                        >
                            <table className="table table-wishlist table-mobile">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Stock Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        wishItems.map((product, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td className="product-col">
                                                    <div className="product">
                                                        <figure className="product-media">
                                                            <ALink href={`/product/sidebar/${product.slug}`} className="product-image">
                                                                <img src={product.image} alt="product" />
                                                            </ALink>
                                                        </figure>

                                                        <h4 className="product-title">
                                                            <ALink href={`/product/sidebar/${product.slug}`}>{product.name}</ALink>
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td className="price-col">
                                                    {
                                                        product.stock == 0 ?
                                                            <div className="product-price d-inline-block mb-0">
                                                                <span className="out-price">kshs. {product.price.toFixed(2)}</span>
                                                            </div>
                                                            :
                                                            product.price == product.originalprice ?
                                                                <div className="product-price d-inline-block mb-0">kshs. {product.price.toFixed(2)}</div>
                                                                :
                                                                product.length == 0 ?
                                                                    <div className="product-price d-inline-block mb-0">
                                                                        <span className="new-price">kshs. {product.price.toFixed(2)}</span>
                                                                        <span className="old-price">kshs. {product.originalprice.toFixed(2)}</span>
                                                                    </div>
                                                                    :
                                                                    <div className="product-price d-inline-block mb-0">kshs. {product.price.toFixed(2)}&ndash;kshs. {product.originalprice.toFixed(2)}</div>
                                                    }
                                                </td>
                                                <td className="stock-col">
                                                    <span className={`${product.quantity == 0 ? 'out-of-stock' : 'in-stock'}`} >{product.status == 0 ? 'Out of stock' : 'In stock'}</span>
                                                </td>
                                                <td className="action-col">
                                                    <div className="dropdown">
                                                        {

                                                            product.quantity && product.quantity !== 0 ?
                                                                index == 0  ?
                                                        <ALink href="/product/sidebar/beige-v-neck-button-cardigan" className="btn btn-block btn-outline-primary-2 btn-select">
                                                            <i className="icon-list-alt"></i>
                                                            {product.quantity == '0' ? 'read more' : 'select'}
                                                        </ALink>
                                                        :
                                                        <button className="btn btn-block btn-outline-primary-2" onClick={e => moveToCart(product)}>
                                                            <i className="icon-cart-plus"></i>
                                                            add to cart
                                                        </button>: ''
                                                        }
                                                    </div>
                                                </td>
                                                <td className="remove-col">
                                                    <button
                                                        className="btn-remove"
                                                        onClick={e => props.removeFromWishlist(product)}
                                                    >
                                                        <i className="icon-close"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className="wishlist-share">
                                <div className="social-icons social-icons-sm mb-2">
                                    <label className="social-label">Share on:</label>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Facebook"
                                    >
                                        <i className="icon-facebook-f"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Twitter"
                                    >
                                        <i className="icon-twitter"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Instagram"
                                    >
                                        <i className="icon-instagram"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Youtube"
                                    >
                                        <i className="icon-youtube"></i>
                                    </ALink>
                                    <ALink
                                        href="#"
                                        className="social-icon"
                                        title="Pinterest"
                                    >
                                        <i className="icon-pinterest"></i>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="container"
                        >
                            <div className="text-center">
                                <i className="icon-heart-o wishlist-empty d-block" style={{ fontSize: '15rem', lineHeight: '1' }}></i>
                                <span className="d-block mt-2">No products added to wishlist</span>
                                <ALink
                                    href="/shop/sidebar/list"
                                    className="btn btn-primary mt-2"
                                >Go Shop</ALink>
                            </div>
                        </div>
                }

            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist.data
})

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(Wishlist);