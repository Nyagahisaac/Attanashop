import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';

function MainMenu() {
    const router = useRouter();
    let path = router.asPath;
    let query = router.query;


    return (
        <nav className="main-nav" style={{ border:"none"}} >
            <ul className="menu sf-arrows">
                <li className={`megamenu-container ${path === '/' ? 'active' : ''}`} id="menu-home">
                    <ALink href="/" className="sf-with-ul">Home</ALink>


                </li>
                <li className={path.indexOf("/shop") > -1 ? 'active' : ''}>
                    <ALink href="/shop/sidebar/list" className="sf-with-ul" scroll={false}>Shop</ALink>

                    <div className="megamenu megamenu-md">
                        <div className="row no-gutters">
                            <div className="col-md-8">
                                <div className="menu-col">
                                    <div className="row">
                                        <div className="col-md-6">



                                            <div className="menu-title">
                                            <ul>
                                                <li className={(path.indexOf("shop/nosidebar") > -1 && query.type == 'boxed') ? "active" : ''}><ALink href="/shop/nosidebar/boxed" scroll={false}><span>All Tools<span className="tip tip-hot">Hot</span></span></ALink></li>
                                            </ul>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="banner banner-overlay">
                                    <ALink href="/shop/sidebar/list" className="banner banner-menu">
                                        <img src="images/menu/banner-1.jpg" alt="Banner" />

                                        <div className="banner-content banner-content-top">
                                            <div className="banner-title text-white">Last <br />Chance<br /><span><strong>Sale</strong></span></div>
                                        </div>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className={path.indexOf("pages/shop") > -1 ? 'active' : ''}>
                    <ALink href="#" className="sf-with-ul">Accesories</ALink>
                    <ul>
                        <li className={(path.indexOf("shop/nosidebar") > -1 && query.type == 'boxed') ? "active" : ''}><ALink href="/shop/nosidebar/boxed" scroll={false}><span>All Accessories</span></ALink></li>
                    </ul>

                </li>
               

                <li className={path.indexOf("blog/") > -1 ? 'active' : ''}>
                    <ALink href="/blog/classic" className="sf-with-ul">Blog</ALink>

                    <ul>
                        <li className={path.indexOf("blog/classic") > -1 ? 'active' : ''}><ALink href="/blog/classic">Classic</ALink></li>
                        <li className={path.indexOf("blog/listing") > -1 ? 'active' : ''}><ALink href="/blog/listing" >Listing</ALink></li>
                        <li className={path.indexOf("blog/grid") > -1 ? 'active' : ''}>
                            <ALink href="/blog/grid/2cols" className="sf-with-ul">Grid</ALink>
                            <ul>
                                <li className={path.indexOf("blog/grid/2cols") > -1 ? 'active' : ''}><ALink href="/blog/grid/2cols">Grid 2 columns</ALink></li>
                                <li className={path.indexOf("blog/grid/3cols") > -1 ? 'active' : ''}><ALink href="/blog/grid/3cols">Grid 3 columns</ALink></li>
                                <li className={path.indexOf("blog/grid/4cols") > -1 ? 'active' : ''}><ALink href="/blog/grid/4cols">Grid 4 columns</ALink></li>
                                <li className={path.indexOf("blog/grid/sidebar") > -1 ? 'active' : ''}><ALink href="/blog/grid/sidebar">Grid sidebar</ALink></li>
                            </ul>
                        </li>
                        <li className={path.indexOf("blog/masonry") > -1 ? 'active' : ''}>
                            <ALink href="/blog/masonry/2cols" className="sf-with-ul">Masonry</ALink>
                            <ul>
                                <li className={path.indexOf("blog/masonry/2cols") > -1 ? 'active' : ''}><ALink href="/blog/masonry/2cols">Masonry 2 columns</ALink></li>
                                <li className={path.indexOf("blog/masonry/3cols") > -1 ? 'active' : ''}><ALink href="/blog/masonry/3cols">Masonry 3 columns</ALink></li>
                                <li className={path.indexOf("blog/masonry/4cols") > -1 ? 'active' : ''}><ALink href="/blog/masonry/4cols">Masonry 4 columns</ALink></li>
                                <li className={path.indexOf("blog/masonry/sidebar") > -1 ? 'active' : ''}><ALink href="/blog/masonry/sidebar">Masonry sidebar</ALink></li>
                            </ul>
                        </li>
                        <li className={path.indexOf("blog/mask") > -1 ? 'active' : ''}>
                            <ALink href="/blog/mask/grid" className="sf-with-ul">Mask</ALink>
                            <ul>
                                <li className={path.indexOf("blog/mask/grid") > -1 ? 'active' : ''}><ALink href="/blog/mask/grid">Blog Mask Grid</ALink></li>
                                <li className={path.indexOf("blog/mask/masonry") > -1 ? 'active' : ''}><ALink href="/blog/mask/masonry">Blog Mask Masonry</ALink></li>
                            </ul>
                        </li>
                        <li className={path.indexOf("blog/single") > -1 ? 'active' : ''}>
                            <ALink href="/blog/single/default/cras-ornare-tristique-elit." className="sf-with-ul">Single Post</ALink>
                            <ul>
                                <li className={path.indexOf("blog/single/default") > -1 ? 'active' : ''}><ALink href="/blog/single/default/cras-ornare-tristique-elit.">Default with sidebar</ALink></li>
                                <li className={path.indexOf("blog/single/fullwidth") > -1 ? 'active' : ''}><ALink href="/blog/single/fullwidth/fusce-pellentesque-suscipit.">Fullwidth no sidebar</ALink></li>
                                <li className={path.indexOf("blog/single/sidebar") > -1 ? 'active' : ''}><ALink href="/blog/single/sidebar/utaliquam-sollicitzdvudin-leo">Fullwidth with sidebar</ALink></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className={path.indexOf("pages/contact") > -1 ? 'active' : ''}>
                    <ALink href="/pages/contact-2" className="sf-with-ul">Contact </ALink>

                    <ul>
                        <li className={path.indexOf("pages/contact-2") > -1 ? 'active' : ''}><ALink href="/pages/contact-2">Contact Us</ALink></li>
                    </ul>
                </li>
            </ul>
            {/* <li>Free Delivery  on Orders Kshs 50,000</li> */}
        </nav>
    );
}

export default MainMenu;