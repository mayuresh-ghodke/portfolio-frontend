// src/admin-components/admin-service.js
import { redirect } from "react-router-dom";
import { myAxios } from "./admin-helper";

const BASE_URL = "http://localhost:8030/admin";

/* ----------------------------------------------------------------------------
                                 CONTACT MESSAGES
-------------------------------------------------------------------------------*/
 
export const contactMessage = async () => {
    try {
        const response = await myAxios.get(`${BASE_URL}/view-contacts`);
        return response.data;
    } 
    catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Response Status:", error.response.status);
            console.error("Response Headers:", error.response.headers);
        } 
        else if (error.request) {
            console.error("Request Data:", error.request);
        } 
        else {
            console.error("Error Message:", error.message);
        }
        console.log("Response is empty array...");
        return [];
    }
};

/* ----------------------------------------------------------------------------
                                 SKILLS
-------------------------------------------------------------------------------*/
// --------------------------- CATEGORY APIs ---------------------------

// Add new category
export const saveCategory = async (category) => {
  return await myAxios.post(`${BASE_URL}/skill/categories/save`, category);
};

// Get all categories
export const viewCategories = async () => {
  const res = await myAxios.get(`${BASE_URL}/skill/categories`);
  return res.data;
};

// ---------------------------- SKILL APIs -----------------------------

// get all skills
export const viewSkills = async () => {
  const res = await myAxios.get(`${BASE_URL}/skill/all`);
  return res.data;
};

// add skill WITH categoryId
export const saveSkill = async (skill, categoryId) => {
  return await myAxios.post(
    `${BASE_URL}/skill/save?categoryId=${categoryId}`,
    skill
  );
};

// update skill WITH categoryId
export const updateSkill = async (skillId, skillData, categoryId) => {
  const res = await myAxios.put(
    `${BASE_URL}/skill/update/${skillId}?categoryId=${categoryId}`,
    skillData
  );
  return res.data;
};

// delete skill
export const deleteSkill = async (skillId) => {
  const res = await myAxios.delete(`${BASE_URL}/skill/delete/${skillId}`);
  return res.data;
};

/* ----------------------------------------------------------------------------
                                 EDUCATION
-------------------------------------------------------------------------------*/

// get all education
export const viewAllEducation =  async () => {
  const res = await myAxios.get(`${BASE_URL}/education/get/all`);
  console.log("Education data: ", res.data)
  return res.data;
}; 

// update education
export const updateEducation = async (eduId, educationData) => {
  try {
    const res = await myAxios.put(`${BASE_URL}/education/update/${eduId}`, educationData);
    return res.data;
  } catch (err) {
    console.error("Error updating skill:", err);
    throw new Error("Error updating skill");
  }
};

// delete education
export const deleteEducation = async (id) => {
  try {
    const res = await myAxios.delete(`${BASE_URL}/education/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting skill:", err);
    throw new Error("Error deleting skill");
  }
};

/* ----------------------------------------------------------------------------
                                 ABOUT INFOs
-------------------------------------------------------------------------------*/

export const viewAboutInfo = async () => {
  try {
    const res = await myAxios.get(`${BASE_URL}/about/get`);
    return { success: true, data: res.data };
  } 
  catch (err) {
    // If backend sends "About information is not present."
    const message = err.response?.data || "Something went wrong";

    return { success: false, error: message };
  }
};

// delete aboutInfo =>
export const deleteAboutInfo = async () => {
  try{

    const result = await myAxios.delete(`${BASE_URL}/about/delete`);
    return result.data;
  }
  catch(err){
    console.log("Error: ", err);
    throw new Error("Error while deleting about information.");
  }
};

/* ----------------------------------------------------------------------------
                                 LOGOUT
-------------------------------------------------------------------------------*/

export const handleLogout = async () => {
  try {
    await myAxios.post("/logout", {}, { withCredentials: true });

  } catch (error) {
    console.log("Backend logout error (ignored):", error);
  }

  sessionStorage.removeItem("logged_in");
  return true;
};

/* ----------------------------------------------------------------------------
                                 PROJECTS
-------------------------------------------------------------------------------*/

export const viewProjects = async () => {
  const res = await myAxios.get(`${BASE_URL}/project/get/all`);
  return res.data;
};

export const deleteProject = async (projectId) => {
  const res = await myAxios.delete(`${BASE_URL}/project/delete/${projectId}`);
  return res.data;
}

export const updateProject = async (projectId, projectData) => {
  try {
    const res = await myAxios.put(`${BASE_URL}/project/update/${projectId}`, projectData);
    return res.data;
  } 
  catch (err) {
    console.error("Error updating project:", err);
    throw new Error("Error updating project");
  }
};


/* ----------------------------------------------------------------------------
                                 EXPERIENCE
-------------------------------------------------------------------------------*/
// Get all experience
export const viewExperience = async () => {
  try {
    const res = await myAxios.get(`${BASE_URL}/experience/get/all`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching experience:", err);
    throw new Error("Unable to fetch experience");
  }
};

// Get experience by ID
export const viewExperienceById = async (expId) => {
  try {
    const res = await myAxios.get(`${BASE_URL}/experience/get/${expId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching experience by ID:", err);
    throw new Error("Unable to fetch experience");
  }
};

// Save experience (POST)
export const saveExperience = async (experienceData) => {
  try {
    const res = await myAxios.post(`${BASE_URL}/experience/save`, experienceData);
    return res.data;
  } catch (err) {
    console.error("Error saving experience:", err);
    throw new Error("Unable to save experience");
  }
};

// Update experience
export const updateExperience = async (expId, experienceData) => {
  try {
    const res = await myAxios.put(`${BASE_URL}/experience/update/${expId}`, experienceData);
    return res.data;
  } 
  catch (err) {
    console.error("Error updating experience:", err);
    throw new Error("Error updating experience");
  }
};

// Delete experience
export const deleteExperience = async (expId) => {
  try {
    const res = await myAxios.delete(`${BASE_URL}/experience/delete/${expId}`);
    return res.data;
  } 
  catch (err) {
    console.error("Error deleting experience:", err);
    throw new Error("Error deleting experience");
  }
};


/* ----------------------------------------------------------------------------
                                PROFILE
-------------------------------------------------------------------------------*/
export const getProfile = async () => {
  const res = await myAxios.get(`${BASE_URL}/profile/get`);
  return res.data;
};


export const updateProfile = (data) => {
    return myAxios.put(`${BASE_URL}/profile/update`, data);
};

export const deleteProfile = () => {
    return myAxios.delete(`${BASE_URL}/profile/delete`);
};