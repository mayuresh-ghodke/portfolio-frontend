import { publicAxios } from "./public-helper"

export const viewProjects = async () => {
    const res = await publicAxios.get('/projects');
    return res.data;
};

export const viewEducation = async () => {
    const res = await publicAxios.get("/education");
    return res.data;
}

export const viewSkills = async () => {
    const res = await publicAxios.get("/skills");
    return res.data;
}

// Get all categories
export const viewCategories = async () => {
  const res = await publicAxios.get('/skill/categories');
  return res.data;
};

export const viewAboutInfo = async () => {
  try {
    const res = await publicAxios.get("/about");
    return {
      success: true,
      data: res.data,
      error: null
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return {
        success: false,
        data: null,
        error: "About information is not present."
      };
    }
    return {
      success: false,
      data: null,
      error: "Something went wrong."
    };
  }
};


// Experiences
// Get all experience
export const viewExperience = async () => {
  try {
    const res = await publicAxios.get("/experiences");
    return res.data;
  } 
  catch (err) {
    console.error("Error fetching experience:", err);
    throw new Error("Unable to fetch experience");
  }
};

// Profile
export const viewProfile = async () => {
  try {
    const res = await publicAxios.get("/profile");
    return res.data;
  } 
  catch (err) {
    throw new Error("Unable to fetch profile");
  }
};

