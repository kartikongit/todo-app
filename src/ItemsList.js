import Li from './li.js'

const ListItems = ({items, handleCheck, handleTrash}) => {
  return (
    <ul>
        {items.map((item, key)=>{
          return(
            < Li item={item} handleCheck={handleCheck} handleTrash={handleTrash} key={item.id}/>
          )
          
        })}
    </ul>
  )
}

export default ListItems