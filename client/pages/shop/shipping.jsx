import { useEffect, useState, Component } from 'react';
import axios from 'axios';

function Shipping () {
    
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

    return (
        <form>
            <div className="form-group">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>First name <abbr className="required"
                                    title="required">*</abbr></label>
                                <input type="text" className="form-control" required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Last name <abbr className="required"
                                    title="required">*</abbr></label>
                                <input type="text" className="form-control" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Company name (optional)</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="select-custom">
                        <label>Country / Region <span className="required">*</span></label>
                        <select name="orderby" className="form-control">
                            <option value="" defaultValue="selected">Vanuatu</option>
                            <option value="1">Brunei</option>
                            <option value="2">Bulgaria</option>
                            <option value="3">Burkina Faso</option>
                            <option value="4">Burundi</option>
                            <option value="5">Cameroon</option>
                        </select>
                    </div>

                    <div className="form-group mb-1 pb-2">
                        <label>Street address <abbr className="required"
                            title="required">*</abbr></label>
                        <input type="text" className="form-control"
                            placeholder="House number and street name" required />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control"
                            placeholder="Apartment, suite, unit, etc. (optional)" required />
                    </div>

                    <div className="form-group">
                        <label>Town / City <abbr className="required"
                            title="required">*</abbr></label>
                        <input type="text" className="form-control" required />
                    </div>

                    <div className="select-custom">
                        <label>State / County <abbr className="required"
                            title="required">*</abbr></label>
                        <select name="orderby" className="form-control">
                            <option value="" defaultValue="selected">NY</option>
                            <option value="1">Brunei</option>
                            <option value="2">Bulgaria</option>
                            <option value="3">Burkina Faso</option>
                            <option value="4">Burundi</option>
                            <option value="5">Cameroon</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Postcode / ZIP <abbr className="required"
                            title="required">*</abbr></label>
                        <input type="text" className="form-control" required />
                    </div>
             
            </div>
        </form>
    )
}

export default Shipping;