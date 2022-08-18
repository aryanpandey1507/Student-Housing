import React ,{Fragment , useEffect} from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/metaData';
import './Home.css';
import { clearErrors , getProduct } from '../../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import Product from './ProductCard.js';
import Loader from '../layout/Loader/loader';
import { useAlert } from 'react-alert';

function Home() {

    const alert = useAlert();
    const dispatch = useDispatch();
    

    const {loading , error , products } = useSelector((state)=>state.products )
    console.log(products)
  

    useEffect(()=>{
       
    if(error)
    {
        alert.error(error);

        dispatch(clearErrors())
    }
    
      
       dispatch(getProduct());
       

    },[dispatch , error, alert ])

    return ( 
        <Fragment>
            {loading ? (<Loader />):(

            <Fragment>
            <MetaData title="Student Housing"/>
            <div className="banner">
                <p>Student Housing </p>
                <h1>We help students to find a complete living experience</h1>

                <a href="#container">
                    <button>
                    Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Housings</h2>

            <div className="container" id="container">
                {products && products.map((product , i)=><Product product={product} key={i}/>)}
                
            </div>
        </Fragment>)}

        </Fragment>
     );
}

export default Home;