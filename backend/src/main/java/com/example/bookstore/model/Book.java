package com.example.bookstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Book {

	@Id
	private int id;
	
	@Column(nullable = false)
	private String bookName;
	
	@Column(nullable = false)
	private String author;
	
	@Column(nullable = false)
	private double price;
	
	@Column(nullable = false)
	private int stock;
	
	@Column(nullable = false)
	private String offer;
	
	private String imgPath;

	public Book() {
		
	}

	public Book(int id, String bookName, String author, double price, int stock, String offer, String imgPath) {
		super();
		this.id = id;
		this.bookName = bookName;
		this.author = author;
		this.price = price;
		this.stock = stock;
		this.offer = offer;
		this.imgPath = imgPath;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getOffer() {
		return offer;
	}

	public void setOffer(String offer) {
		this.offer = offer;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", bookName=" + bookName + ", author=" + author + ", price=" + price + ", stock="
				+ stock + ", offer=" + offer + ", imgPath=" + imgPath + "]";
	}

	
	
}
