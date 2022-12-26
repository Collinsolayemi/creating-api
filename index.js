const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

//creating a promise function for the read file
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

//creating a write file sync function
const writePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, (data, err) => {
      if (err) reject("Could not save file sucessfully");
      resolve("success");
    });
  });
};

//using async await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    //how to run many promises at the same time
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const allPromises = await Promise.all([res1, res2, res3]);
    console.log(res.body.message);

    await writePro("dog-img.txt", res.body.message);
    console.log("Dog images savaed successfully");
  } catch (err) {
    console.log(err.message);
  }
};

getDogPic();

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Dog images savaed successfully");
  })
  .catch((err) => console.log(err.message));
*/
