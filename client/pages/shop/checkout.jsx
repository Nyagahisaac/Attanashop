import { useEffect, useState, Component, useMemo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';
import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';
import { cartPriceTotal } from '~/utils/index';
import { PayPalButton } from "react-paypal-button-v2";
import { Audio } from 'react-loader-spinner'
import order from 'paypal-node-sdk/lib/resources/Order';
import { CardHeader } from '@mui/material';
import { CardBody } from '@windmill/react-ui';
import { CardGroup } from 'react-bootstrap';
import Shipping from '~/pages/shop/shipping'
import countryList from 'react-select-country-list';
import Select from 'react-select';

function Checkout(props,) {
    const Loader = require('react-loaders').Loader;
    const { cartlist } = props;
    const jwt = require('jsonwebtoken');
    const { success } = useState;
    const { response, setResponse } = useState(true);
    const [orderID, setOrderID] = useState(false);
    const total = `${cartPriceTotal(cartlist)}`;
    const [loadState, setLoadState] = useState({ loading: false, loaded: false });
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), [])

    // const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

    const handlePayment = async (event, err) => {
        event.preventDefault()
        const payment = {
            phone: event.target.phone.value,
            amount: total
        }


        axios.post("http://localhost:5000/api/mpesa/add", payment)
            .then((response) => {
                setResponse(response.payment)
                console.log("..................... this", response.payment)
            })

            .catch(function (error) {
                console.log(error);
            });
    };

    const handleCouponSubmit = async (event) => {
        event.preventDefault()
        const data = {
            couponcode: event.target.couponcode.value
        }
        await axios.get("http://localhost:5000/api/coupon", data)
            .then((response) => {
                setResponse(response.data)
                console.log("..................... this", response.data)
            })

            .catch(function (error) {
                console.log(error);
            });


    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const secret = "cab0d8c924b11e7cb1dc84d4f28a73b8a3fb69dc30ad5528e7b10670a3d76afa1445bade82234dab7d4f22db9b20d57c90ce31e1581112ef1322f95147e3e195";
        const token = jwt.sign({
            data: "Token Data",
        }, secret, {
            expiresIn: '10m'
        });
        const order = jwt.verify(token, secret, cartlist, function (err, req,) {
            const payload =
            {
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value,
                company: e.target.company.value,
                country: e.target.country.value,
                street: e.target.street.value,
                address: e.target.address.value,
                city: e.target.city.value,
                state: e.target.state.value,
                zip: e.target.zip.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
                total: total
            }

            if (err) {
                return res.json({
                    success: true,
                    data: order,
                    message: "Failed to authorize",
                });
            }

            axios.post("http://localhost:5000/api/order/add",
                payload, {
                headers:
                    { Authorization: `Bearer ${token}` }
            }, order
            )
                .then((response) => {
                    setResponse(response.payload)
                    console.log("..................... this", response.payload)
                })

                .catch(function (error) {
                    console.log(error);
                });
            req.order = order;

        });

    }


    useEffect(() => {
        document.querySelector('body').addEventListener("click", clearOpacity)

        return () => {
            document.querySelector('body').removeEventListener("click", clearOpacity);
        }
    }, [])

    function clearOpacity() {
        if (document.querySelector('#checkout-discount-input').value == '')
            document.querySelector('#checkout-discount-form label').removeAttribute('style');
    }

    function addOpacity(e) {
        e.currentTarget.parentNode.querySelector("label").setAttribute("style", "opacity: 0");
    }

    const createOrder = (data, actions, ) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: total

                }
            }],

        });
    }

    const onApprove= (data, actions) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function (details) {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                    orderID: data.orderID,
                })
            });
        });
    }
    

    

    return (
        <div className="main">
            <PageHeader title="Checkout" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form" >
                                <input type="text" className="form-control" required id="checkout-discount-input" name='couponcode' onClick={addOpacity} />
                                <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                            </form>
                        </div>

                        <form action="#" method='POST'>
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Billing Details</h2>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>First Name *</label>
                                            <input type="text" className="form-control" name='firstname' required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label>Last Name *</label>
                                            <input type="text" className="form-control" name='lastname' required />
                                        </div>
                                    </div>

                                    <label>Company Name (Optional)</label>
                                    <input type="text" className="form-control" name='company' />

                                    <label>Country *</label>
                                    <input type="text" className="form-control" required name='country' />

                                    <label>Street address *</label>
                                    <input type="text" className="form-control" placeholder="House number and Street name" required name='street' />
                                    <input type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." required name='address' />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Town / City *</label>
                                            <input type="text" className="form-control" required name='city' />
                                        </div>

                                        <div className="col-sm-6">
                                            <label>State / County *</label>
                                            <input type="text" className="form-control" required name='state' />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Postcode / ZIP *</label>
                                            <input type="text" className="form-control" name='zip' required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label>Phone *</label>
                                            <input type="tel" className="form-control" name='phone' required />
                                        </div>
                                    </div>

                                    <label>Email address *</label>
                                    <input type="email" className="form-control" name='email' required />

                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                                        <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                    </div>

                                    <SlideToggle duration={300} collapsed >
                                        {({ onToggle, setCollapsibleElement }) => (
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mt-0 address-box">
                                                    <input type="checkbox" className="custom-control-input"
                                                        id="different-shipping" onChange={onToggle} />
                                                    <label className="custom-control-label" htmlFor="different-shipping">Ship to a different address?
                                                    </label>
                                                </div>
                                                <div className="shipping-info" ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                                    <Shipping />
                                                </div>
                                            </div>
                                        )}
                                    </SlideToggle >

                                    <label>Order notes (optional)</label>
                                    <textarea className="form-control" cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                </div>

                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <h3 className="summary-title">Your Order</h3>

                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {cartlist.map((item, index) =>
                                                    <tr key={index}>
                                                        <td> <ALink href={`/product/default/${item.slug}`}>{item.parent}</ALink></td>
                                                        <td  >kshs. {item.sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                )}
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>kshs. {cartPriceTotal(cartlist).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping:</td>
                                                    <td>Free Shipping</td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>kshs. {cartPriceTotal(cartlist).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <Accordion type="checkout">


                                           
                                        </Accordion>

                                        <button type="submit" onSubmit={handleSubmit} className="btn btn-outline-primary-2 btn-order btn-block">
                                            <span className="btn-text">Place Order</span>
                                            <span className="btn-hover-text">Proceed to Checkout</span>
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => ({
    cartlist: state.cartlist.data,
})

export default connect(mapStateToProps)(Checkout);