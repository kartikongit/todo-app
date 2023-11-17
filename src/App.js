import { useState, useEffect } from 'react';

import Header from './header.js'
import Content from './content.js';
import Footer from './footer.js';
import AddItems from './AddItems.js';
import SearchItem from './SearchItem.js';
import apiRequest from './apiRequest.js';



function App() {

  const json_url='https://tension-6etj.onrender.com/items';

  const array=[
    { id: 1, name: 'Apple', checked: false },
    { id: 2, name: 'Banana', checked: true },
    { id: 3, name: 'Orange', checked: false },
    { id: 4, name: 'Grapes', checked: true },
    { id: 5, name: 'strawberries', checked: true}
  ]

  const [items, setItems]= useState(array)


  const [newItem, setNewItem]= useState("");

  const [search, setSearch]=useState('');

  const [fetchError, setFetchError]= useState(null);

  const [isLoading, setIsLoading]= useState(true)


  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const response= await fetch(json_url);
        if(!response.ok) throw Error("well the endpoint does not exist")
        const fetchedItems= await response.json();
        console.log(fetchedItems)
        setItems(fetchedItems)
        setFetchError(null)
      }
      catch(error){
        console.log(error.stack)
        setFetchError(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }

    setTimeout(()=>{
    (async()=> await fetchData())()
    }, 2000)

  },[])


  const handleCheck= async (id)=>{
    const feedArray= items.map((item)=>{ return item.id===id?{...item,checked:!item.checked}:item})
    setItems(feedArray)

    const patchedItem= feedArray.filter((item)=>{return item.id===id});

    const updatedOption={
      method:"PATCH",
      headers:{
        'content-type':"application/json"
      },
      body: JSON.stringify({checked: patchedItem[0].checked})
    }

    const patchUrl= `${json_url}/${id}`

    const message= await apiRequest(patchUrl, updatedOption)

    if(message) setFetchError(message)

  }

 async function handleTrash(id){
    const deletedArray= items.filter((item)=>{ return !(item.id===id)})
    setItems(deletedArray)

    const trashOptions= { method:"DELETE"}
    const deleteurl=`${json_url}/${id}`

    const message= await apiRequest(deleteurl, trashOptions);
    if(message) setFetchError(message)
  }

 async function addItem(newItem){
    const id= items.length? items[items.length-1].id+1:1;
    const myNewItem={
      id,
      name:newItem,
      checked:false
    }
    const newItemsArray= [...items,myNewItem];

    setItems(newItemsArray);

    const postOption={
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(myNewItem)
    }

    const result = await apiRequest(json_url, postOption);
    if(result) setFetchError(result);

  }

  function handleSubmit(event){
    event.preventDefault();
    if(!newItem)return;
    console.log("item has been added");

    addItem(newItem)

    setNewItem("")

    console.log(newItem,"hahaa hahaha")
  }

 
  return (
    <div className="App">
      <Header />
      <AddItems newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <SearchItem 
      search={search}
      setSearch={setSearch}
      />
      <main>
        {isLoading &&<p>things are still loading in</p>}
        {fetchError && <p style={{color:"red", fontSize:"12px"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter((object)=>{ return object.name.toLowerCase().includes(search.toLowerCase())})} 
          handleCheck={handleCheck}
          handleTrash={handleTrash} 
        />}
      </main>
      <Footer
      length={items.length}
      />
    </div>
  );
}

export default App;
