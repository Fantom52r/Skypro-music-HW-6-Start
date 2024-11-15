import { toast } from "react-toastify";

const URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const getData = async () => {
  try {
    const response = await fetch(`${URL}/catalog/track/all`)
      .then((res) => res.json())
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Произошла ошибка " + error);
  }
};

export const getTrackById = async (id) => {
  try {
    const response = await fetch(`${URL}/catalog/track/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await fetch(`${URL}/user/signup/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    toast.error(error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${URL}/user/login/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    toast.error(error);
  }
};

export const getAccessToken = async ({ email, password }) => {
  try {
    const response = await fetch(`${URL}/user/token/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    toast.error(error);
  }
};

export const getAllFavoriteTracks = async () => {
  try {
    const access = localStorage.getItem("accessToken");
    const response = await fetch(`${URL}/catalog/track/favorite/all/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addFavoriteTrack = async (id) => {
  try {
    const access = localStorage.getItem("accessToken");
    const response = await fetch(`${URL}/catalog/track/${id}/favorite/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavoriteTrack = async (id) => {
  try {
    const access = localStorage.getItem("accessToken");
    const response = await fetch(`${URL}/catalog/track/${id}/favorite/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCompilation = async () => {
  try {
    const access = localStorage.getItem("accessToken");
    const response = await fetch(`${URL}/catalog/selection/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getTrackByCompilation = async (id) => {
  try {
    const access = localStorage.getItem("accessToken");
    const response = await fetch(`${URL}/catalog/selection/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
