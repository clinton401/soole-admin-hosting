import React from 'react'

type Props = {
    isVisible?: boolean;
}



const Searchbar = ({ isVisible = true }: Props) => {
    if (!isVisible) return null;
    
  return (
    <div>Searchbar</div>
  )
}

export default Searchbar;