import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetdata } from '../Hooks/usegetdata';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductDetail.css';
import { Navigate } from 'react-router-dom';

export default function ProductDetail() {
    const { productId } = useParams(); // Extract product ID from URL parameters
    const { getData, data, isLoading, error } = useGetdata();
    const navigate = useNavigate()

    useEffect(() => {
        async function fetch() {
            await getData(`https://frontend-assessment-server.onrender.com/api/products/${productId}`);
        }
        fetch();
    }, [productId]);

    return (
        <div className="product-detail-container">
            <SkeletonTheme >
                {error ? (
                    <p className="error-message">Error fetching product details: {error}</p>
                ) : (
                    <div className="product-detail-card">
                        <div className="product-image-container">
                            {isLoading ? <Skeleton height={200} /> : <img src={data?.productImage} alt={data?.name} className="product-image" />}
                        </div>
                        <div className="product-info">
                            <h2>{data?.name || <Skeleton />}</h2>
                            <p>{data?.description || <Skeleton count={3} />}</p>
                            <p>Price: ₹{data?.selling_price || <Skeleton width={50} />}</p>
                            <p>Cost Price: ₹{data?.cost_price || <Skeleton width={50} />}</p>
                            <p>Allergen Info: {data?.allergen_info || <Skeleton width={100} />}</p>
                            <p>Cooking Instruction: {data?.cooking_instruction || <Skeleton width={200} />}</p>
                        </div>

                        <div className='middlebutn' ><button className="openmodal" onClick={()=>{navigate("/")}}>Home</button></div>
                    </div>
                )}
            </SkeletonTheme>
        </div>
    );
}
