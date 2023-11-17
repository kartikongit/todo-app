
const SearchItem = ({search, setSearch}) => {
  return (
    <form className="searchForm">
        <label htmlFor="search">find your item</label>
        <input 
        type="text"
        id="search"
        placeholder="find problems"
        role="find problems"
        value={search}
        onChange={(event)=>{setSearch(event.target.value)}}
         />

    </form>
  )
}

export default SearchItem