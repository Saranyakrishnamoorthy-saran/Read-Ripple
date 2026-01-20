import axios from "axios";
import { useEffect, useState } from "react";

function NewArrivals() {
  //const [newArrivals,setNewArrivals] = useState([])

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => setBooks(res.data));
  }, []);

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center mb-3">New Arrivals</h2>
        <div className="container">
          <div className="row">
            {books
              .filter((book) => book.offer === "new")
              .map((book) => {
                return (
                  <div key={book.id} className="col-md-3 sm-6 mb-4">
                    <div className="card h-100 shadow-sm d-flex flex-column">
                    <img
                      src={book.imgPath}
                      alt={book.bookName}
                      style={{ height: "200px", objectFit: "contain" }}
                      className="card-img-top"
                    />

                    <div className="card-body text-center mt-auto">
                      <h3 className="card-title">{book.bookName}</h3>
                      <p className="text-muted">written by {book.author}</p>
                      <h4 className="text-success">
                        <label className="text-muted">Price: </label>₹
                        {book.price}
                      </h4>
                    </div>
                  </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default NewArrivals;
