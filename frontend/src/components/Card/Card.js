import './Card.css';


const Card = ({customerDetail}) => {
  return(
    <div className="main">
      <div className="head">
        {customerDetail.cityImageURL !== ''
          ? <img src={customerDetail.cityImageURL} alt='city' />
          : <div className='no-city'>No City</div>
        }
      </div>
      <div className="body">
        <div className="name">
          {customerDetail.name}
        </div>
        <div className="email">
          {customerDetail.email}
        </div>
        <div className="city">
          {customerDetail.city}
        </div>
      </div>
    </div>
  )
}

export default Card;