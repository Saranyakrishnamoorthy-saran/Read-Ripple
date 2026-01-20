import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function CartPage({setCartCount}) {

 //const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  //const userId = loggedUser?.id;

  //const cartKey =`cart_${userId}`;
  
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setCartCount(storedCart.reduce((sum, item) => sum + item.quantity,0));
  }, []);

  // useEffect(()=> {
  //   if(!cartKey) return;

  //   const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
  //   setCart(storedCart);

  //   const totalCount = storedCart.reduce((sum,item) => sum + item.quantity,0);
  //   setCartCount(totalCount);
  // },[cartKey])

  function removeItem(id) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    const totalCount = updated.reduce((sum,item) => sum + item.quantity,0);
    //setCartCount(totalCount);
    setCartCount(updated.length);
  }

  function updateQty(id, type) {
    const updated = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity:
            type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    const totalCount = updated.reduce((sum, item) => sum + item.quantity,0);
    setCartCount(totalCount);
  }

  const total = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  return (
    <>
      <div className="container mt-5">
        <h3>Your Cart</h3>
        {cart.length === 0 && (
          <div className="text-center my-5">
            <h5>Your cart is empty!</h5>
            <p>Add some books to get started 📚</p>
          </div>
        )}

        {cart.map((item) => (

          <div
            key={item.id}
            className="border p-3 mb-2 d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{item.bookName}</h5>
              {item.offer > 0 ? (
                <p>
                  <span style={{ textDecoration:"line-through", color: "#6c757d"}}>
                    {" "}
                    ₹{item.originalPrice.toFixed(2)}
                  </span>{" "}
                  <span className="fw-bold text-success">
                    {" "}
                    ₹{item.finalPrice.toFixed(2)}
                  </span>
                  <br />
                  <small className="text-danger">{item.offer}%OFF</small>
                </p>
              ) : (
                <p className="fw-bold text-success">₹{item.originalPrice.toFixed(2)}</p>
              )}

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => updateQty(item.id, "dec")}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => updateQty(item.id, "inc")}
                >
                  +
                </button>
                <br />
              </div>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
            <img
              src={item.imgPath}
              alt={item.bookName}
              style={{ width: "100px", height: "120px", objectFit: "contain" }}
            />
          </div>
        ))}

        {cart.length > 0 && (
          <div className="mt-4">
            <h4>Total : ₹{total.toFixed(2)} </h4>
            <button className="btn btn-primary mt-2">
              Procced to Checkout
            </button>
          </div>
        )}

        {/* <h4>Total : ₹{total.toFixed(2)} </h4> */}
      </div>
      {/* <Footer/> */}
    </>
  );
}
