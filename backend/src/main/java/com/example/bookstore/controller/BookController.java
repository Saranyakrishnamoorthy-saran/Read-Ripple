package com.example.bookstore.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;

@RestController
@CrossOrigin(origins= "http://localhost:5173")
public class BookController {


	@Autowired
	private BookService bookService;

	// View Book List
	@GetMapping ("/api/books")
	public List<Book> apiForGetAllBooks(){
		return bookService.getAllBooks();
		
	}
	
	// Search Book
	@GetMapping ("/api/books/{id}")
	public ResponseEntity<Book> apiForSearchBook(@PathVariable("id") int id)
	{
		Optional<Book> opt = bookService.getBooks(id);
		if(opt.isPresent()) {
			return ResponseEntity.ok().body(opt.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// Add New Book
	@PostMapping ("/api/books")
	public ResponseEntity<Book> apiForAddNewBook(@RequestBody Book book)
	{
		Optional<Book> opt = bookService.getBooks(book.getId());
		
		if(opt.isEmpty()) {
			Book savedObj = bookService.addNewBook(book);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedObj);
		}
		else {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
	
	// Update Book
	@PutMapping("/api/books/{id}")
	public ResponseEntity<Book> apiForUpdateBook(@PathVariable("id") int id, @RequestBody Book book)
	{
		Optional<Book> opt = bookService.getBooks(id);
		
		if(opt.isPresent()) {
			book.setId(id);
			Book updated =  bookService.addNewBook(book);
			return ResponseEntity.ok().body(updated);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// Delete Book
	@DeleteMapping("/api/books/{id}")
	public ResponseEntity<Book> apiForDeleteBook(@PathVariable("id") int id)
	{
		Optional<Book> opt = bookService.getBooks(id);
		
		if(opt.isPresent()) {
			bookService.deleteBook(id);
			return ResponseEntity.ok(opt.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
