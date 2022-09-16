import axios from "axios";
import "./AddNewCustomer.css";

const AddNewCustomer = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      city: e.target[2].value,
    };

    let stringifiedData = JSON.stringify(formData);
    console.log(stringifiedData)

    let res = await axios.post("http://localhost:8000/user", stringifiedData, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    console.log(res);
    e.target.reset();
  };

  return (
    <div>
      <div className="title">Add new Customer</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full name</label>
          <input placeholder="e.g. Steve Jobs" />
        </div>
        <div>
          <label>Email</label>
          <input placeholder="steve@gmail.com" />
        </div>
        <div>
          <label>City</label>
          <select className="select-city">
            <option value="">
              Select City
            </option>
            <option value="bangalore">Bangalore</option>
            <option value="delhi">Delhi</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
};

export default AddNewCustomer;
