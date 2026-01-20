package com.example.bookstore.service;

import java.util.List;
import java.util.Optional;

import com.example.bookstore.model.Book;

public interface BookService {

	List<Book> getAllBooks();
	
	Optional<Book> getBooks(int id);
	
	Book addNewBook(Book book);
	
	void deleteBook(int id);
}
