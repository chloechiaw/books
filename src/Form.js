import React, { useState } from "react";
import "./ContributionGraph.css";

export default function Form() {
  const [pages, setPages] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState(null);

  const currDate = new Date().toLocaleDateString();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const getInfo = async () => {
    try {
      const encoded_input = encodeURIComponent(title);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encoded_input}&key=AIzaSyDNv8j61r-wKvp1ry82CmjEco5Yj31gNVw`
        // `https://www.googleapis.com/books/v1/volumes?q=Atomic%20Habits&key=AIzaSyDNv8j61r-wKvp1ry82CmjEco5Yj31gNVw`
      );

      const data = await res.json();
      const pageCount = data.items[0].volumeInfo.pageCount;
      const descriptionText = data.items[0].volumeInfo.description;
      setPages(pageCount);
      setDescription(descriptionText);
      console.log(data);
      console.log(data.items[0].volumeInfo.pageCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="text-left"> Current date: {currDate}</div>
      <div className="mt-2">
        <input
          onChange={handleTitle}
          className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
        <input
          className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="How many pages did you read?"
        />
        <button
          onClick={getInfo}
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Button
        </button>
        <div>Total Pages: {pages}. </div>
        <div>{description}</div>
      </div>
    </div>
  );
}

// take the current date, align it with each of the boxes with the special box tha
