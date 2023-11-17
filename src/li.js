
import { FaTrashAlt } from 'react-icons/fa';

const Li = ({item, handleCheck, handleTrash}) => {
  return (
    <li className="item">
        <input type="checkbox" checked={item.checked} onChange={()=> handleCheck(item.id)}/>
        <label 
        onDoubleClick={()=>{handleCheck(item.id)}}
        style={item.checked?{textDecoration:"line-through"}:null}
        >{item.name}</label>
        <FaTrashAlt 
        role="button"
        tabIndex="0"
        onClick={()=>{handleTrash(item.id)}}
        aria-label={`Delete ${item.name} now`}
        />    
    </li>
  )
}

export default Li