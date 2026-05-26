const BASE_URL = "http://localhost:5089/orders";

export const getOrders = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createOrder = async (order) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};