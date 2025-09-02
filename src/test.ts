// Generic

function getSum(n1, n2) {
  return n1 + n2;
}

const name: string = "ram";

function logData<T>(data: T) {
  if (typeof data === "string") {
    console.log("i am string", data);
  }
  if (typeof data === "object") {
    console.log("i am an object", JSON.stringify(data));
  }
}

logData<{ name: string }>({ name: "ram" });
