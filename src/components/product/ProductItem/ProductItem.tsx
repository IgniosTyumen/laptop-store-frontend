import React, {FC, useEffect, useState} from 'react';
import {Button, Grid, ImageList, ImageListItem, ListItem, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './productItem.scss'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useActions} from "../../../hooks/useActions";

type ProductType = {
    id: string,
    name: string;
    picture: string;
    price: number
}


interface ProductsProps{
    product: ProductType
}


const ProductItem: FC<ProductsProps> = ({product}) => {
    let navigate = useNavigate()
    const {fetchDeleteProduct} = useActions()
    const [deleteFetch, setDeleteFetch] = useState<any>('')

    function handleClick() {
        navigate({
            pathname: 'detail',
            search: product.id
        })
    };

    async function productDelete() {
        await fetchDeleteProduct(product.id)
    }

    useEffect(() => {

    },[])

    return (
        <>
            <Grid className='card'>
                <ImageList onClick={handleClick} sx={{ width: 300, height: 300, padding: '10px'}} cols={3} rowHeight={164}>
                    <ImageListItem sx={{width: '300%'}}>
                        {product.id &&
                            <img
                                src={`${`http://localhost:5000/`+product.picture}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${`http://localhost:5000/`+product.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                            />
                        }
                    </ImageListItem>
                </ImageList>
                <div className='card__title'>
                    <h4>{product.price} p</h4>
                    <div>{product.name}</div>
                </div>
                <Stack id={product.id} onClick={() => productDelete()} direction="row" spacing={2}>
                    <Button  variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Stack>
            </Grid>
        </>

    );
};


export default ProductItem;