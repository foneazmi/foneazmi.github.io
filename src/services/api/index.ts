const PB_BASE_URL = "https://api.khan.my.id/khan";

const getBio = async () => {
  return fetch(`${PB_BASE_URL}/me`, {
    method: "GET",
  }).then(async (response) => await response.json());
};

export const api = {
  getBio,
};
