// import React, { Component } from 'react';

// class RegisterForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       errors: {},
//     };
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();

//     fetch("http://127.0.0.1:5000/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error("Error:", error));
//     setFormData({
//       email: "",
//       password: "",
//     });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { email, password, errors } = this.state;

//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={this.handleChange}
//               placeholder="Email"
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={this.handleChange}
//               placeholder="Password"
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//           </div>
//           <div>
//             <button type="submit">Register</button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default RegisterForm;
