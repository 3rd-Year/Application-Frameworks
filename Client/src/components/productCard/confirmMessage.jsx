import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ConfirmMessage({productId,reFetch,setReFetch}) {
    const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
//   const dleteProduct =(id)=>{
//     navigate ("/supplier")
//   } 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDeleteProduct = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/product/delete/${productId}`,
      )
      setOpen(false);
      setReFetch(!reFetch)
      console.log(res)
      toast.success(res.data.message);
      navigate("/supplier")
     
    } catch (error) {
      console.log(error.message)
    }
  
   }

  return (
    <div>
      <Button variant="text" size="small" sx={{color:'red'}} onClick={handleClickOpen}>
      Remove
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this product in system ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button variant="text" size="small" sx={{color:'red'}} onClick={handleDeleteProduct} autoFocus >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}