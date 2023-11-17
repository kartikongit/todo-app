import ListItems from './ItemsList.js'

const Content = ({items, handleCheck, handleTrash}) => {

  return (
    <>
      {items.length?(
        <ListItems items={items} handleCheck={handleCheck} handleTrash={handleTrash} />
      ):(
        <p style={{marginTop:"2rem"}}>You are Done with YOur tAsks</p>
      )}
    </>  
  )
}

export default Content