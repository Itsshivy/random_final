export type Employee = {
  id: string;
  password: string;
  name: string;
  role: string;
  faceData: string;
};

export const EMPLOYEES: Employee[] = [
  {
    id: "EMP001",
    password: "pass123",
    name: "John Doe",
    role: "user",
    faceData: "base64_encoded_face_image_1" // Mock face data
  },
  {
    id: "EMP002",
    password: "admin123",
    name: "Admin",
    role: "admin",
    faceData: "base64_encoded_face_image_2"
  }
];