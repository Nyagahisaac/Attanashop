import React, { useState, useEffect } from 'react';
import ProductSix from '~/components/features/products/product-six';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider8 } from '~/utils/data';

function RelatedProductsOne() {
    // const { product, index } = props;
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false)



    const fetchData = () => {
        fetch("http://localhost:5000/api/products")

            .then(response => {

                return response.json()

            })

            .then(products => {

                setProducts(products)
                setLoading(false)

            })
    }
    useEffect(() => {
        setLoading(true)


        fetchData()

    }, [])


    return (
        <>
            <h2 className="title text-center mb-4">You May Also Like</h2>


            {
                isLoading ?
                    <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-xl-5 cols-lg-4 cols-md-3 cols-2" isTheme={false} options={mainSlider8}>
                        {
                            [1, 2, 3, 4].map((product, index) =>
                                <div className="skel-pro" key={index}></div>
                            )
                        }
                    </OwlCarousel>
                    :
                    <OwlCarousel  adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1" isTheme={false} options={mainSlider8}>
                        {products?.map((product, index) => (

                            <ProductSix product={product} index={index} />

                        ))}

                    </OwlCarousel>
            }



        </>
    );
}

export default React.memo(RelatedProductsOne);