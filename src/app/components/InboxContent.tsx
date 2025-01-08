import React, { useState } from 'react';
import Image from 'next/image';

type Message = {
    id: number;
    name: string;
    sentence: string;
    time: string;
  };

const InboxContent = () => {
  const [starred, setStarred] = useState(Array(200).fill(false));
  const [expanded, setExpanded] = useState(Array(200).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const itemsPerPage = 10;
  const totalItems = 200;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleStarred = (index: number) => {
    const newStarred = [...starred];
    newStarred[index] = !newStarred[index];
    setStarred(newStarred);
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const messages = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Korede Bello`,
    sentence: `This is a sample message number ${i + 1} for testing purposes. lorem ipsum dolor sit amet sem non  proident null tempor invidunt ut labore et dolore magna aliqu lorem`,
    time: `${8 + i}:20AM`,
  }));

  // Paginate messages
  const paginatedMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
  };

  return (
    <div>
              {!selectedMessage ? (
        <>
      <div className="inbox-content">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search mail"
              className="search-input"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              className="search-icon"
              stroke="currentColor"
            >
              <g opacity="0.5">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.69366 12.4863C12.4235 11.3261 13.696 8.17265 12.5358 5.44282C11.3757 2.71298 8.22221 1.4405 5.49237 2.60065C2.76253 3.7608 1.49005 6.91426 2.6502 9.6441C3.81036 12.3739 6.96382 13.6464 9.69366 12.4863Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.3904 11.3407L15.5557 15.5066"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <button className="delete-icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3 6h18M6 6v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6m-8 4v6" />
            </svg>
          </button>
        </div>

        {paginatedMessages.map((msg, index) => (
          <div key={msg.id} className="message d-flex justify-between gap-2" onClick={() => handleMessageClick(msg)}>
            <input type="checkbox" className="message-checkbox"  onClick={(e) => {
            e.stopPropagation()
            }} />
            <button
            onClick={(event) => {
            event.stopPropagation();
            toggleStarred(index);
            }}
              className={`star-button ${starred[index] ? 'starred' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
            <div className="message-content d-flex gap-4 align-center justify-evenly">
              <strong className="d-flex justify-left">{msg.name}</strong>
              <p
        onClick={() => toggleExpanded(index)}
        className={expanded[index] ? 'expanded' : ''}
      >
        {expanded[index]
          ? msg.sentence
          : msg.sentence.split(' ').slice(0, 10).join(' ') + '...'}
      </p>
            </div>
            <span className="message-time">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="pagination d-flex justify-between align-center mt-3">
        <div className="pagination-info">
          Showing{' '}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            totalItems
          )}-{Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
          {totalItems}
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
      </>
      ) : (
        <div className="message-detail">
          <div className="message-button-wrapper">

<div className='d-flex gap-1 align-center'>
          <button onClick={() => {
            setSelectedMessage(null);
            setExpanded(Array(200).fill(false))
          }}
           className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <rect y="0.5" width="24" height="24" rx="5" fill="#F5F5F5"/>
  <g opacity="0.8">
    <path d="M15.41 16.9064L10.83 12.5L15.41 8.09359L14 6.73999L8 12.5L14 18.26L15.41 16.9064Z" fill="#202224"/>
  </g>
</svg>
          </button>
          <h2>{selectedMessage.name}</h2>

</div>

              <div className='d-flex align-center'>

                <button className='icon-button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
  <path d="M6.1209 12.5173L0.420898 6.81731L1.8459 5.39231L6.1209 9.66731L15.2959 0.49231L16.7209 1.91731L6.1209 12.5173Z" fill="#1C1B1F"/>
</svg>
                </button>

<button className='icon-button'>
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M9.08485 1.79716L11.3155 6.2165L15.6089 6.64183C15.8176 6.65917 15.9971 6.79633 16.0687 6.99313C16.1403 7.18993 16.0909 7.41041 15.9422 7.55783L12.4089 11.0598L13.7189 15.8185C13.7736 16.0247 13.7023 16.2438 13.5367 16.3783C13.3712 16.5128 13.1421 16.5377 12.9515 16.4418L8.59885 14.2865L4.25218 16.4392C4.0616 16.535 3.83253 16.5101 3.66696 16.3756C3.50138 16.2411 3.4301 16.022 3.48485 15.8158L4.79485 11.0572L1.25885 7.55516C1.1101 7.40774 1.0607 7.18726 1.13231 6.99047C1.20393 6.79367 1.38348 6.65651 1.59218 6.63916L5.88552 6.21383L8.11285 1.79716C8.20625 1.61475 8.39392 1.5 8.59885 1.5C8.80378 1.5 8.99145 1.61475 9.08485 1.79716Z" stroke="#202224" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3 6h18M6 6v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6m-8 4v6" />
            </svg>
          </button>
          </div>

</div>

    <div className='d-flex '>
<div className="profile-picture">
              <Image
                src="/profilePic.png"
                alt="Profile"
                className="profile-img"
                width={20}
                height={20}
              />
            </div>
            <div className='ff-Mabry-Pro fs-16'>

          <p>{selectedMessage.sentence}</p>
            </div>

          </div>
          
                {/* Profile Picture and Reply Section */}
                <div className="reply-section">

            <div className="reply-container">
              <textarea
                className="reply-input"
                placeholder="Type your reply here..."
              ></textarea>
            </div>
                </div>
              <button className="send-button">
                <span>Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>

        </div>
      )}

    </ div>
  );
};

export default InboxContent;
