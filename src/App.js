import React from "react";
import "./App.css";
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import {getAll,update,search} from "./BooksAPI";
import Shelves from "./Components/Shelves";
import Book from "./Components/Book";



function App() {
const [books,setBooks] = useState([]);
const [searchedBooks,setSearchedBooks] = useState([]);
const [searchText,setSearchText]= useState("");
const [booksWithShelf , setbooksWithShelf ] = useState([]);
const [mapById, setmapById] = useState(new Map());

 useEffect(()=>{
  
  getAll().then(items=>{
    setBooks(items)
    setmapById(createMapBooks(items))
   
  });


 },[])

 useEffect(() => {

  let isActive = true;
  if (searchText) {
      search(searchText).then(data => {
          if (data.error) {
              setSearchedBooks([])
          } else {
              if (isActive) {
                setSearchedBooks(data);
              }
          }
      })
  }

  return () => {
      isActive = false;
      setSearchedBooks([])
  }

}, [searchText])
useEffect(() => {

  const searchMap = searchedBooks.map(book => {
    if (mapById.has(book.id)) {
      return mapById.get(book.id);
    } else {
      return book;
    }
  })
  setbooksWithShelf (searchMap);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchedBooks])
const createMapBooks = (books) => {
  const map = new Map();
  books.map(book => map.set(book.id, book));
  return map;
}

 const handleSearch=(searchText)=>
 {
  setSearchText(searchText);
 }
 const updateBookShelf=(updatedBook,shelf)=>
 {

  let isBookExist =false;
    

  const newbooks=books.map((book)=>{
   
     if(book.id===updatedBook.id)
      {
        isBookExist=true;
        update(updatedBook,shelf);
        
        updatedBook.shelf=shelf;
      
        return updatedBook
      }
      else
      {
        
        return book;
      }
    
    
  });
  if(!isBookExist)
        {
          
          update(updatedBook,shelf);
          updatedBook.shelf=shelf;
          newbooks.push(updatedBook);
        
        }
  // console.log(newbooks);
 
   setBooks(newbooks);

 }
//  console.log(books.length);
  return (

<div className="app">
<Router>

<Switch>
  <Route path="/search">
    <div className="search-books">
      <div className="search-books-bar">
        <a class="Button" href="/" button className="close-search">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author or IBN" value={searchText} onChange={(e)=>handleSearch(e.target.value)}// onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
           />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {booksWithShelf.map(b =>{
            return (
             
              <li key={b.id}>
                <Book book={b} updateBookShelf={updateBookShelf} />
              </li>
            )
            }
            )}
          
            
          
        </ol>
      </div>
    </div>
  </Route>

  <Route path="/">
    <div className="list-books">
   

    <div className="list-books-title">
    <h1>MyReads</h1>
</div>
      <div className="list-books-content">
        <Shelves books={books} updateBookShelf={updateBookShelf} />
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  </Route>
</Switch>
</Router>
</div>
  );
}

export default App;
