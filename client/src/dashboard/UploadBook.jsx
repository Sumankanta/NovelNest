import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import { toast } from 'react-toastify';

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ]

  const [selectedBookCategory,setSelectedBookCategory] = useState(bookCategories[0])

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  }
  //handle book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    
    const bookObj = {
      bookTitle,authorName,imageURL,category,bookDescription,bookPDFURL
    }

    console.log(bookObj);

    //send data to database
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers:{
        "Content-type":"application/json",
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      toast.success("Book Uploaded Successfully!!!")
      // console.log(data);
      form.reset();
    })
  }

  return (
    <div className='px-4 my-20'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/**1st row */}
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="bookTitle" value="Book Title" />
        </div>
        <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Book name" required />
      </div>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" required />
      </div>
      </div>
      {/**2nd row*/}
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageURL" value="Image URL" />
        </div>
        <TextInput id="imageURL" name="ImageURL" type="text" placeholder="Image URL" required />
      </div>
      {/* <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" required />
      </div> */}
      {/** category */}
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
        <Label htmlFor="inputState" value="Book Category" />
        </div>
        <Select id="categoryName" name="categoryName" className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
          {
            bookCategories.map((option) => <option key={option}>{option}</option>)
          }
        </Select>
      </div>
      </div>
      {/**bookDescription */}
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='bookDescription' value='bookDescription'/>
          <Textarea id="bookDescription" name="bookDescription" placeholder="Write your book description..." required rows={5} />
        </div>
      </div>

      {/** book pdf link */}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookPDFURL" value="Book PDF URL" />
        </div>
        <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Enter Book Link" required />
      </div>

      <Button type="submit" className='mt-5'>Submit</Button>
    </form>
    </div>  
  )
}

export default UploadBook