import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Test from "../../assets/images/slider/Image-01.jpg"
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmMessage from './confirmMessage';

export default function MediaCard() {
  let navigate = useNavigate()

  const UpdateProduct =(id)=>{
    navigate (`/updateProduct/${id}`)
  } 
 
  const [product,setProduct] = React.useState([]);
  const [reFetch,setReFetch] = React.useState(false);

  const getPrducts = async () => {
    await axios
      .get(
        `http://localhost:5000/api/product/getAll`
      )
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err", err.massage)
      });
  };

  useEffect(() => {
    getPrducts();
  },[]);

  useEffect(() => {
    getPrducts();
  },[reFetch]);

  const ViewProduct =(_id)=>{}
  // navigate(
  //   `/product/view/${product._id}`,
  // )

  return (
    <>
    <Grid container spacing={3} sx={{ml:"70px"}}>

     {product.map((product) => (
      <Grid item xs={4}
       direction="row"
       key={product._id} >
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 160 }}
        image={product.productImage}
        title="green iguana"
        onClick={()=>navigate(
          `/product/view/${product._id}`,
        )}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Rs.{product.price}.00
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.color}
        </Typography>
      </CardContent>
      <CardActions sx={{ml:"40px"}}>
        <Button size="small"  onClick={() => UpdateProduct(product._id)}   sx={{marginLeft:"55%" ,color:'#5ebc67'}}>Edit</Button>
        <ConfirmMessage reFetch={reFetch} setReFetch={setReFetch} productId={product._id}/>
      </CardActions>
    </Card>
    </Grid>
     ))}
     </Grid>
    </>
  );
  
}