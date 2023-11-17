

const Footer = ({length}) => {
    const today= new Date();
    
    
    return (
    <footer>
        <h4>Remaining {length===1?"item":"items"}:{length}</h4>
        <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer