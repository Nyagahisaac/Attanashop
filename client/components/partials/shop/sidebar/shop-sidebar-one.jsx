import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';
import 'react-input-range/lib/css/index.css';

import ALink from '~/components/features/alink';
import { shopData } from '~/utils/data';

function ShopSidebarOne(props) {
    const { toggle = false } = props;
    const router = useRouter();
    const query = useRouter().query;
    const [priceRange, setRange] = useState({ min: 0, max: 1000 });

    const [categories, setCategories] = useState([]);
    const [tools, setTools] = useState([]);

    const [isLoading, setLoading] = useState(false)
    const [brands, setBrands] = useState();

    const fetchBrandData = () => {
        fetch("http://localhost:5000/api/brand")

            .then(response => {

                return response.json()

            })

            .then(brands => {

                setBrands(brands)
                setLoading(false)

            })
    }

    const fetchData = () => {
        fetch("http://localhost:5000/api/category")

            .then(response => {

                return response.json()

            })

            .then(categories => {

                setCategories(categories)
                setLoading(false)

            })
    }
    useEffect(() => {
        setLoading(true)
        if (query.minPrice && query.maxPrice) {
            setRange({ min: parseInt(query.minPrice), max: parseInt(query.maxPrice) });
        } else {
            setRange({ min: 0, max: 1000 });
        }
        fetchBrandData()
        fetchData()

    }, [query])
    if (isLoading) return <p>Loading...</p>
    if (!categories) return <p>No profile data</p>


    function onChangePriceRange(value) {
        setRange(value);
    }

    function containsAttrInUrl(type, value) {
        const currentQueries = query[type] ? query[type].split(',') : [];
        return currentQueries && currentQueries.includes(value);
    }

    function getUrlForAttrs(type, value) {
        let currentQueries = query[type] ? query[type].split(',') : [];
        currentQueries = containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];

        return {
            pathname: router.pathname,
            query: {
                ...query,
                page: 1,
                [type]: currentQueries.join(',')
            }
        }
    }

    function onAttrClick(e, attr, value) {
        if (getUrlForAttrs(attr, value)) {
            let queryObject = getUrlForAttrs(attr, value).query;
            let url = router.pathname.replace('[type]', query.type) + '?';
            for (let key in queryObject) {
                if (key !== "type") {
                    url += key + '=' + queryObject[key] + '&';
                }
            }
            router.push(url);
        }
    }

    return (
        <>
            <aside className={`${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop`}>
                <div className={toggle ? 'sidebar-filter-wrapper' : ''}>
                    <div className="widget widget-clean">
                        <label>Filters:</label>
                        <ALink href={{ pathname: router.pathname, query: { type: query.type } }} className="sidebar-filter-clear" scroll={false}>Clean All</ALink>
                    </div>

                    <SlideToggle collapsed={false}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#category" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Category</a>
                                </h3>

                                <div ref={setCollapsibleElement}>
                                    <div className="widget-body pt-0">
                                        {categories.length > 0 && (
                                            <div className="filter-items filter-items-count">
                                                {categories?.map((parent, index) => (
                                                    <div className="filter-item" key={`cat_${index}`}>
                                                        <ALink className={`${query.category == parent.name ? 'active' : ''}`} href={{ pathname: router.pathname, query: { type: query.type, category: parent.name } }} scroll={false}>{parent.name}</ALink>

                                                        <span className="item-count">{parent.id}</span>

                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>

                    <SlideToggle collapsed={false}>
                        {
                            ({ onToggle, setCollapsibleElement, toggleState }) => (
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title mb-2"><a href="#brand" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Brand </a></h3>
                                    <div ref={setCollapsibleElement}>
                                        <div className="widget-body pt-0">
                                            <div className="filter-items">

                                                {brands?.map((brand, index) =>

                                                    <div className="filter-item" key={index}>
                                                        <div className="custom-control custom-checkbox">

                                                            <input type="checkbox"
                                                                className="custom-control-input"
                                                                id={`brand-${index + 1}`}
                                                                onChange={e => onAttrClick(e, 'brand', brand.brandname)}
                                                                checked={containsAttrInUrl('brand', brand.brandname) ? true : false}
                                                            />
                                                            <label className="custom-control-label" htmlFor={`brand-${index + 1}`}>{brand.brandname}</label>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </SlideToggle>

                    <SlideToggle collapsed={false}>
                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title mb-2">
                                    <a href="#price" className={`${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}`} onClick={(e) => { onToggle(e); e.preventDefault() }}>Price</a>
                                </h3>

                                <div ref={setCollapsibleElement}>
                                    <div className="widget-body pt-0">
                                        <div className="filter-price">
                                            <div className="filter-price-text d-flex justify-content-between">
                                                <span>
                                                    Price Range:&nbsp;
                                                    <span className="filter-price-range">${priceRange.min} - ${priceRange.max}</span>
                                                </span>

                                                <ALink href={{ pathname: router.pathname, query: { ...query, minPrice: priceRange.min, maxPrice: priceRange.max, page: 1 } }} className="pr-2" scroll={false}>Filter</ALink>
                                            </div>

                                            <div className="price-slider">
                                                <InputRange
                                                    formatLabel={value => `$${value}`}
                                                    maxValue={1000}
                                                    minValue={0}
                                                    step={50}
                                                    value={priceRange}
                                                    onChange={onChangePriceRange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>
                </div>
            </aside>
        </>
    );
}

export default React.memo(ShopSidebarOne);