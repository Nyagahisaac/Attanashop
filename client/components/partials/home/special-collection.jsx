// Import Custom Component
import ALink from '~/components/features/alink';
import ProductTwelve from '~/components/features/products/product-twelve';
import { useEffect, useState } from "react";


function SpecialCollection (  ) {
  
    const [isLoading, setLoading] = useState(false)
    const [products, setProducts] = useState();

    const fetchProductsData = () => {
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


        fetchProductsData()

    }, [])



    if (isLoading) return <p>Loading...</p>
    if (!products) return <p>No profile data</p>

    return (
        <div className="container popular">
            <hr className="mb-5" />

            <div className="section-title">
                <div>
                    <p className="title"><span>Recently Added</span></p>
                </div>

                <ALink className="link text-center text-sm-right" href="/shop/sidebar/list">See All Products</ALink>
            </div>
        
            <div className="row products ">
                {
                    products ?
                        products.slice( 0, 5 ).map( ( product, index ) =>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-5col  " key={ product + index } >
                                <ProductTwelve product={ product } />
                            </div>
                        )
                        :
                        new Array( 5 ).fill( 1 ).map( ( product, index ) => (
                            <div className="col-6 col-md-4 col-lg-3 col-xl-5col p-2" key={ "Skeleton" + index } >
                                <div className="skel-pro"></div>
                            </div>
                        ) )
                }
            </div>
        
        </div>
    )
}

export default SpecialCollection;
