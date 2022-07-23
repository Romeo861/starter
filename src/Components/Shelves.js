import React from 'react';
import Shelf from './Shelf';


const Shelves = ({books, updateBookShelf}) => {

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf}/>
            <Shelf title="Want To Read" books={wantToRead} updateBookShelf={updateBookShelf}/>
            <Shelf title="Read" books={read} updateBookShelf={updateBookShelf}/>
        </div>
    )

}

export default Shelves;