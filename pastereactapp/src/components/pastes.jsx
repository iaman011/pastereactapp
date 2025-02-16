import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removefrompastes } from '../redux/pasteSlices.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
// import { formatDate } from 'date-fns';




function pastes() {
  const pastes = useSelector((state) => state.paste.pastes); //state.name.value in pasteSlice.js



  //  console.log(pastes)  to view/log the data in your console
  //used for search in filtering
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  // filteredData is used in search bar as we search we basically do filtering to match the required output
  const filteredData = pastes.filter(
    (pastes) => pastes.Title.toLowerCase().includes(searchTerm.toLowerCase())
    // ..converted the data in lower case to have same value 
  );

  //sendind pasteId is mandatory step to delete
  function handleDelete(pasteId) {
    dispatch(removefrompastes(pasteId));
  }


  return (
    <div>
      <input /*creating search bar */
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />

      {/* creating cards for our filtered data */}
      <div className='flex flex-col gap-5'>
        {//for visibility of data created in pastes
          filteredData.length > 0 && filteredData.map((paste) => {

            return (
              <div className='border' key={paste?._id}>
                {/* having key={paste?._id} says if it is unique key, use case in copy btn */}
                <div>
                  {paste.Title}
                </div>

                <div>
                  {paste.content}
                </div>

                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    {/* redirect to home page and change the UI/functionality of the btn from create my paste to update mt paste */}
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <PencilLine />
                    </Link>

                  </button>

                  <button>
                    {/* <a href={`/pastes/${paste?._id}`}></a> */}
                    {/* we redirect on out ViewPaste Page */}
                    <Link to={`/pastes/${paste?._id}`}>
                      <Eye />
                    </Link>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    <Trash2 />
                  </button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    // navigator.clipboard.writeText(paste?.Title)
                    toast.success("Text copied to clipboard")
                  }}>
                    <Copy />
                  </button>

                  {/* <button onClick={() => {
                    <a href={`/?pasteId=${paste?._id}`}></a>
                    toast.success("Sharing")
                  }}>
                    Share
                  </button> */}

                </div>
                {/* <div> */}
                  {/* {paste.createdAt} */}
                  {/* to display the date */}
                {/* </div> */}

                <div className="gap-x-2 flex ">
                  <Calendar className="text-black" size={20} />
                  {paste.createdAt}
                </div>
              </div>
            );

          }


          )}
      </div>

    </div>
  );
}

export default pastes
