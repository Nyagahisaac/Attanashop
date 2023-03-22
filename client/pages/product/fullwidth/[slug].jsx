import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import StickyBox from 'react-sticky-box';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoThree from '~/components/partials/product/info-tabs/info-three';
import Sidebar from '~/components/partials/product/sidebar/product-sidebar';
import { useEffect, useState } from "react";


function ProductFullwidth() {
    const slug = useRouter().query.slug;
    if (!slug) return <div></div>;


    const [products, setProducts] = useState();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((products) => {
                setProducts(products)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!products) return <p>No profile data</p>
    //    console.log(`Products---------------------${products}`)
    const prev = 0// products.prev;
    const next = 0//products.next;




    return (
        <div className="main">
            <Breadcrumb prev={prev} next={next} current="Sidebar" fullWidth={true} />

            <div className="page-content pb-3">
                {products.length > 0 ? (
                    <div className={`container-fluid skeleton-body horizontal`} >
                        {products?.map((product, index) =>
                            <div className="row">
                                <div className="col-xxl-10 col-lg-9">
                                    <div className="product-details-top mb-0">
                                        <div className={`row skel-pro-single fullwidth ${isLoading ? '' : 'loaded'}`}>
                                            <div className="col-md-6 col-lg-7"  >
                                        <div className="skel-product-gallery"></div> 
                                            {
                                                !isLoading ?
                                                    <GalleryDefault product={product} index={index} />
                                                    : ""
                                            }
                                            </div>

                                            <div className="col-md-6 col-lg-5">
                                                <div className="entry-summary row">
                                                    <div className="col-md-12">
                                                        <div className="entry-summary1 mt-2 mt-md-0"></div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="entry-summary2"></div>
                                                    </div>
                                                </div>
                                                {
                                                    !isLoading ?
                                                        <DetailOne product={product} index={1} />
                                                        : ""
                                                }
                                                <InfoThree product={product} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 skeleton-body">
                                    <StickyBox className={`sticky-content skel-pro-single ${isLoading ? '' : 'loaded'}`} offsetTop={70}>
                                        <div className="skel-widget"></div>
                                        <div className="skel-widget"></div>
                                        <Sidebar product={product} loading={isLoading} />
                                    </StickyBox>
                                </div>
                            </div>
                        )}
                    </div>
    
                  ) : null}
            </div >


        </div >

    )
}

export default withApollo({ ssr: typeof window == 'undefined' })(ProductFullwidth);