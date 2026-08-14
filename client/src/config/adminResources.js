/**
 * Declarative config powering the generic admin CRUD screens.
 * Adding a new manageable resource means adding an entry here —
 * no new page/component required (see pages/admin/ResourceManager.jsx).
 */
export const resources = {
  courses: {
    label: "Courses",
    endpoint: "/courses",
    titleField: "name",
    columns: ["name", "duration", "format", "fee"],
    fields: [
      { name: "name", label: "Course Name", type: "text", required: true },
      { name: "slug", label: "Slug (unique, e.g. cpc-certification)", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "duration", label: "Duration", type: "text", required: true },
      { name: "format", label: "Format", type: "text", required: true },
      { name: "fee", label: "Fee", type: "text" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "whatIsIt", label: "\"What is it?\" Explainer", type: "textarea" },
      { name: "whoIsItFor", label: "Who Is It For (comma separated)", type: "tags" },
      { name: "roles", label: "Role Responsibilities (comma separated)", type: "tags" },
      { name: "skills", label: "Skills (comma separated)", type: "tags" },
      { name: "careerOpportunities", label: "Career Opportunities (comma separated)", type: "tags" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "order", label: "Order", type: "number" }
    ]
  },
  branches: {
    label: "Branches",
    endpoint: "/branches",
    titleField: "name",
    columns: ["name", "city", "state", "phone"],
    fields: [
      { name: "name", label: "Branch Name", type: "text", required: true },
      { name: "slug", label: "Slug (unique, e.g. chennai)", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "heroImage", label: "Hero Image URL", type: "url" },
      { name: "images", label: "Gallery Image URLs (comma separated)", type: "tags" },
      { name: "facilities", label: "Facilities (comma separated)", type: "tags" },
      { name: "courses", label: "Courses Offered", type: "multiselect", refResource: "courses" },
      { name: "trainers", label: "Trainers", type: "multiselect", refResource: "trainers" },
      { name: "mapEmbedUrl", label: "Google Maps Embed URL", type: "url" },
      { name: "isFlagship", label: "Flagship Branch", type: "checkbox" },
      { name: "order", label: "Order", type: "number" }
    ]
  },
  trainers: {
    label: "Trainers",
    endpoint: "/trainers",
    titleField: "name",
    columns: ["name", "designation", "experienceYears"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
      { name: "image", label: "Photo URL", type: "url" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "expertise", label: "Expertise (comma separated)", type: "tags" },
      { name: "experienceYears", label: "Years of Experience", type: "number" },
      { name: "order", label: "Order", type: "number" }
    ]
  },
  testimonials: {
    label: "Testimonials",
    endpoint: "/testimonials",
    titleField: "name",
    columns: ["name", "role", "company", "rating"],
    fields: [
      { name: "name", label: "Student Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "photo", label: "Photo URL", type: "url" },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "beforeRole", label: "Before Role", type: "text" },
      { name: "afterRole", label: "After Role", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "order", label: "Order", type: "number" }
    ]
  },
  gallery: {
    label: "Gallery",
    endpoint: "/gallery",
    titleField: "title",
    columns: ["title", "category", "type"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["classrooms", "students", "trainers", "events", "workshops", "branches", "certifications"],
        required: true
      },
      { name: "type", label: "Type", type: "select", options: ["image", "video"] },
      { name: "url", label: "Media URL", type: "url", required: true },
      { name: "order", label: "Order", type: "number" }
    ]
  },
  "placement-stats": {
    label: "Placement Stats",
    endpoint: "/placement-stats",
    titleField: "label",
    columns: ["label", "value"],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value (e.g. 5000+)", type: "text", required: true },
      { name: "order", label: "Order", type: "number" }
    ]
  }
};

export const resourceKeys = Object.keys(resources);
