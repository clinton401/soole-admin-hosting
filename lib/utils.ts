import {Ride} from "../src/app/rides/page"
export function formatDateTime(date: Date) {
  
    const formattedDate = date.toLocaleDateString("en-GB"); 

   
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }); 

    return { formattedDate, formattedTime };
}
export function getValidDate(ride: Ride) {
    
    let rideDate = new Date(ride.date as string);

   
    if (isNaN(rideDate.getTime())) {
        rideDate = new Date(ride.createdAt); 
    }

    return rideDate;
}

export const getPaginationText = (pageSize: number, currentPage: number, total: number) => {
    // const start = (currentPage - 1) * pageSize + 1;
    const start = 1;
    // const end = Math.min(start + pageSize - 1, total);
    const calc = pageSize * currentPage
    const end = calc <= total ? calc : total ;
    
    return `Showing ${start}-${end} of ${total}`;
}

export const formatDate = (date: Date | null | undefined, isFiltered = true) => {
  const now = new Date();

  const validDate = date instanceof Date && !isNaN(date.getTime()) ? date : now;

  const isToday =
    validDate.getDate() === now.getDate() &&
    validDate.getMonth() === now.getMonth() &&
    validDate.getFullYear() === now.getFullYear();

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });


  const time = timeFormatter.format(validDate);
  const day = dateFormatter.format(validDate);

  if (isToday) return time;
  return isFiltered ? day : `${time}, ${day}`;
};



  