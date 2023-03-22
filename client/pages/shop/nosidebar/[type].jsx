import { useRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import ShopListThree from '~/components/partials/shop/list/shop-list-three';
import ShopSidebarOne from '~/components/partials/shop/sidebar/shop-sidebar-one';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';
import { scrollToPageContent } from '~/utils';

function ShopNoSidebar() {
    const router = useRouter();
    const type = router.query.type;
    const query = router.query;
    // const [ getProducts, { data, isloading, error } ] = useLazyQuery( GET_PRODUCTS );
    const [ loadMoreProducts, { data: newData } ] = useLazyQuery( GET_PRODUCTS );
    const [ perPage, setPerPage ] = useState( 8 );
    const [ containerClass, setContainerClass ] = useState( "container" );
    const [ pageTitle, setPageTitle ] = useState( 'Boxed No Sidebar' );
    const [ moreIsLoading, setMoreIsLoading ] = useState( false );
    // const [ products, setProducts ] = useState( [] );
    const [isLoading, setLoading] = useState(false)
    const [products, setProducts] = useState();
    // const totalCount = products;
    const fetchProductsData = () => {
        fetch("http://localhost:5000/api/products")

            .then(response => {

                return response.json()

            })

            .then(products => {

                setProducts(products);
                setLoading(false);

            })
    }
    useEffect(() => {
        setLoading(true)
        loadMoreProducts( {
            variables: {
                searchTerm: query.searchTerm,
                brand: query.brand ? query.brand.split( ',' ) : [],
                minPrice: parseInt( query.minPrice ),
                maxPrice: parseInt( query.maxPrice ),
                category: query.category,
                sortBy: query.sortBy ? query.sortBy : 'default',
                page: 1,
                from: perPage,
                perPage: 4,
            }
        } );
        // if ( newData ) {
        //     setProducts( [ products, newData.products.data ] );
        // };
        if ( type == 'boxed' ) {
            setPageTitle( 'All Products' );
        } else {
            setPageTitle( 'Fullwidth No Sidebar' );
        }

        if ( type == 'fullwidth' ) {
            setContainerClass( 'container-fluid' );
        } else {
            setContainerClass( 'container' );
        }

        fetchProductsData()

    }, [perPage,  type])



    if (isLoading) return <p>Loading...</p>
    if (!products) return <p>No profile data</p>
   

    


    function onSortByChange( e ) {
        let queryObject = router.query;
        let url = router.pathname.replace( '[type]', query.type ) + '?';
        for ( let key in queryObject ) {
            if ( key !== "type" && key !== "sortBy" ) {
                url += key + '=' + queryObject[ key ] + '&';
            }
        }

        router.push( url + 'sortBy=' + e.target.value );
    }

    function showSidebar( e ) {
        e.preventDefault();
        document
            .querySelector( 'body' )
            .classList.add( 'sidebar-filter-active' );
    }

    function toggleSidebar() {
        if (
            document
                .querySelector( 'body' )
                .classList.contains( 'sidebar-filter-active' )
        ) {
            document
                .querySelector( 'body' )
                .classList.remove( 'sidebar-filter-active' );
        } else {
            document
                .querySelector( 'body' )
                .classList.add( 'sidebar-filter-active' );
        }
    }

    function hideSidebar() {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );
    }

    function loadMore( e ) {
        e.preventDefault();
        if ( perPage < totalCount ) {
            setMoreIsLoading( true );
            setTimeout( () => {
                setPerPage( perPage + 4 );
                setMoreIsLoading( false );
            }, 500 );
        }
    }

    // if ( error ) {
    //     return <div></div>
    // }

    return (
        <main className="main shop">
            <PageHeader title={ pageTitle } subTitle="Shop" />
            <nav className="breadcrumb-nav mb-2">
                <div className={ containerClass }>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">{ pageTitle }</li>
                        {
                            query.search ?
                                <li className="breadcrumb-item">
                                    <span>Search - { query.searchTerm }</span>
                                </li>
                                : ""
                        }
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className={ containerClass }>
                    <div className="toolbox">
                        <div className="toolbox-left d-none d-lg-flex">
                            <a href="#" className="sidebar-toggler mr-0 mr-md-5" onClick={ showSidebar }>
                                <i className="icon-bars"></i>Filters
                            </a>
                        </div>
                        <div className="toolbox-center">
                            {
                                !isLoading && products ?
                                    <div className="toolbox-info">
                                        Showing
                                            {/* <span> { products.length } of { totalCount }</span> Products */}
                                        </div>
                                    : ""
                            }
                        </div>

                        <div className="toolbox-right">
                            <div className="toolbox-sort">
                                <label htmlFor="sortby">Sort by:</label>
                                <div className="select-custom">
                                    <select
                                        name="sortby"
                                        id="sortby"
                                        className="form-control"
                                        onChange={ onSortByChange }
                                        value={ query.sortBy ? query.sortBy : 'default' }
                                    >
                                        <option value="default">Default</option>
                                        <option value="featured">Most Popular</option>
                                        <option value="rating">Most Rated</option>
                                        <option value="new">Date</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div >

                    <ShopListThree products={ products } isLoading={ isLoading }></ShopListThree>
                    <div className={ `load-more-container text-center ${ (  moreIsLoading ) ? '' : 'd-none' }` }>
                        <a
                            href="#"
                            className="btn btn-outline-darker btn-load-more"
                            onClick={ loadMore }
                        >
                            More Products
                            <i
                                className={ `icon-refresh ${ moreIsLoading ? 'load-more-rotating' : '' }` }
                            ></i>
                        </a>
                    </div>
                    <div className="sidebar-filter-overlay" onClick={ hideSidebar }></div>
                    <ShopSidebarOne toggle={ true }></ShopSidebarOne>
                    <button className="sidebar-fixed-toggler d-lg-none" onClick={ toggleSidebar }>
                        <i className="icon-cog"></i>
                    </button>
                </div >
            </div >
        </main >
    )
}

export default withApollo( { ssr: typeof window == 'undefined' } )( ShopNoSidebar );