import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';

import { canAddToCart, isInWishlist } from '~/utils';

function DetailOne ( props ) {
    const router = useRouter();
    const ref = useRef( null );
    const { product , index } = props;
    const [ qty, setQty ] = useState( 1 );
    const [ qty2, setQty2 ] = useState( 1 );
    const [ colorArray, setColorArray ] = useState( [] );
    const [ sizeArray, setSizeArray ] = useState( [] );
    const [ variationGroup, setVariationGroup ] = useState( [] );
    const [ selected, setSelected ] = useState( { color: null, colorName: null, price: null, size: "" } );
    const [ showClear, setShowClear ] = useState( false );
    const [ showVariationPrice, setShowVariationPrice ] = useState( false );
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    useEffect( () => {
        window.addEventListener( 'scroll', scrollHandler, {
            passive: true
        } );

        return () => {
            window.removeEventListener( 'scroll', scrollHandler );
        }
    }, [] )

    

    useEffect( () => {
        setSelected( { color: null, colorName: null, price: null, size: "" } );
        setQty( 1 );
        setQty2( 1 );
    }, [ router.query.slug ] )

    useEffect( () => {
        refreshSelectableGroup();
    }, [ variationGroup, selected ] )

    useEffect( () => {
        scrollHandler();
    }, [ router.pathname ] )

    useEffect( () => {
        setShowClear( ( selected.color || selected.size != "" ) ? true : false );
        setShowVariationPrice( ( selected.color && selected.size != "" ) ? true : false );
        let toggle = ref.current.querySelector( '.variation-toggle' );

        if ( toggle ) {
            if ( ( selected.color && selected.size != "" ) && toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }

            if ( ( !( selected.color && selected.size != "" ) ) && !toggle.classList.contains( 'collapsed' ) ) {
                toggle.click();
            }
        }
    }, [ selected ] )

    function scrollHandler () {
        if ( router.pathname.includes( '/product/default' ) ) {
            let stickyBar = ref.current.querySelector( '.sticky-bar' );
            if ( stickyBar.classList.contains( 'd-none' ) && ref.current.getBoundingClientRect().bottom < 0 ) {
                stickyBar.classList.remove( 'd-none' );
                return;
            }
            if ( !stickyBar.classList.contains( 'd-none' ) && ref.current.getBoundingClientRect().bottom > 0 ) {
                stickyBar.classList.add( 'd-none' );
            }
        }
    }

    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist( props.wishlist, product ) ) {
            props.addToWishlist( product );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    function refreshSelectableGroup () {
        let tempArray = [ ...variationGroup ];
        if ( selected.color ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selected.color !== cur.color ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        setSizeArray( tempArray.reduce( ( acc, cur ) => {
            if ( acc.findIndex( item => item.size == cur.size ) !== -1 )
                return acc;
            return [ ...acc, cur ];
        }, [] ) );

        tempArray = [ ...variationGroup ];
        if ( selected.size ) {
            tempArray = variationGroup.reduce( ( acc, cur ) => {
                if ( selected.size !== cur.size ) {
                    return acc;
                }
                return [ ...acc, cur ];
            }, [] );
        }

        // setColorArray( product.reduce( ( acc, cur ) => {
        //     if (
        //         tempArray.findIndex( item => item.color == cur.color ) == -1
        //     ) {
        //         return [
        //             ...acc,
        //             {
        //                 color: cur.color,
        //                 colorName: cur.color_name,
        //                 price: cur.price,
        //                 disabled: true
        //             }
        //         ];
        //     }
        //     return [
        //         ...acc,
        //         {
        //             color: cur.color,
        //             colorName: cur.color_name,
        //             price: cur.price,
        //             disabled: false
        //         }
        //     ];
        // }, [] ) );
    }

    function selectColor ( e, item ) {
        e.preventDefault()
        if ( item.color == selected.color ) {
            setSelected( {
                ...selected,
                color: null,
                colorName: null,
                price: item.price
            } );
        } else {
            setSelected( {
                ...selected,
                color: item.color,
                colorName: item.colorName,
                price: item.price
            } );
        }
    }

    function selectSize ( e ) {
        if ( e.target.value == "" ) {
            setSelected( { ...selected, size: "" } );
        } else {
            setSelected( { ...selected, size: e.target.value } );
        }
    }

    function onChangeQty ( current ) {
        setQty( current );
    }

    function onChangeQty2 ( current ) {
        setQty2( current );
    }

    function clearSelection ( e ) {
        e.preventDefault();
        setSelected( ( {
            ...selected,
            color: null,
            colorName: null,
            size: ""
        } ) );
        refreshSelectableGroup();
    }

    function onCartClick ( e, index = 0 ) {
        e.preventDefault();
        if ( e.currentTarget.classList.contains( 'btn-disabled' ) ) return;

        let newProduct = { ...product };
        if ( product.length > 0 ) {
            newProduct = {
                ...product,
                name:
                    product.title +
                    ' - ' +
                    selected.colorName +
                    ', ' +
                    selected.size,
                price: selected.price
            };
        }
        props.addToCart(
            newProduct,
            index == 0 ? qty : qty2
        );
    }

    if ( !product ) {
        return <div></div>;
    }

    return (
        <div className="product-details" ref={ ref }>
            <h1 className="product-title">{ product.title }</h1>

            <div className="ratings-container">
                <div className="ratings">
                    <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                    <span className="tooltip-text">Ratings</span>
                </div>
                <span className="ratings-text">Reviews</span>
            </div>

            {
                product.length > 0 ?
                    <div className="product-price">
                        <span className="out-price">
                            {
                               product.price == product.originalprice ?
                                    <span>kshs. { product.price.toFixed( 2 ) }</span>
                                    :
                                    <span>kshs. { product.price.toFixed( 2 ) }&ndash; kshs. { product.originalprice.toFixed( 2 ) }</span>
                            }
                        </span>
                    </div>
                    :
                    product.price == product.originalprice ?
                        <div className="product-price"> kshs. {product.price.toFixed( 2 ) }</div>
                        :
                        product.price == 0 ?
                            <div className="product-price">
                                <span className="new-price">ksh. { product.price.toFixed( 2 ) }</span>
                                <span className="old-price">kshs. { product.originalprice.toFixed( 2 ) }</span>
                            </div>
                            : 
                            <div className="product-price"> kshs. { product.price.toFixed( 2 ) }</div>
            }

            <div className="product-content">
                <p>{ product.description }</p>
            </div>

            {
                product.length > 0 ?
                    <>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>

                            <div className="product-nav product-nav-dots">
                                {
                                    colorArray.map( ( item, index ) => (
                                        <a
                                            href="#"
                                            className={ `${( item.color == selected.color ? 'active ' : '' ) + ( item.disabled ? 'disabled' : '' )}` }
                                            style={ { backgroundColor: item.color } }
                                            key={ index }
                                            onClick={ e => selectColor( e, item ) }
                                        ></a>
                                    ) )
                                }
                            </div>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                                <select
                                    name="size"
                                    className="form-control"
                                    value={ selected.size }
                                    onChange={ selectSize }
                                >
                                    <option value="">Select a size</option>
                                    {
                                        sizeArray.map( ( item, index ) => (
                                            <option
                                                value={ item.size }
                                                key={ index }
                                            >{ item.size }</option>
                                        ) )
                                    }
                                </select>
                            </div>

                            <ALink href="#" className="size-guide mr-4">
                                <i className="icon-th-list"></i>size guide
                            </ALink>
                            {
                                showClear ?
                                    <a href="#" onClick={ clearSelection }>clear</a>
                                    : ""
                            }
                        </div >
                        <SlideToggle collapsed={ true }>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div>
                                    <button className={ `d-none variation-toggle ${toggleState.toLowerCase()}` } onClick={ onToggle }></button>
                                    <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                        <div className="product-price">
                                            ksh: { selected.price ? selected.price.toFixed( 2 ) : 0 }
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </SlideToggle>
                    </>
                    : ""
            }

            <div className="details-filter-row details-row-size">
                <label htmlFor="qty">Qty:</label>
                <Qty changeQty={ onChangeQty } max={ product.quantity } value={ qty }></Qty>
            </div >

            <div className="product-details-action">
                <a
                    href="#"
                    className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( product.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                    onClick={ e => onCartClick( e, 0 ) }
                >
                    <span>add to cart</span>
                </a>
                <div className="details-action-wrapper">
                    {
                        isInWishlist( props.wishlist, product ) ?
                            <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                            :
                            <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>

                    }
                </div>
            </div >

            <div className="product-details-footer">
                <div className="product-cat w-100 text-truncate">
                    <span>Category:</span>
                    {
                            <span key={ index }>
                                {/* <ALink
                                    href={ { pathname: '/shop/sidebar/list', query: { category: product.slug } } }
                                >{ product.name }</ALink> */}
                                { index < product.length - 1 ? ',' : '' }
                            </span>
                    }
                </div >

                <div className="social-icons social-icons-sm">
                    <span className="social-label">Share:</span>
                    <ALink href="#" className="social-icon" title="Facebook">
                        <i className="icon-facebook-f"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Twitter">
                        <i className="icon-twitter"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Instagram">
                        <i className="icon-instagram"></i>
                    </ALink>
                    <ALink href="#" className="social-icon" title="Pinterest">
                        <i className="icon-pinterest"></i>
                    </ALink>
                </div>
            </div >
            <div className="sticky-bar d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <figure className="product-media">
                                <ALink href={ `/product/default/${product.slug}` }>
                                    <img src={ product.image} alt={product.title} />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={ `/product/default/${product.slug}` }>{ product.title }</ALink>
                            </h3>
                        </div>
                        <div className="col-6 justify-content-end">
                            {
                                ( selected.color && selected.size != "" ) ?
                                    <div className="product-price">
                                        ${ selected.price ? selected.price.toFixed( 2 ) : 0 }
                                    </div>
                                    :
                                    product.status == 0 ?
                                        <div className="product-price">
                                            <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                                        </div>
                                        :
                                        product.price == product.originalprice ?
                                            <div className="product-price">${ product.price.toFixed( 2 ) }</div>
                                            :
                                            index == 0 ?
                                                <div className="product-price">
                                                    <span className="new-price">${ product.price.toFixed( 2 ) }</span>
                                                    <span className="old-price">${ product.originalprice.toFixed( 2 ) }</span>
                                                </div>
                                                :
                                                <div className="product-price">${ product.price.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                            }
                            <Qty changeQty={ onChangeQty2 } max={ product.quantity } value={ qty2 }></Qty>
                            <div className="product-details-action">
                                <a
                                    href="#"
                                    className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( product.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                                    onClick={ e => onCartClick( e, 1 ) }
                                >
                                    <span>add to cart</span>
                                </a>
                                {
                                    isInWishlist( props.wishlist, product ) ?
                                        <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>

                                }
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

const mapStateToProps = ( state ) => {
    return {
        cartlist: state.cartlist.data,
        wishlist: state.wishlist.data,
    }
}

export default connect( mapStateToProps, { ...wishlistAction, ...cartAction } )( DetailOne );
