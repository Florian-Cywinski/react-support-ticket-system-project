import { Link } from 'react-router-dom'

function TicketItem({ ticket }) {   // ticket are the ticket data
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>   {/* .toLocaleString to set the way the time and date are displayed */}
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default TicketItem
