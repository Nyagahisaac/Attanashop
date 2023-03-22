import { useQuery } from "@apollo/react-hooks";

import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import ElementList from "~/components/partials/elements/element-list";
import OwlCarousel from "~/components/features/owl-carousel";
import ProductOne from "~/components/features/products/product-one";
import ProductTwo from "~/components/features/products/product-two";
import ProductThree from "~/components/features/products/product-three";
import ProductFour from "~/components/features/products/product-four";
import ProductFive from "~/components/features/products/product-five";
import ProductSix from "~/components/features/products/product-six";
import ProductSeven from "~/components/features/products/product-seven";

import withApollo from "~/server/apollo";
import { GET_ELEMENT_PRODUCTS } from "~/server/queries";
import { mainSlider2, mainSlider4 } from "~/utils/data";
import { useEffect, useState } from "react";
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from '@windmill/react-ui';

const Products = ({ data }) => {
  const [products, setProducts] = useState()
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
  // console.log(`Products---------------------${products}`)
  return (
    <div className="main">
      <PageHeader title="Products" subTitle="Elements" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/elements">Elements</ALink>
            </li>
            <li className="breadcrumb-item active">Products</li>
          </ol>
        </div>
      </nav>

      <div className="page-content skeleton-body">
      
        <div className="container-fluid">
                    <h2 className="title text-center mb-3">Fullwidth</h2>

                    <div className="row">
                   {products?.map( ( product, index ) =>

                    isLoading ?
                                [ 1, 2, 3, 4 ].map( ( products, index ) =>
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-2" key={ index }>
                                        <div className="skel-pro"></div>
                                    </div>
                                )
                                :
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={ index }>
                                        <ProductSix
                                            product={ product } index={ index }
                                        />
                                    </div>
                                )
                        }
                    </div>
                </div>
       
      </div>
      <ElementList />
    </div>
  );
};

export default Products;
