import Reveal from 'react-awesome-reveal';

import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import PostFour from '~/components/features/posts/post-four';

import { fadeIn, blogSlider } from '~/utils/data';

function BlogCollection ( props ) {
    const { posts } = props;

    return (
        <div className="container post">
            <div className="section-title">
                <div>
                    <p className="title"><span>Our Blog Posts</span></p>
                </div>

                <ALink className="link text-center text-sm-right" href="/blog/classic">See All Posts</ALink>
            </div>

            <OwlCarousel adClass="owl-simple mb-4" options={ blogSlider }>
                {
                    posts ?
                        posts.map( ( item, index ) => (
                            <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce
                                key={ "Blog" + index }>
                                <PostFour post={ item } />
                            </Reveal>
                        ) )
                        :
                        [ 0, 1, 2 ].map( ( item, index ) =>
                            <div className="skel-pro" key={ "Skeleton" + index }></div>
                        )
                }
            </OwlCarousel>
        </div>
    );
}

export default BlogCollection;