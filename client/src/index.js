import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import {PlayerContextProvider} from "./store/player-context";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import {ContextProvider} from "./Context";

let persistor = persistStore(store);
const stripePromise = loadStripe('pk_test_51KgThuIS9fITYSqfUY9jiZP3UyI3LhdmgHVwzH6HGNccVeKaOS1LLagESy84ELkwOAZUx5P0B2apqjWa2KCt94t200ghwBRamm');

ReactDOM.render(
	<Elements stripe={stripePromise}>
		<React.StrictMode>
			<ContextProvider>
			<PlayerContextProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<App />
						<ToastContainer
							position="bottom-center"
							autoClose={2000}
							hideProgressBar={true}
							closeButton={false}
							theme="colored"
							icon={false}
						/>
					</BrowserRouter>
				</PersistGate>
			</Provider>
			</PlayerContextProvider>
			</ContextProvider>
		</React.StrictMode>
	</Elements>,
	document.getElementById("root")
);
