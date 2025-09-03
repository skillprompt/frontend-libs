function getSum() {
  const sum = 2 + 3;
  console.log("sum", sum);
  return 2 + 3;
}

const result1 = getSum();

function getSummer(username) {
  // some logic
  if (username === "ram") {
    throw new Error("you can't use this funciton");
  }

  const mySummer = () => {
    const sum = 4 + 5;
    console.log("my summer", sum);
    return sum;
  };

  return mySummer;
}

// currying
getSummer("hari")();

const students = ["ram", "shyam"];

// studnets ram delete
const studentsAfterDeletion = students.filter((student) => {
  return student !== "ram";

  // if (isRam) {
  //   return false;
  // } else {
  //   return true;
  // }
});
console.log("studentsAfterDeletion", studentsAfterDeletion);
