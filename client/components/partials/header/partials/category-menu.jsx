import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ALink from '~/components/features/alink';
import { Badge, Avatar } from '@windmill/react-ui';

const CategoryMenu = (props) => {
    const { cat } = props;
    const query = useRouter().query;

    const [isLoading, setLoading] = useState(false)

    return (
        <>
            <div className="dropdown category-dropdown">
                <div className="category">
                <ALink href="/shop/sidebar/list" className="dropdown-toggle" title="Browse Categories" onMouseOver={() => alert(cat.length)} style={{background:"#fed700", color:"black",borderRadius:"5px"}}>
                  <span>All Categories</span>  
                </ALink>
                </div>
                <div className="dropdown-menu"   >
                    {cat?.map((cat, index) =>
                        <nav className="side-nav"  key={index + 1} >

                            <ul className="menu-vertical sf-arrows sf-js-enabled" style={{ touchAction: 'pan-y' }} >

                                <li className="megamenu-container"   >
                                    <ALink className="sf-with-ul text-dark" href={{ pathname: '/shop/sidebar/list', query: { category: 'electronics' } }}   >

                                        <i className="icon-laptop"></i>{cat.name}</ALink>
                                    <div className="megamenu">
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <div className="menu-col">
                                                    <div className="row">
                                                      
                                                            <div className="col-md-6" >
                                                                <div className="menu-title">{cat.type}</div>

                                                                <ul>
                                                                  
                                                                        <li>
                                                                            <ALink   href={{ pathname: '/shop/sidebar/list', query: { category: 'desktop-computers' } }}>{cat.tool}</ALink>
                                                                        </li>
                                                                 
                                                                </ul>
                                                            </div>
                                                        


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="banner banner-overlay h-100 w-100">
                                                    <ALink href={{ pathname: '/shop/sidebar/list', query: { category: 'electronics' } }} className="banner banner-menu w-100" style={{ background: 'no-repeat 22%/cover url(images/home/menu/banner-1.jpg)' }}></ALink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </li>



                            </ul>

                        </nav>
                    )}
                </div>



            </div>
        </>
    );
}

export default CategoryMenu; 