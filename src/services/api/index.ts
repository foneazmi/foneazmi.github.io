const BASE_URL = "https://api.khan.my.id/khan";

const getBio = async () => {
  return fetch(`${BASE_URL}/me`, {
    method: "GET",
  }).then(async (response) => await response.json());
};

export const api = {
  getBio,
};
