import './Header.css' 
import logo from '../../assets/logo.png'


function Header() {
    return(
        <>
            <header className='header'>
                <img src={logo} alt= "Logo de L'Æntre Chats" className='logo-l-aentre-chat'></img>
                <h1 className='l-aentre-chats'>
                    <span>L'Æntre</span>
                    <span>Chats</span>
                </h1>
            </header>
        </>
    )
}

export default Header 