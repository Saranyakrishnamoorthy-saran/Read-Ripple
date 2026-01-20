import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function AddBook() {

    const[book,setBook] = useState({})

    const myNavigate = useNavigate();

    const {id} = useParams();
        
        useEffect(()=>{
            const user = JSON.parse(sessionStorage.getItem("loggedUser"))
    
            if(!user)  //it returns null when no user logged in
                myNavigate("/login")
            else if(user.role !== "admin") {
                myNavigate("/")
            }
            
        },[])

        useEffect(()=>{
            if(id) {
                axios.get(`http://localhost:8080/api/books/${id}`)
                .then(res=>setBook(res.data))
                .catch(err => alert(err))
            }
        },[id])

        async function addBook(e) {
            e.preventDefault();

            if(id){
                axios.put(`http://localhost:8080/api/books/${id}`,book)
                .then(res=>{
                    alert("Book updated successfully!");
                    myNavigate('/admin-books')
                })
                .catch(err=>alert(err))
            }
            else{
                const res = await axios.get('http://localhost:8080/api/books')
                const existingBooks = res.data;
                const existbook = existingBooks.some((b)=> b.id == book.id);

                if(!existbook) {
                    axios.post('http://localhost:8080/api/books',book)
                    .then(res=> {
                        alert("Book added successfully!")
                        myNavigate('/admin-books')
                    });
                }
                else {
                    alert("Book already exists")
                }
            }
            
        }

    // async function addBook(e){
    //     e.preventDefault();
    //     //console.log(book);

    //     const res = await axios.get('http://localhost:8080/api/books');
    //     const existingBooks = res.data;
    //     //console.log(existingBooks);

    //     const existbook = existingBooks.some((b)=> b.id == book.id)

    //     if(!existbook){
    //         axios.post('http://localhost:8080/api/books', book)
    //         .then(res => alert("Book added successfully..."));
    //         myNavigate('/admin-books');
    //     }
    //     else
    //         alert("Book already exist");
    // }

    function handleChange(e) {
        setBook({...book,[e.target.name]:e.target.value})
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
                   <h3 className="mt-5 text-center">Add Book</h3>
                   <div className="container w-25">
                    <form action="" onSubmit={addBook}>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="id" value={book.id || ""} placeholder="Book ID" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="bookName" value={book.bookName || ""} placeholder="Book Name" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="author" value={book.author} placeholder="Book Author" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="imgPath" value={book.imgPath || ""} placeholder="Book ImageURL" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="price" value={book.price || ""} placeholder="Book Price" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="number" onChange={handleChange} name="stock" value={book.stock || ""} placeholder="Book Stock" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <select name="offer" onChange={handleChange} id="" defaultValue={0} className="form-control">
                                <option disabled value={0}>Select Once</option>
                                <option  value="new">New Arrivals</option>
                                <option  value="10">10%</option>
                                <option  value="5">Offer 5%</option>
                            </select>
                        </div>
                        <input type="submit" value={id? "Update Book" : "Add Book"} className="btn btn-success" />
                        <input type="reset" value="Cancel" className="btn btn-secondary ml-3"/>
                    </form>
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}