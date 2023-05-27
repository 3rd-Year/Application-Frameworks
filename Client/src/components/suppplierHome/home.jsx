import React from "react";
import SliderHome from "../Slider/Slider";
import FlashCard from "../productCard";
import MediaCard from "../productCard";
import { Button, Typography,Grid, Divider } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';


const SuplierHome = () => {
    
	let navigate = useNavigate()
    const handleClick = () => {
    navigate('/addProduct')
    }
	return (
		<div style={{ marginTop: "0px", marginBottom: "-10px" }}>
			<SliderHome />
			<div
				style={{
					marginTop: "30px",
					marginBottom: "-10px",
					marginLeft: "45%",
				}}>
				<h3>Products</h3>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={12} >
					<Divider
						textAlign="right"
						color="black"
						style={{
							marginTop: "15px",
							marginRight: "5%",
							marginLeft: "5%",
						}}
						>
						<Button  startIcon={<AddCircleIcon />}  
					      	sx={{ ":hover": {
							    borderRadius: "10px",
								bgcolor: "#5ebc67",
								color: "white"}}}
								
								onClick={()=>{handleClick()}}
								>
							Add New
						</Button>
					</Divider>
				</Grid>
			</Grid>
			<div
				style={{
					marginTop: "30px",
					marginBottom: "30px",
					marginRight: "15px",
					marginLeft: "15px",
				}}>
				<MediaCard />
			</div>
		</div>
	);
};

export default SuplierHome;
