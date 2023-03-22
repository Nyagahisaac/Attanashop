import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import ALink from "~/components/features/alink";
import { axios } from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import GoogleProvider from "next-auth/providers/google";
import { Link } from "react-router-dom";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_BASEURL}${url}`,
    data: body,
  });
console.log(`${axios}`);

const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "10000",
  },
};

Modal.setAppElement("body");

const LoginModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  let timer;

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  function closeModal() {
    document
      .getElementById("login-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    timer = setTimeout(() => {
      setOpen(false);
    }, 350);
  }

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const callAPI = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(objectWithData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [country, setCountry] = useState("");
  // const [phone, setPhone] = useState("");
  // const [city, setCity] = useState("");
  // const [name, setName] = useState("");
  

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // const handlePhone = (e) => {
  //   setPhone(e.target.value);
  // };

  // const handleAddress = (e) => {
  //   setAddress(e.target.value);
  // };

  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   alert("User Added");
  //   const userData = {
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     const add = await fetch("http://localhost:5000/api/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     console.log(add);
  //   } catch (err) {
  //     console.error();
  //   }
  // };
  const handleSubmit = async (e, post) => {
    e.preventDefault()
    const payload = {
        firstName: e.target.firstname.value,
        lastName: e.target.lastname.value,
        userName: e.target.username.value,
        address: e.target.address.vlue,
        city: e.target.city.value,
        state: e.target.state.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        password: e.target.password.value

    };

    axios.post("http://localhost:5000/api/user/login",  payload )
        .then((response) => {
            setResponse(response.payload)
            console.log("..................... this", response.payload)
        })

        .catch(function (error) {
            console.log(error);
        });
       

}
  return (
   
    <li>
    
      <a href="#" onClick={openModal}>
        <i className="icon-user" style={{color:"black", fontSize:"20px"}}></i>My Account
      </a>
      
      

      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
          contentLabel="login Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="login-modal"
          onRequestClose={closeModal}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">
                  <i className="icon-close"></i>
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <Tabs selectedTabClassName="show" defaultIndex={0}>
                    <TabList className="nav nav-pills nav-fill">
                      <Tab className="nav-item">
                        <span className="nav-link">Sign In</span>
                      </Tab>

                      <Tab className="nav-item">
                        <span className="nav-link">Register</span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <TabPanel style={{ paddingTop: "2rem" }}>
                        <div>
                          <form action="" method="POST" onSubmit={handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="registerEmail">
                                Username or email address *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="registerEmail"
                                name="email"
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="singin-password-2">
                                Password *
                              </label>

                              <OutlinedInput
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                style={{
                                  fontSize: "15px",
                                  fontFamily: "sans-serif",
                                }}
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {values.showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                              />
                            </div>

                            <div className="form-footer">
                              <button
                                type="submit"
                                className="btn btn-outline-primary-2"
                              >
                                <span>LOG IN</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>

                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="signin-remember-2"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="signin-remember-2"
                                >
                                  Remember Me
                                </label>
                              </div>

                              <ALink href="#" className="forgot-link">
                                Forgot Your Password?
                              </ALink>
                            </div>
                          </form>
                          <div className="form-choice">
                            <p className="text-center">or sign in with</p>
                            <div className="row">
                              <div className="col-sm-12">
                                <div
                                  className="btn btn-login btn-g"
                                  onClick={google}
                                >
                                  <i className="icon-google"></i>
                                  Login With Google
                                </div>
                              </div>
                              {/* <div className="col-sm-6">
                                <div
                                  className="btn btn-login btn-f"
                                  onClick={facebook}
                                >
                                  <i className="icon-facebook-f"></i>
                                  Login With Facebook
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <form method="POST" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="register-username-2">
                              Your Username *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="register-username-2"
                              name="username"
                              required

                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-email-2">
                              Your email address *
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="register-email-2"
                              name="email"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="register-password-2">
                              Password *
                            </label>
                            <OutlinedInput
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              style={{
                                fontSize: "15px",
                                fontFamily: "sans-serif",
                              }}
                              // id="outlined-adornment-password"
                              type={values.showPassword ? "text" : "password"}
                              value={values.password}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {values.showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-phonenumber-2">
                              {" "}
                              PhoneNumber *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="register-phonenumber-2"
                              name="phone"
                              required

                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-adress-2">
                              Your Home address *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="register-address"
                              required

                            />
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>SIGN UP</span>
                              <i className="icon-long-arrow-right"></i>
                            </button>

                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="register-policy-2"
                                required
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="register-policy-2"
                              >
                                I agree to the privacy policy *
                              </label>
                            </div>
                          </div>
                        </form>
                        <div className="form-choice">
                          <p className="text-center">or sign in with</p>
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                className="btn btn-login btn-g"
                                onClick={google}
                              >
                                <i className="icon-google"></i>
                                Login With Google
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </li>
  );
};
export default LoginModal;
