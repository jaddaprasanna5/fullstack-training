class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

function fakeApi(endpoint) {
  return new Promise((resolve, reject) => {
    let delay = Math.random() * 2000 + 500;

    setTimeout(() => {
      let isFail = Math.random() < 0.4;

      if (isFail) {
        reject(new NetworkError(`Network failed for ${endpoint}`));
      } else {
        if (endpoint === "users") {
          resolve([{ id: 1, name: "Prasanna" }]);
        } else {
          resolve([{ id: 101, item: "Laptop" }]);
        }
      }
    }, delay);
  });
}

async function fetchWithRetry(endpoint, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`Trying ${endpoint} - Attempt ${i}`);
      let result = await fakeApi(endpoint);
      return result;
    } catch (err) {
      console.log(`Attempt ${i} failed: ${err.message}`);

      if (i === maxRetries) {
        throw new Error(`Failed to fetch ${endpoint} after ${maxRetries} attempts`);
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}

async function fetchAll() {
  try {
     let [users, orders] = await Promise.all([
      fetchWithRetry("users"),
      fetchWithRetry("orders")
    ]);

    console.log("All data fetched!");
    console.log("Users:", users);
    console.log("Orders:", orders);

    return { users, orders };
    
  } catch (error) {
    console.log("fetchAll failed:", error.message);
  }
}

fetchAll();