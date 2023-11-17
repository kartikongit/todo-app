import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddItems = ({newItem, setNewItem, handleSubmit}) => {


  const inputRef= useRef();

  return (
    <form className="addForm" onSubmit={(event)=>{handleSubmit(event)}}>
        <label 
        htmlFor="addItem" >Add Item
        </label>

        <input 
        type="text" 
        autoFocus
        ref={inputRef}
        id='addItem'
        placeholder='Add Problems'
        // required
        value={newItem}
        onChange={(event)=>{setNewItem(event.target.value)}}

        />

        <button
        type="submit"
        aria-label="Add Item"
        onClick={()=>{inputRef.current.focus()}}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItems