package com.example.bookstore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService{
	
	@Autowired
	private BookRepository bookRepo;

	@Override
	public List<Book> getAllBooks() {
		
		return bookRepo.findAll();
	}

	@Override
	public Optional<Book> getBooks(int id) {
		
		return bookRepo.findById(id);
	}

	@Override
	public Book addNewBook(Book book) {
		
		return bookRepo.save(book);
	}

	@Override
	public void deleteBook(int id) {
		bookRepo.deleteById(id);
	}

}
