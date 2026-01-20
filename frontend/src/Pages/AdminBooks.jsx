import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminBooks() {

    const[books,setBooks] = useState([]);
    const[author,setAuthor] = useState("");
    const[success,setSuccess] = useState(false);

    const myNavigate = useNavigate();
    
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("loggedUser"))

        if(!user)  //it returns null when no user logged in
            myNavigate("/login")
        else if(user.role !== "admin") {
            myNavigate("/")
        }
        
    },[])

    useEffect(()=> {
        axios.get('http://localhost:8080/api/books')
        .then(res => setBooks(res.data))
    }, [])

    // useEffect(()=>{
    //     axios.put(`http://localhost:8080/api/books/${id}`)
    //     .then(res => setBooks(res.data))
    // },[])

    function searchByAuthor() {
        const filteredBooks = books.filter((book) => book.author === author.toLowerCase())
        console.log(filteredBooks)
        setBooks(filteredBooks)
    }

    // function sortByAuthor(author) {
    //     const filteredBooks = books.filter((book) => book.author === author)
    //     console.log(filteredBooks);
    //     setBooks(filteredBooks);
    // }

    function editBook(id) {
       myNavigate(`/add-book/${id}`)
    }

    // function editBook(e) {
    //     // e.preventDefault();
        
    //     axios.put(`http://localhost:8080/api/books/${id}`)
    //     .then(res => setSuccess(true))
    //     .catch(err => alert(err))
    // }

    function deleteBook(id) {
        const filteredBooks = books.filter((book) => book.id !== id)
       
        axios.delete(`http://localhost:8080/api/books/${id}`)
        .then(res => {
            if(res.data.id === id)
                alert("Deleted Successfully...")
        })
        console.log(filteredBooks)
        setBooks(filteredBooks)
    }

    return(
        <>
        
        <div className="container-fluid vh-100 p-0">
            <h3 className="text-center bg-dark p-2 m-0 text-white">Admin Dashboard</h3>
            <div className="row">
                <div className="col-2 vh-100 bg-secondary">
                    <ul className="nav flex-column pt-5">
                        <li className="nav-item">
                            <Link to='/admin-dashboard' className="nav-link text-white" >Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin-books' className="nav-link text-white" >Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin-users' className="nav-link text-white" >Users</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-10">
                    <div className="d-flex justify-content-between">
                        <h3 className="mt-5">All Books</h3>
                        <div className="filter mt-5">
                            {/* <button onClick={()=>sortByAuthor('kalki')}>Kalki</button>
                            <button onClick={()=>sortByAuthor('JK Rowling')}>JK Rowling</button> */}
                            <div className="serach-by-author d-flex mr-3">
                                <input type="text" name="" onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" className="form-control mr-3" />
                                <button onClick={searchByAuthor}>Search</button>
                            </div>
                        </div>
                    </div>

                   <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Book Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book)=>{
                                return <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.author}</td>
                                    {/* <td><img src={book.imgUrl} width="50px"/></td> */}
                                    <td>{book.price}</td>
                                    <td>{book.stock}</td>
                                    <td><button className="btn btn-warning" onClick={() => editBook(book.id)}>Edit</button></td>
                                    <td><button className="btn btn-warning" onClick={() => deleteBook(book.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                   </table>
                   <Link to="/add-book" className="btn btn-info">Add New Book</Link>
                </div>
            </div>
        </div>
        </>
    )
}