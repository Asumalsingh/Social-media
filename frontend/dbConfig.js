const host =
  process.env.NEXT_PUBLIC_USE_CYCLIC === "1"
    ? process.env.NEXT_PUBLIC_BACKEND_HOST
    : "http://localhost:5000";

// console.log(host);

export default host;
