import './Navbar.css'

// IMPORT IMAGE
import reservationIcon from '../../assets/reservation.png'
import nosChatsIcon from  '../../assets/nos_chats.png'
import menuIcon from '../../assets/menu.png'
import adoptionIcon from '../../assets/adoption.png'
import planningIcon from '../../assets/planning.png'

function Navbar() {
  return(  
    <>
    <section className='navbar-section'>

        <button>
            <img src={ reservationIcon } className='reservation-icon'/>
            RESERVATION
        </button>
      
        <button>

            <img src={ nosChatsIcon } className='nos-chats-icon'/>
            NOS CHATS
        </button>
      
        <button>
            <img src={ menuIcon} className='menu-icon'/>
            MENU
        </button>
      
        <button>
            <img src={ adoptionIcon } className='adoption-icon'/>
            ADOPTION
        </button>
      
        <button>
            <img src={ planningIcon } className='planning-icon'/>
            PLANNING
        </button>

    </section>
    </>
  )
}

export default Navbar