import { useEffect, useState } from "react"
import Footer from "../Components/Footer";
import { PriceDisplay } from "./PriceDisplay";


export default function WishlistPage({setWishCount}) {

    const [wishlist, setWishlist] = useState([]);

    useEffect(()=> {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
        setWishCount(storedWishlist.length);
    },[]);

    function removeFromWishlist(id) {
        const updated = wishlist.filter(item => item.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setWishCount(updated.length);
    }
    return (
        <>
        <div className="container mt-5">
            <h3 className="text-center mb-3">My Wishlist ❤️</h3>

            {wishlist.length === 0 ? (
                <p className="text-center">Wishlist is empty!</p>
            ) : (
                <div className="row">
                    {wishlist.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card h-100">
                                <img src={item.imgPath} className="card-img-top" alt={item.bookName} style={{height: "200px", objectFit: "contain"}}/>
                                <div className="card-body text-center mt-auto">
                                    <h5>{item.bookName}</h5>
                                    <p className="text-muted">Written by{item.author}</p>
                                    <PriceDisplay price={item.price} offer={item.offer} />
                                    <button className="btn btn-danger w-100" onClick={()=> removeFromWishlist(item.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        {/* <Footer/> */}
        </>
    )
}