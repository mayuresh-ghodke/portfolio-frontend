import { publicAxios } from "./public-helper";
import {
  fallbackProjects,
  fallbackAbout,
  fallbackExperience,
  fallbackEducation,
  fallbackProfile,
  fallbackSkills
} from "../data/data.js";

// ---------------- PROJECTS ----------------
export const viewProjects = async () => {
  try {
    const res = await publicAxios.get("/projects");
    return res.data;
  } catch (err) {
    console.warn("Backend down — using fallback projects");
    return fallbackProjects;
  }
};

// ---------------- ABOUT ----------------
export const viewAboutInfo = async () => {
  try {
    const res = await publicAxios.get("/about");
    return { success: true, data: res.data };
  } catch (err) {
    return { success: true, data: fallbackAbout };
  }
};

// ---------------- PROFILE ----------------
export const viewProfile = async () => {
  try {
    const res = await publicAxios.get("/profile");
    return res.data;
  } catch (err) {
    return fallbackProfile;
  }
};

// ---------------- EXPERIENCE ----------------
export const viewExperience = async () => {
  try {
    const res = await publicAxios.get("/experiences");
    return res.data;
  } catch (err) {
    return fallbackExperience;
  }
};

// ---------------- EDUCATION ----------------
export const viewEducation = async () => {
  try {
    const res = await publicAxios.get("/education");
    return res.data;
  } catch (err) {
    return fallbackEducation;
  }
};

// ---------------- SKILLS ----------------
export const viewSkills = async () => {
  try {
    const res = await publicAxios.get("/skills");
    return res.data;
  } catch (err) {
    return fallbackSkills;
  }
};
