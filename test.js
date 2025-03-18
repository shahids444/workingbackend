import bcrypt, { hash } from "bcryptjs";

let myfunc = async function (params) {
  let mypass = "shahid";

  let salt = await bcrypt.genSalt(10);

  let hashed = await bcrypt.hash(mypass, salt);

  console.log(hashed);

  let userpass = "shoaib";
  let correctpass = "shahid";

  let result = await bcrypt.compare(correctpass, hashed);
  console.log(result);
};
myfunc();
