import {
    Magnifier, GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from 'react-image-magnifiers';
import React, { useState, useEffect } from 'react';
import LightBox from 'react-image-lightbox';
import {
    Badge,
    Avatar,
} from '@windmill/react-ui';

function GalleryDefault(props) {
    const {product, index} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    
    function moveNextPhoto() {
        setPhotoIndex((photoIndex + 1) % product.image.length);
    }

    function movePrevPhoto() {
        setPhotoIndex((photoIndex + product.image.length - 1) % product.image.length);
    }

    function openLightBox() {
        let index = parseInt(document.querySelector(".product-main-image").getAttribute("index"));

        if (!index) {
            index = 0;
        }
        setIsOpen(true);
        setPhotoIndex(index);
    }

    function closeLightBox() {
        setIsOpen(false);
    }

    function changeBgImage(e, image, index) {
        let imgs = document.querySelectorAll('.product-main-image img');
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].src = image;
        }

        document.querySelector('.product-image-gallery .active').classList.remove('active');

        document.querySelector('.product-main-image').setAttribute('index', index);
        e.currentTarget.classList.add('active');
    }

    if (!product) {
        return <div></div>
    }

    return (
        <>

            <div className={`product-gallery ${product.id}`}>
               
                    <div className="row m-0">
                        <figure className="product-main-image" index="0">
                            {
                                product.status ?
                                    <span className="product-label label-new">New</span>
                                    : ""
                            }

                            {
                                product.price ?
                                    <span className="product-label label-sale">Sale</span>
                                    : ""
                            }

                            {
                                product.top ?
                                    <span className="product-label label-top">Top</span>
                                    : ""
                            }

                            {
                                !product.quantity || product.quantity == 0 ?
                                    <span className="product-label label-out">Out of Stock</span>
                                    : ""
                            }
                            <Magnifier
                                imageSrc={product.image}
                                imageAlt={product.title}
                                largeImageSrc={product.image} // Optional
                                dragToMove={false}
                                mouseActivation="hover"
                                cursorStyleActive="crosshair"
                                id="product-zoom"
                                className="zoom-image position-relative overflow-hidden"
                                style={{ height: '50vh', width: '100%' }}
                                 />

                            <button id="btn-product-gallery" className="btn-product-gallery" onClick={openLightBox}>
                                <i className="icon-arrows"></i>
                            </button>
                        </figure>


                        <div id="product-zoom-gallery" className="product-image-gallery">


                            {
                                
                                    <button className={`product-gallery-item ${0 === index ? 'active' : ''}`} key={product.id + '-' + index} onClick={e => changeBgImage(e, `${product.image}`, index)}>
                                        <div className="img-wrapper h-100">
                                            <img src={product.image} alt="product back" />
                                        </div>
                                    </button>
                               
                            }



                        </div>
                    </div>
              
            </div>
                            
            {
                isOpen ?

            
                    <LightBox
                    
                        mainSrc={product.image}
                        nextSrc={product.image}
                        prevSrc={product.image}
                        onCloseRequest={closeLightBox}
                        onMovePrevRequest={moveNextPhoto}
                        onMoveNextRequest={movePrevPhoto}
                        reactModalStyle={{
                            overlay: {
                                zIndex: 1041
                            },
                        }
                        }
                    />
                    
                    : ''
            }
        
        </>
    )
}

export default React.memo(GalleryDefault);

