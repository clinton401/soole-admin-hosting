import React, { useState } from 'react';

const InboxContent = () => {
  const [starred, setStarred] = useState(Array(10).fill(false));
  const [expanded, setExpanded] = useState(Array(10).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
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
    name: `Korede Bello`,
    sentence: `This is a sample message number ${i + 1} for testing purposes.`,
    time: `${8 + i}:20AM`,
  }));

  // Paginate messages
  const paginatedMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
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
          <div key={index} className="message d-flex justify-between gap-2">
            <input type="checkbox" className="message-checkbox" />
            <button
              onClick={() => toggleStarred(index)}
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
                {msg.sentence}
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
    </ div>
  );
};

export default InboxContent;
