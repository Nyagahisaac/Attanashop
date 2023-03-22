import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';

import { useEffect, useState } from "react";

import ALink from '~/components/features/alink';
import ProductTwelve from '~/components/features/products/product-twelve';

import { attrFilter } from '~/utils';

function FeaturedCollection() {
    // const { products } = props;
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
        <Tabs defaultIndex={0} selectedTabClassName="active" >

            <div className="" style={{color:"black", backgroundColor: "white"}} >
                <div className="container">
                    <div className="section-title">
                        <TabList className="nav nav-pills nav-border-anim" style={{ background: "none" }}>
                            <Tab className="nav-item">
                                <span className="nav-link"><span>Featured</span></span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link"><span>On Sale</span></span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link"><span>Top Rated</span></span>
                            </Tab>
                        </TabList>

                        {/* <ALink className="link" href="/shop/sidebar/list">All Featured Products</ALink> */}
                    </div>

                    <div className="row mt-3">
                        {products?.slice(0, 1).map((product) =>
                            <div className="col-lg-4 col-md-4"  >
                                <div className="product-lg">
                                    {
                                        
                                            <figure className="product-media p-5">
                                                <span className="product-label label-limited">limited time sale</span>
                                                <ALink href="/product/default/dewalt-dwe575sb"  >

                                                    <LazyLoadImage
                                                        alt={product.title}
                                                        src={product.image}
                                                        threshold={200}
                                                        width="100%"
                                                        height="auto"
                                                        effect="blur"
                                                        wrapperClassName="product-image"
                                                        style={{ objectFit: 'cover', height:'100%', width:'100%',backgroundSize:'cover'}}

                                                    />


                                                </ALink>

                                            </figure>
                                           
                                    }


                                    <>
                                        <div className="product-body">
                                            <h3 className="save-price"><span>Save kshs. {product.discount}%</span></h3>
                                            <h3 className="product-title">
                                                <ALink href="/product/default/dewalt-dwe575sb">{product.title}</ALink>
                                            </h3>

                                            <div className="product-price">
                                                <span className="new-price">kshs. {product.price}</span>
                                                <span className="old-price">Was kshs. {product.originalprice}</span>
                                            </div>

                                            <div className="action">
                                                <ALink href="/product/default/dewalt-dwe575sb">shop now</ALink>
                                            </div>
                                        </div>
                                    </>
                                </div>

                            </div>
                        )}

                        <div className="col-lg-8 col-md-8">

                            <div className="tab-content">
                                <TabPanel>
                                    <div className="row products all p-0">
                                        {
                                            products ?

                                                products.slice(0, 6).map((product) =>
                                                    <div className="col-lg-4 col-6"   >
                                                        <ProductTwelve product={product}  />
                                                    </div>
                                                ) 
                                                    :
                                                new Array(6).fill(1).map((product) => (
                                                    <div className="col-lg-4 col-6" >
                                                        <div className="skel-pro"></div>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                    
                                </TabPanel>

                            </div>
                           < div className="tab-content">
                                <TabPanel>
                                    <div className="row products all p-0">
                                        {
                                            products ?

                                                products.slice(0, 6).map((product) =>
                                                    <div className="col-lg-4 col-6"  >
                                                        <ProductTwelve product={product}  />
                                                    </div>
                                                ) 
                                                    :
                                                new Array(6).fill(1).map((product) => (
                                                    <div className="col-lg-4 col-6" >
                                                        <div className="skel-pro"></div>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                    
                                </TabPanel>

                            </div>
                            <div className="tab-content">
                                <TabPanel>
                                    <div className="row products all p-0">
                                        {
                                            products ?

                                                products.slice(0, 6).map((product) =>
                                                    <div className="col-lg-4 col-6"  >
                                                        <ProductTwelve product={product}  />
                                                    </div>
                                                ) 
                                                    :
                                                new Array(6).fill(1).map((product) => (
                                                    <div className="col-lg-4 col-6"  >
                                                        <div className="skel-pro"></div>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                    
                                </TabPanel>

                            </div>

                        </div>
                    </div>

                    <div className="mb-2"></div>
                </div>
            </div>



        </Tabs>
    )
}

export default FeaturedCollection;
