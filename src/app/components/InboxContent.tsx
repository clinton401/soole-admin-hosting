import React, { useState } from "react";
import Image from "next/image";
import {
  BackIcon,
  DeleteIcon,
  MarkIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  StarStrokeIcon,
} from "./Icons";

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
  let hour = 0;

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

  const messages = Array.from({ length: totalItems }, (_, i) => {
    const time = `${hour % 24}:20AM`;
    hour++;
    return {
      id: i + 1,
      name: `Korede Bello`,
      sentence: `This is a sample message number ${
        i + 1
      } for testing purposes. lorem ipsum dolor sit amet sem non  proident null tempor invidunt ut labore et dolore magna aliqu lorem`,
      time,
    };
  });

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
                <SearchIcon />
              </div>
              <button className="delete-icon-button">
                <DeleteIcon />
              </button>
            </div>

            {paginatedMessages.map((msg, index) => (
              <div
                key={msg.id}
                className="message d-flex justify-between gap-2"
                onClick={() => handleMessageClick(msg)}
              >
                <input
                  type="checkbox"
                  className="message-checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleStarred(index);
                  }}
                  className={`star-button ${starred[index] ? "starred" : ""}`}
                >
                  <StarIcon />
                </button>
                <div className="message-content d-flex gap-3 align-center justify-evenly">
                  <p className="ff-Mabry-Pro-Regular fs-14">{msg.name}</p>
                  <p
                    onClick={() => toggleExpanded(index)}
                    className={`${expanded[index] ? "expanded" : ""} fs-14`}
                  >
                    {expanded[index]
                      ? msg.sentence
                      : msg.sentence.split(" ").slice(0, 10).join(" ") + "..."}
                  </p>
                <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination d-flex justify-between align-center mt-3">
            <div className="pagination-info">
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
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
            <div className="d-flex gap-1 align-center">
              <button
                onClick={() => {
                  setSelectedMessage(null);
                  setExpanded(Array(200).fill(false));
                }}
                className="back-button"
              >
                <BackIcon />
              </button>
              <h2>{selectedMessage.name}</h2>
            </div>

            <div className="d-flex align-center">
              <button className="icon-button">
                <MarkIcon />
              </button>

              <button className="icon-button">
                <StarStrokeIcon />
              </button>
              <button className="icon-button">
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="d-flex ">
            <div className="profile-picture">
              <Image
                src="/Default-Img.png"
                alt="Profile"
                className="profile-img"
                width={20}
                height={20}
              />
            </div>
            <div className="ff-Mabry-Pro fs-16 messages-content">
              <p>{selectedMessage.sentence}</p>
            </div>
          </div>

          <div className="reply-section">
            <div className="reply-container">
              <textarea
                className="reply-input"
                placeholder="Type your reply here..."
                cols={50}
                rows={6}
              ></textarea>
            </div>
          </div>
          <button className="send-button">
            <span>Send</span>
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default InboxContent;
