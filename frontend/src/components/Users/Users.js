import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./Users.css";

const Users = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [citySelected, setCitySelected] = useState('none');

  useEffect(() => {
    const fetchCustomerData = async () => {
      const res = await axios.get("http://localhost:8000/users");

      console.log(res);

      setCustomerDetails(res.data);
    };

    fetchCustomerData();
  }, []);

  const cityChangeHandler = (e) => {
    console.log(e.target.value);
    setCitySelected(e.target.value);
  }

  return (
    <div className="users">
      <div className="top">
        <div className="customers">Customers</div>
        <select id='cities' onChange={cityChangeHandler}>
          <option value='none'>Filter by City</option>
          <option value='bangalore'>Bangalore</option>
          <option value='delhi'>Delhi</option>
          <option value='hyderabad'>Hyderabad</option>
          <option value='mumbai'>Mumbai</option>
        </select>
      </div>
      <div className="cards">
        {customerDetails.filter(customerDetail => {
          return citySelected === 'none' || customerDetail.city.toLowerCase() === citySelected;
        }).map((customerDetail) => (
          <Card key={customerDetail.name} customerDetail={customerDetail} />
        ))}
      </div>
    </div>
  );
};

export default Users;
