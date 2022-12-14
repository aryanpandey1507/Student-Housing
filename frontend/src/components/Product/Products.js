import './Products.css';
import {useSelector , useDispatch} from 'react-redux';
import {getProduct , clearErrors} from '../../actions/productActions';
import {Fragment , useEffect, useState } from 'react'
import ProductCard from '../Home/ProductCard';
import {useParams} from 'react-router-dom';
import Pagination from 'react-js-pagination' ;
import Slider from '@material-ui/core/Slider';
import {useAlert} from 'react-alert';

import Typography from '@mui/material/Typography';


import Loader from '../layout/Loader/loader';
import MetaData from '../layout/metaData';



function Products() {

    const dispatch = useDispatch();
    const alert = useAlert();


    const [currentPage ,setCurrentPage] = useState(1);
    const [price , setPrice]= useState([0,1000]);
    const [ratings , setRatings] = useState(0)


    
    const {keyword}=useParams();



    const {loading , error ,products , productsCount ,resultPerPage } = useSelector((state)=>state.products);
    console.log(products);
   
    


    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
        
    }
    
    const priceHandler=(event , newPrice)=>{
        setPrice(newPrice)
    }
    


   useEffect(()=>{

    if(error){

        alert.error(error)
        dispatch(clearErrors())
    }

    dispatch(getProduct(keyword ,currentPage , price  , ratings))

   },[dispatch , keyword , currentPage , price  , ratings , alert ,error]) 


    return ( 
        <Fragment>
            {loading ? <Loader />:(
            <Fragment> 
                <MetaData title = "Student Flats" />
                <h2 className='productsHeading'>Flats</h2>

                <div className='products'>
                    {products && 
                       products.map((product)=>(<ProductCard  key = {product._id}  product={product} />))}

                </div>

                <div className='filterBox'>
                 <Typography>Price</Typography>
                 <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay= "auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={12000}
                  />

                

                  <fieldset>
                    <Typography component='legend'>Ratings Above</Typography>
                    <Slider 
                     value={ratings}
                     onChange={(e, newRating)=>{
                        setRatings(newRating)
                     }}
                     aria-labelledby ='continous-slider'
                     min={0}
                     max={5}
                     valueLabelDisplay="auto"
                     />
                  </fieldset>

                </div>

                   
                   
                   <div className='paginationBox'>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText='Next'
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass='page-item'
                      linkClass='page-link' 
                      activeClass='page-item-active'
                      activeLinkClass='pageLinkActive'
                    />
                    
                </div>
             
            </Fragment>)}
        </Fragment>
     );
}

export default Products;