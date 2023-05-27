import { Container, Grid, Stack, Typography,Button, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useParams}  from "react-router-dom"
import axios from 'axios'
// import ProductReview from '../components/review'
// import DisplayRating from '../components/DisplayRating'
const ProductView = ({addToCart}) => {
const {id} = useParams()
const [product,setProduct] = useState(null)
const [review,setReview] = useState(null)
const [error,setError] = useState(null)
const [open, setOpen] = React.useState(false);


useEffect(()=>{
axios.get(`/api/product/get/${id}`).then(response =>{
setProduct(response.data.data);
}).catch(error =>{
  setError(error.response.data);
});
},[id])
//get review data
useEffect(()=>{
  axios.get(`http://localhost:5005/api/review/getAll`).then(response =>{
    setReview(response.data.data);
  }).catch(error =>{
    setError(error.response.data);
  });
},[])

const handleDelete = async (id) => {
  try {
  axios.delete(
      `http://localhost:5005/api/review/delete/${id}`
    );
    // console.log(data);
    setOpen(false);
    // toast.success(res.data.message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  } catch (error) {
    setOpen(false);
    // toast.error(error.response.data.message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }
}

console.log("ssss",product)
console.log(review)
  return (
    <Container maxWidth="lg" sx={{mt:5,mb:5}} spacing={5}>
      <Typography align='center' variant='h3'>Product View</Typography>
      <hr color="black"></hr>
        <Grid container sx={{mt:5}} spacing={5}>
          <Grid item xs={12} md={6} >
          <img src={product?.productImage} height={"350px"} alt="productimage"/>
          </Grid>
          <Grid item xs={12} md={6}>
         <Stack >
         {/* <Typography>Product Name</Typography> */}
           <Typography  variant='h4'>{product?.name}</Typography>
         </Stack>
        
         <Stack >
         {/* <Typography>Product Name</Typography> */}
          <Typography sx={{mt:"1rem"}} variant='h6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</Typography>
         </Stack>
         <Button variant='contained' color="error" sx={{mt:"5rem"}} onClick={() => addToCart(product)}>Add Cart</Button>
          </Grid>
         
        </Grid>

    </Container>
    
        
  )
}

export default ProductView
