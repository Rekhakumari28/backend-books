const express = require('express')
const app = express()

const {initializeDatabase} = require('./db/db.connect')
const Book = require('./models/books.models')

app.use(express.json())

initializeDatabase()

//q1, 2 = create new book data

async function createBook(newBook){
    try{
        const book = new Book(newBook)
        const saveBook = await book.save()
        return saveBook
    }catch(error){
        console.log(error)
    }    
}

app.post("/books", async (req,res)=>{
    try{
        const savedBooks = await createBook(req.body)
        res.status(201).json({message: "New book created successfully.", book: savedBooks})
    }catch(error){
       res.status(500).json({error: "Failed to create new book data."})
    }
})

//q3 find all books
async function findAllBooks(){
    try{
        const allBooks = await Book.find()
        return allBooks
    }catch(error){
        console.log(error)
    }
}

app.get("/books", async(req,res)=>{
    try{
        const books = await findAllBooks()
        if(books.length !=0){
            res.json(books)
        }else{
            res.status(404).json({error: "No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to get book."})
    }
})

//q4 find book by title
async function findBookByTitle(bookTitle){
    try{
        const book = await Book.findOne({title: bookTitle})
        return book
    }catch(error){
        throw error
    }
}

app.get("/books/:bookTitle", async(req,res)=>{
    try{
        const book = await findBookByTitle(req.params.bookTitle)
        if(book){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to find Book."})
    }
})

//q5 find book by author

async function findBookByAuthor(bookAuthor) {
    try{
        const book = await Book.find({author: bookAuthor})
        return book
    }catch(error){
        console.log(error)
    }    
}

app.get("/books/author/:authorName", async(req, res)=>{
    try{
        const book = await findBookByAuthor(req.params.authorName)
        if(book.length !=0){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to find book."})
    }
})

//q6 find by genre

async function findBookByGenre(genreName) {
    try{
        const book = await Book.find({genre: genreName})
        return book
    }catch(error){
        console.log(error)
    } 
}

app.get("/books/genre/:genreName", async(req,res)=>{
    try{
        const book = await findBookByGenre(req.params.genreName)
        if(book.length !=0){
            res.json(book)
        }else{
            res.status(404).json({error: "No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to find book."})
    }
})

//q7 find by releaseYear
async function findBookByReleaseYear(releaseYear) {
    try{
        const book = await Book.find({publishedYear: releaseYear})
        return book
    }catch(error){
        console.log(error)
    }    
}

app.get('/books/releaseYear/:releaseYear', async(req,res)=>{
    try{
        const book = await findBookByReleaseYear(req.params.releaseYear)
        if(book.length !=0){
            res.json(book)
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to find book."})
    }
} )

//q8 find book by id and update data.

async function updateBookDetails(bookId, dataToUpdate) {
    try{
        const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return book
    }catch(error){
        console.log(error)
    }    
}

app.post("/books/:bookId", async(req,res)=>{
    try{
        const book = await updateBookDetails(req.params.bookId, req.body)
        if(book){
            res.status(200).json({message: "Book data updated successfully.", book: book})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update book."})
    }
})

//q9 find book by title and update data.

async function findBookByTitle(bookTitle, dataToUpdate) {
    try{
        const book = await Book.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new: true})
        return book
    }catch(error){
        console.log(error)
    }
}

app.post("/books/title/:bookTitle", async(req,res)=>{
    try{
        const book = await findBookByTitle(req.params.bookTitle, req.body)
        if(book){
            res.status(200).json({message: "Book data updated successfully.", book: book})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update book."})
    }
})

//q10 delete book data

async function deleteBook(bookId) {
    try{
        const book = await Book.findByIdAndDelete(bookId)
        return book
    }  catch(error){
        console.log(error)
    }  
}

app.delete("/books/:bookId", async(req,res)=>{
    try{
        const book = await deleteBook(req.params.bookId)
        if(book){
            res.status(200).json({message: 'Book deleted successfully.', book: book})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete book."})
    }
})

const PORT =  3000

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT)
})

module.exports = app;