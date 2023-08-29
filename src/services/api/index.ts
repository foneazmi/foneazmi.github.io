const BASE = "https://api.khan.my.id";

const getBio = async () => {
  return fetch(`${BASE}/me`, {
    method: "GET",
  }).then(async (response) => await response.json());
};

export const api = {
  getBio,
};
