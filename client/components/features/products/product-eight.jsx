import React, { useState, useEffect } from 'react';
import ALink from '~/components/features/alink';
import { useRouter } from 'next/router';


function ProductEight ( props ) {
    const { product } = props;
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    // useEffect( () => {
    //     let min = minPrice;
    //     let max = maxPrice;
    //     // product.map( item => {
    //     //     if ( min > item.originalprice ) min = item.originalprice;
    //     //     if ( max < item.price ) max = item.price;
    //     // }, [] );

    //     if ( product.variants.length == 0 ) {
    //         min = product.originalprice
    //             ? product.originalprice
    //             : product.price;
    //         max = product.price;
    //     }

    //     setMinPrice( min );
    //     setMaxPrice( max );
    // }, [] )
    const router = useRouter();

    let path = router.asPath;
    let query = router.query;

    return (
        <div className="product product-sm">
            <figure className="product-media">
                <ALink href={ `/product/sidebar/${product.slug}` }>
                    <img
                        src={ product.image }
                        alt={product.title}
                        className="product-image"
                        style={{height:'100%', width:'100%'}}
                    />
                </ALink>
            </figure>

            <div className="product-body">
                <h5 className="product-title">
                    <ALink href={ `/product/sidebar/${product.slug}` } className={path.indexOf("product/sidebar") > -1 ? 'active' : ''}>{ product.title }</ALink>
                </h5>
                {
                    !product.stock || product.stock == 0 ?
                        <div className="product-price">
                            <span className="out-price">kshs: { product.price.toFixed( 2 ) }</span>
                        </div>
                        :
                        product.price == product.originalprice ?
                            <div className="product-price">kshs: { product.price.toFixed( 2 ) }</div>
                            :
                            product.length == 0 ?
                                <div className="product-price">
                                    <span className="new-price">kshs: { product.price.toFixed( 2 ) }</span>
                                    <span className="old-price">kshs: { product.originalprice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">kshs: { product.originalprice.toFixed( 2 ) }&ndash;${ product.price.toFixed( 2 ) }</div>
                }
            </div>
        </div>
    )
}
export default React.memo( ProductEight );
