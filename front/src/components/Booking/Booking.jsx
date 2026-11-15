import { useNavigate } from 'react-router'
import './Booking.css'


function Booking() {
    const navigate = useNavigate()

    return(
        <>
            <section className='booking_button_section'>
                <button className='booking_button_reservation'
                    onClick={() => navigate("/reservation")}>RESERVER</button>
                <button className='booking_button_consulter'>CONSULTER LES RESERVATIONS</button>
            </section>
        </>
    )

}

export default Booking 