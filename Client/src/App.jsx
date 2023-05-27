import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/login/login.jsx";
import Header from "./components/common/header/header.jsx";
import Footer from "./components/common/footer/footer.jsx";
import Home from "./components/home/home.jsx";
import Register from "./components/register/register.jsx";
import Profile from "./components/profile/profile.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "./app.css";
import SuplierHome from "./components/suppplierHome/home.jsx";
import Cart from "./components/common/Cart/Cart.jsx";
import ProductView from "./components/viewProduct/index.jsx";
import AddProduct from "./components/addProduct/index.jsx";
import UpdateProduct from "./components/updateProduct/index.jsx";
import UserList from "./components/userList/userList.jsx";
import CreatePost from "./components/createPost/createPost.jsx";
import UpdatePost from "./components/updatePost/updatePost.jsx";
import LocationCard from "./components/locationCard/locationCard.jsx";
import CarrierCard from "./components/carrierCard/carrierCard.jsx";
import CreateCarrier from "./components/createCarrier/createCarrier.jsx";
import ForbiddenPage from "./components/forbidden/forbidden.jsx";
import Dashboard from "./components/adminDashboard/dashboard.jsx";

function App() {
	//Step 2 :
	const [CartItem, setCartItem] = useState([]);

	//Step 4 :
	const addToCart = (product) => {
		// if hamro product alredy cart xa bhane  find garna help garxa
		const productExit = CartItem.find(
			(item) => item.id === product.id,
		);
		// if productExit chai alredy exit in cart then will run fun() => setCartItem
		// ani inside => setCartItem will run => map() ani yo map() chai each cart ma
		// gayara check garxa if item.id ra product.id chai match bhayo bhane
		// productExit product chai display garxa
		// ani increase  exits product QTY by 1
		// if item and product doesnt match then will add new items
		if (productExit) {
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty + 1 }
						: item,
				),
			);
		} else {
			// but if the product doesnt exit in the cart that mean if card is empty
			// then new product is added in cart  and its qty is initalize to 1
			setCartItem([...CartItem, { ...product, qty: 1 }]);
		}
	};

	// Stpe: 6
	const decreaseQty = (product) => {
		// if hamro product alredy cart xa bhane  find garna help garxa
		const productExit = CartItem.find(
			(item) => item.id === product.id,
		);

		// if product is exit and its qty is 1 then we will run a fun  setCartItem
		// inside  setCartItem we will run filter to check if item.id is match to product.id
		// if the item.id is doesnt match to product.id then that items are display in cart
		// else
		if (productExit.qty === 1) {
			setCartItem(CartItem.filter((item) => item.id !== product.id));
		} else {
			// if product is exit and qty  of that produt is not equal to 1
			// then will run function call setCartItem
			// inside setCartItem we will run map method
			// this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty - 1 }
						: item,
				),
			);
		}
	};

	const role = localStorage.getItem("role");
	const login = localStorage.getItem("login");

	console.log("role: ", role, " | ", login);

	return (
		<>
			<Router>
				<Header />
				<Routes>
					{/* {role === "admin" && login ? ( */}
						<>
							<Route
								path="/supplier"
								element={<SuplierHome />}
							/>
							<Route
								path="/addProduct"
								element={<AddProduct />}
							/>
							<Route
								path="/updateProduct/:id"
								element={<UpdateProduct />}
							/>
							<Route
								path="/viewProduct"
								element={<ProductView />}
							/>
							<Route
								path="/admin/users"
								element={<UserList />}
							/>

							<Route
								path="/admin/post/create"
								element={<CreatePost />}
							/>
							<Route
								path="/admin/post/update"
								element={<UpdatePost />}
							/>
							<Route
								path="/locations"
								element={<LocationCard />}
							/>
							<Route
								path="/carriers"
								element={<CarrierCard />}
							/>
							<Route
								path="/admin/carriers/create"
								element={<CreateCarrier />}
							/>

							<Route
								path="/admin/dashboard"
								element={<Dashboard />}
							/>

							{/* ---------------- */}

							<Route
								path="/cart"
								element={<ForbiddenPage />}
							/>

							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>
						</>
					{/* ) : (
						<></>
					)} */}

					{role === "user" && login ? (
						<>
							<Route
								path="/cart"
								element={
									<Cart
										CartItem={CartItem}
										addToCart={addToCart}
										decreaseQty={decreaseQty}
									/>
								}
							/>

							<Route
								path="/viewProduct"
								element={<ProductView />}
							/>
							<Route
								path="/locations"
								element={<LocationCard />}
							/>
							<Route
								path="/carriers"
								element={<CarrierCard />}
							/>

							{/* ----------------- */}

							<Route
								path="/supplier"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/addProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/updateProduct/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/users"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/user/update/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/create"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/update"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/carriers/create"
								element={<ForbiddenPage />}
							/>
						</>
					) : (
						<></>
					)}

					{!login ? (
						<>
							<Route
								path="/cart"
								element={<ForbiddenPage />}
							/>

							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>

							{/* ----------------- */}

							<Route
								path="/supplier"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/addProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/updateProduct/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/users"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/user/update/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/create"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/update"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/carriers/create"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/supplier"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/addProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/updateProduct/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/users"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/user/update/:id"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/create"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/post/update"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/admin/carriers/create"
								element={<ForbiddenPage />}
							/>

							<Route
								path="/admin/dashboard"
								element={<ForbiddenPage />}
							/>

							{/* ---------------- */}

							<Route
								path="/cart"
								element={<ForbiddenPage />}
							/>

							<Route
								path="/viewProduct"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/locations"
								element={<ForbiddenPage />}
							/>
							<Route
								path="/carriers"
								element={<ForbiddenPage />}
							/>
						</>
					) : (
						<></>
					)}

					<Route path="/" element={<Home />} />
					<Route path="/auth/register" element={<Register />} />
					<Route path="/auth/login" element={<Login />} exact />
					<Route path="/user/:id" element={<Profile />} exact />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
