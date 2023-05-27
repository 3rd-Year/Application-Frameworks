import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
 import { toast } from "react-toastify";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { ImageUploadButton } from "../addProduct/styles";
import axios from "axios";
import SliderHome from "../Slider/Slider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function UpdateProduct() {
	const [category, setCategory] = React.useState([]);
	console.log(
		"🚀 ~ file: index.jsx:228 ~ AddProduct ~ category",
		category,
	);
	const [mainCategory, setMainCategory] = React.useState([]);
	const [parent, setParent] = React.useState();
	console.log("🚀 ~ file: index.jsx:230 ~ AddProduct ~ parent", parent);
	const [image, setImage] = React.useState(false);
	console.log("🚀 ~ file: index.jsx:232 ~ AddProduct ~ image", image);
	const [isMen, setIsMen] = React.useState(false);
	const params = useParams();
	const productId = params.id;
  const navigate = useNavigate();
  
	const [product, setProduct] = React.useState({
		name: "",
		price: "",
		color: "",
		size: "",
		productImage: "",
		description: "",
	});

	const onClickAdd = async (e) => {
		e.preventDefault();
		if (
			product.name === "" ||
			product.price === "" ||
			product.color === ""
		) {
			alert("Fill all the fields");
		} else {
			try {
				const res = await axios.put(
					`/api/product/update/${productId}`,
					product,
				);
				console.log(res);
				 toast.success(res.data.message);
         navigate("/supplier")
			} catch (err) {
				console.log(err);
				 toast.error(err.response.data.message);
			}
		}
	};
	React.useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		const response = await axios.get(
			`/api/product/get/${productId}`,
		);
		setProduct(response.data.data);
	}
	const handleImage = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];
			if (!file) return alert("File not exist.");
			if (file.size > 1024 * 1024)
				// 1mb
				return alert("Size too large!");
			if (file.type !== "image/jpeg" && file.type !== "image/png")
				// 1mb
				return alert("File format is incorrect.");
			let formData = new FormData();
			formData.append("file", file);

			const res = await axios.post(
				"/api/categoryImageUpload",
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
				},
			);
			setImage(res.data.url);
			setProduct({
				...product,
				productImage: res.data.url,
			});
			 toast.success(res.data.message);
		} catch (err) {
	console.log(err)
		}
	};

	const onChangeInput = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<Box
				padding={"40px"}
				sx={{
					background: "white",
					width: "auto",
					height: "auto",
					margin: "20px",
				}}
				fullWidth>
				<Box
					padding={"10px"}
					sx={{
						background: "white",
						width: "auto",
						height: "auto",
						margin: "5px",
					}}
					fullWidth>
					<Typography
						padding={"3px"}
						variant="h5"
						gutterBottom
						sx={{
							background: "white",
							textAlign: "center",
							fontWeight: "bold",
						}}>
						Update Product
					</Typography>

					<hr color="black"></hr>
				</Box>
				<Grid container>
					<Grid item xs={6}>
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="center">
							<Box
								padding={"20px"}
								sx={{
									background: "white",
									height: "auto",
									margin: "10px",
								}}
								fullWidth>
								<Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="center"
										alignItems="center">
										<Typography
											padding={"3px"}
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
											}}>
											Product Name
										</Typography>
									</Grid>
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center">
										<TextField
											label="Name"
											id="outlined-size-small"
											value={product.name}
											size="small"
											onChange={(e) =>
												onChangeInput(e)
											}
											name="name"
										/>
									</Grid>
								</Grid>
								<br />
								<Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="center"
										alignItems="center">
										<Typography
											padding={"3px"}
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
											}}>
											Product Price
										</Typography>
									</Grid>
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center">
										<TextField
											label="Price"
											id="outlined-size-small"
											value={product.price}
											size="small"
											onChange={(e) =>
												onChangeInput(e)
											}
											name="price"
										/>
									</Grid>
								</Grid>
								<br />
								<Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="center"
										alignItems="center">
										<Typography
											padding={"3px"}
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
											}}>
											Discription
										</Typography>
									</Grid>
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center">
										<TextField
											label="Description"
											id="outlined-size-small"
											value={product.color}
											size="small"
											onChange={(e) =>
												onChangeInput(e)
											}
											name="color"
										/>
									</Grid>
								</Grid>
								<br />
								<Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="center"
										alignItems="center">
										<Typography
											padding={"3px"}
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
											}}>
											Product Quantity
										</Typography>
									</Grid>
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center">
										<TextField
											label="Qty"
											id="outlined-size-small"
											value={product.size}
											size="small"
											onChange={(e) =>
												onChangeInput(e)
											}
											name="size"
										/>
									</Grid>
								</Grid>
								<br />
								<br />
								<Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										item
										xs={4}
										sx={{ background: "white" }}>
										<Typography
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
												padding: "3px",
											}}>
											Product Image
										</Typography>
									</Grid>
									<Grid
										item
										xs={5}
										sx={{ background: "white" }}>
										<ImageUploadButton component="label">
											<input
												type="file"
												hidden
												onChange={handleImage}
											/>
											<Box
												sx={{
													position: "relative",
													minHeight: 400,
													minWidth: 400,
												}}>
												{image ||
												product.productImage ? (
													<img
														alt="forum_post"
														src={
															product.productImage ||
															image
														}
														style={{
															height: 400,
															width: 400,
															objectFit:
																"cover",
														}}
													/>
												) : (
													<ImageOutlinedIcon
														sx={{
															position:
																"absolute",
															top: "50%",
															left: "50%",
															transform:
																"translate(-50%, -50%)",
															minHeight: 400,
															minWidth: 400,
														}}
													/>
												)}
											</Box>
										</ImageUploadButton>
									</Grid>
								</Grid>
								<Grid
									item
									xs={8}
									sx={{ background: "white" }}
									container
									direction="row"
									justifyContent="center"
									alignItems="flex-start">
									<Typography
										variant="body2"
										sx={{
											background: "white",
											textAlign: "center",
											fontSize: "10px",
											padding: "3px",
										}}>
										JPEG, PNG, SVG or GIF <br />
										(Maximum file size 50MB)
									</Typography>
								</Grid>

								{/* <Grid
									container
									direction="row"
									justifyContent="center">
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="center"
										alignItems="center">
										<Typography
											padding={"3px"}
											variant="h7"
											gutterBottom
											sx={{
												background: "white",
												textAlign: "center",
												fontWeight: "bold",
											}}>
											Product Image
										</Typography>
									</Grid>
									<Grid
										xs={6}
										sx={{ background: "white" }}
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center">
										<ImageUploadButton component="label">
											<input
												type="file"
												hidden
												onChange={handleImage}
											/>
											{image ||
											product.productImage ? (
												<Box
													sx={{
														minWidth: 400,
														maxWidth: 400,
														position:
															"relative", // Add position relative
													}}>
													<img
														alt="forum_post"
														src={
															product.productImage
														}
														style={{
															height: 600,
															width: 600,
															objectFit:
																"cover",
														}}
													/>
													{!image &&
														!product.productImage && ( // Show ImageOutlinedIcon only when there is no image
															<ImageOutlinedIcon
																sx={{
																	position:
																		"absolute", // Position the icon absolutely
																	top: "50%", // Adjust the icon position as desired
																	left: "50%",
																	transform:
																		"translate(-50%, -50%)", // Center the icon
																	minHeight: 400,
																	minWidth: 400,
																}}
															/>
														)}
												</Box>
											) : (
												<ImageOutlinedIcon
													sx={{
														minHeight: 400,
														minWidth: 400,
													}}
												/>
											)}
										</ImageUploadButton>
									</Grid>
								</Grid>
								<br />
								<Grid
									xs={8}
									sx={{ background: "white" }}
									container
									direction="row"
									justifyContent="center"
									alignItems="flex-start">
									<Typography
										padding={"3px"}
										gutterBottom
										sx={{
											background: "white",
											textAlign: "center",
											fontSize: "10px",
										}}>
										JPEG, PNG, SVG or GIF <br />
										(Maximum file size 50MB)
									</Typography>
								</Grid> */}
							</Box>
						</Grid>

						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center">
							<Button
								variant="contained"
								sx={{
									background: "#5ebc67",
									hover: "red",
								}}
								onClick={onClickAdd}>
								Update Product
							</Button>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<div
							style={{
								marginTop: "0px",
								marginBottom: "-10px",
							}}>
							<SliderHome />
						</div>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
