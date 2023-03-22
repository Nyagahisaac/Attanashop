// import React from 'react'
// import './App.css';
// import Login  from './pages/pages/login';
// import { BrowserRouter , Routes, Route ,Navigate} from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Header from './components/partials/header';
// import Products from './pages/elements/products';

// const App = () => {

    import { useEffect, useState } from "react";
    import {
      TableCell,
      TableBody,
      TableRow,
      Badge,
      Avatar,
    } from '@windmill/react-ui';
    function Home () {
        const { data, loading, error } = useQuery( GET_HOME_DATA );
        const products = data && data.homeData.products;
        const topProducts = attrFilter( data && data.homeData.products, 'top' );
        const posts = data && data.homeData.posts;
    
        if ( error ) {
            return <div></div>
        }
        const [coupons, setCoupons] = useState([]);
        const [isLoading, setLoading] = useState(false)
      
        const fetchData = () => {
          fetch("http://localhost:5000/api/coupon")
      
            .then(response => {
      
              return response.json()
      
            })
      
            .then(coupons => {
      
              setCoupons(coupons)
              setLoading(false)
      
            })}
        useEffect(() => {
                setLoading(true)
      
      
          fetchData()
      
        }, [])
        if (isLoading) return <p>Loading...</p>
        if (!coupons) return <p>No profile data</p>
        console.log(`Coupons---------------------${coupons}`)
        
//     // const [user, setUser] = useState(null);
//     // // const user =  false ;
  
//     // useEffect (() => {
//     // const getUser = async () => {
//     //   fetch("http://localhost:5000/api/products", {
//     //     method: "GET",
//     //     credentials: "include",
//     //     headers: {
//     //       Accept: "application/json",
//     //       "Content_Type": "apllication/json",
          
//     //       "Access-Control-Allow-Credentials" : true,
//     //     },
//     //   })
//     //   .then((response ) => {
//     //     if (response.status === 200 ) return response.json();
//     //     throw new Error("authentication has been failed!")
//     //   })
//     //   .then( resObject => {
//     //     setUser(resObject.user)
//     //   })
//     //   .catch(err => {
//     //     console.log(err)
//     //   });
//     // };
//     // getUser();
//     // }, []);
  
//     // console.log(user)
//     const [products, setProducts] = useState(null);

//   const getProducts = async () => {
//     fetch("http://localhost:5000/api/products", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         Content_Type: "apllication/json",

//         "Access-Control-Allow-Credentials": true,
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) return response.json();
//         throw new Error("products querying has been failed!");
//       })
//       .then((resObject) => {
//         setProducts(resObject.products);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   getProducts();
//   console.log(products)
//   return (
//       <BrowserRouter>
//     <div >
//         {/* <Header user={user} /> */}
//         <Products products={products} />
//         <Routes> 
//             <Route path='/' element = {<Home />} />
//             <Route
//             path="/login"
//             element={user ? <Navigate to="/" /> : <Login />}
//           />
//         </Routes>
//     </div>
//     </BrowserRouter>
//   )
// }

// export default App;