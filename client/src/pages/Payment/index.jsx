// import React, {useState} from 'react';
// import axios from 'axios';
// // MUI Components
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// // stripe
// // import cards from "../../components/Card";
// import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// // Util imports
// import {makeStyles} from '@material-ui/core/styles';
// // Custom Components
// import CardInput from '../../components/CardInput/index';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 500,
//     margin: '35vh auto',
//   },
//   content: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignContent: 'flex-start',
//   },
//   div: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignContent: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   button: {
//     margin: '2em auto 1em',
//   },
// });

// function HomePage() {
//   const classes = useStyles();
//   // State
//   const [email, setEmail] = useState('');

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const res = await axios.post('http://localhost:3000/pay', {email: email});

//     const clientSecret = res.data['client_secret'];

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           email: email,
//         },
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (e.g., insufficient funds)
//       console.log(result.error.message);
//     } else {
//       // The payment has been processed!
//       if (result.paymentIntent.status === 'succeeded') {
//         console.log('Money is in the bank!');
//         // Show a success message to your customer
//         // There's a risk of the customer closing the window before callback
//         // execution. Set up a webhook or plugin to listen for the
//         // payment_intent.succeeded event that handles any business critical
//         // post-payment actions.
//       }
//     }
//   };

//   return (
//     <Card className={classes.root}>
//       <CardContent className={classes.content}>
//         <TextField
//           label='Email'
//           id='outlined-email-input'
//           helperText={`Email you'll recive updates and receipts on`}
//           margin='normal'
//           variant='outlined'
//           type='email'
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//         />
//         <CardInput />
//         <div className={classes.div}>
//           <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
//             Pay
//           </Button>
//           <Button variant="contained" color="primary" className={classes.button}>
//             Subscription
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default HomePage;

// import './index.css';
// import { useState} from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { FormControl, InputAdornment, InputLabel, OutlinedInput  } from "@mui/material";
// import { toast } from "react-toastify";

// function App() {
 

//   const handleToken = (token) => {
//     fetch("http://localhost:3006/payment/subscribes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token, amount: 2000 }),
//     })
//     .then(res => res.json())
//     .then(_ => {
//       toast.warning("Transaction successful, You are now a premium user", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
//     }).catch(_ => toast.error("Transaction failed, please try again", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT  }))
//   }

  
//   return (
//     <div className="App" 
//     style={{
//        display: 'flex', 
//        justifyContent: 'center', 
//        alignItems: 'center',
//        width: '100%',
//        height: "100vh",
//        flexDirection: 'column',
//        gap: 15,
//        }}>
    
//     <StripeCheckout
//           stripeKey={"pk_test_51KgThuIS9fITYSqfUY9jiZP3UyI3LhdmgHVwzH6HGNccVeKaOS1LLagESy84ELkwOAZUx5P0B2apqjWa2KCt94t200ghwBRamm" }
//           token={handleToken}
//           name=""
//           panelLabel={`Donate`}
//           currency="USD"
//           amount={2000}
//       >
         
//       </StripeCheckout>
// </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
// import "./App.css";
import { ProductDisplay } from "../../components/CardInput/index";
import { Message } from "../../components/CardInput/indexMSG";
 
 
export default function App() {
 const [message, setMessage] = useState("");
 
 useEffect(() => {
   // Check to see if this is a redirect back from Checkout
   const query = new URLSearchParams(window.location.search);
 
   if (query.get("success")) {
     setMessage(" Yay! Order placed! 🛒 You will receive an email confirmation confirming your order.");
   }
 
   if (query.get("canceled")) {
     setMessage(
       "Order canceled -- please try again."
     );
   }
 }, []);
 
 return message ? <Message message={message} /> : <ProductDisplay />;
}