import axios from "axios";

export const handleLogOut = toggleLoggedIn => {
  console.log('hi')
	axios.post("http://localhost:/8001/user/logout")
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))
};
