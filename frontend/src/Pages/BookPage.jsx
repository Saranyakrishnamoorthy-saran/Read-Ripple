// import "../App.css";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { PriceDisplay } from "./PriceDisplay";
import { useNavigate } from "react-router-dom";

function BookPage() {
  const [books, setBooks] = useState([]);

  const [cartCount,setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum,item)=> sum + item.quantity, 0);
  })

  const [ wishCount,setWishCount] = useState(
    JSON.parse(localStorage.getItem("wishlist"))?.length || 0
  )

  const myNavigate = useNavigate();
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  function addToWishlist(book) {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = storedWishlist.find(item => item.id === book.id);
    if(exists) {
      alert("Book already in wishlist!")
      return;
    }

    const updatedWishlist = [...storedWishlist,book];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    setWishCount(updatedWishlist.length);
    alert("Added to wishlist!")
  }

  function addToCart(book) {
     const cart = JSON.parse(localStorage.getItem("cart")) || [];

     const originalPrice = parseFloat(book.price) || 0;
     let discount = parseFloat(book.offer) || 0;

     discount = Math.min(Math.max(discount,0),100);

     const discountedAmount = (originalPrice * discount) /100;
     const finalPrice = originalPrice - discountedAmount;

     const existing = cart.find(item => item.id === book.id);

     if(existing) {
      existing.quantity +=1;
     }
     else {
      cart.push ({
        id: book.id,
        bookName:book.bookName,
        imgPath: book.imgPath,
        originalPrice,
        finalPrice,
        offer: discount,
        imgPath:book.imgPath,
        quantity: 1
      });

      
     }

     localStorage.setItem("cart",JSON.stringify(cart));
     const totalCount = cart.reduce((sum, item)=>sum + item.quantity,0);
     setCartCount(totalCount);
     alert("Added to cart!")
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => setBooks(res.data));
  }, []);
  return (
    <>
      <div className="container mt-3">
        <h3 className="text-center mb-3">Our Collections</h3>

         {loggedUser ?.role === "admin" && (
            <div className="d-flex justify-content-end mb-3">
                <a style={{cursor:"pointer", marginRight:"35px"}} className="text-danger fw-semibold" onClick={() => myNavigate("/admin-dashboard")}>Go to Dashboard →</a>
            </div>
        )}
        <div className="container">
          <div className="row">
            {books.map((book) => {
              return (
                <div key={book.id} className="col-md-4 sm-6 mb-4">
                  <div className="card h-100 shadow-sm d-flex flex-column">
                    <img
                      src={book.imgPath}
                      alt={book.bookName}
                      style={{ height: "200px", objectFit:"contain" }}
                      className="card-img-top"
                    />

                    <div className="card-body text-center mt-auto">
                      <h3 className="card-title">{book.bookName}</h3>
                      <p className="text-muted">written by {book.author}</p>
                      <PriceDisplay price={book.price} offer={book.offer} />
                      <div className="d-flex justify-content-cent">
                      <button className="btn btn-primary mr-3" onClick={() => addToCart (book)}>Add to Cart</button>
                      <button className="btn btn-danger" onClick={()=>addToWishlist(book)}>Add to Wishlist ♡</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default BookPage;
