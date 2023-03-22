import { connect } from 'react-redux';

import ALink from '~/components/features/alink';

import { actions } from '~/store/compare';

function CompareMenu ( props ) {
    const { compareList } = props;

    return (
        <div className="dropdown compare-dropdown">
            <ALink href="#" className="dropdown-toggle">
                <i className="icon-random"  style={{color:"black"}}></i>
            </ALink>

            {
                compareList.length > 0 ?
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="compare-products">
                            {
                                compareList.map( ( product, index ) => (
                                    <li className="compare-product" key={ index }>
                                        <a
                                            href="#"
                                            className="btn-remove"
                                            title="Remove Product"
                                            onClick={ e => props.removeFromCompare( product ) }
                                           
                                        >
                                            <i className="icon-close " >comp</i>
                                        </a>
                                        <h4 className="compare-product-title">
                                            <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                                        </h4>
                                    </li>
                                ) )
                            }
                        </ul>

                        <div className="compare-actions">
                            <a href="#" className="action-link" onClick={ e => props.clearAllFromCompare() }>Clear All</a>
                            <ALink href="#" className="btn btn-outline-primary-2">
                                <span>Compare</span>
                                <i className="icon-long-arrow-rightb" style={{color:"black"}}></i>
                            </ALink>
                        </div>
                    </div>
                    :
                    <div className="dropdown-menu dropdown-menu-right">
                        <p className="text-center">No products in the compare.</p>
                    </div>
            }
        </div>
    )
}

function mapStateToProps ( state ) {
    return {
        compareList: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...actions } )( CompareMenu );