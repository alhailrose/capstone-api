import { supabase } from "../config/database.js";
import response from "../utils/response.js";

export const getUsers = async (req, res) => {
  const { data, error } = await supabase
    .from("profiler")
    .select("name, email, birthdate, sex, height, weight");
  if (error) return response(500, {}, error.message, res);
  response(200, data, "SUCCESS", res);
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const { data, error } = await supabase
    .from("profiler")
    .select("name, email, birthdate, sex, height, weight")
    .eq("email", email);
  if (error) return response(500, {}, error.message, res);
  if (data.length === 0)
    return response(404, {}, `User with email '${email}' not found`, res);
  response(200, data[0], `Specific data by email '${email}'`, res);
};

export const registerUser = async (req, res) => {
  const { name, email, password, birthdate, sex, height, weight } = req.body;
  const { data, error } = await supabase
    .from("profiler")
    .insert([{ name, email, password, birthdate, sex, height, weight }]);
  if (error) return response(500, {}, error.message, res);
  response(200, { isSuccess: true, email }, "Data Added Successfully", res);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from("profiler")
    .select("email, password")
    .eq("email", email);
  if (error) return response(500, {}, "Error during login", res);
  if (data.length === 0 || data[0].password !== password) {
    return response(
      200,
      { success: false },
      "Failed login: Incorrect email or password",
      res
    );
  }
  response(200, { success: true }, "Login successful", res);
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, password, birthdate, sex, height, weight } = req.body;

  // Melakukan update pada database
  const { data, error } = await supabase
    .from("profiler")
    .update({ name, password, birthdate, sex, height, weight })
    .eq("email", email)
    .select(); // Menambahkan .select() untuk memastikan data yang diperbarui dikembalikan

  if (error) {
    return response(500, {}, error.message, res);
  }

  // Cek apakah data berhasil diperbarui, jika tidak ada data yang dikembalikan berarti user tidak ditemukan
  if (!data || data.length === 0) {
    return response(404, {}, "User not found", res);
  }

  // Berikan respons sukses
  response(200, { isSuccess: true }, "Data Updated Successfully", res);
};

export const deleteUser = async (req, res) => {
  response(200, { isSuccess: true }, "Data updated successfully", res);
  const { email } = req.body;
  const { data, error } = await supabase
    .from("profiler")
    .delete()
    .eq("email", email);
  if (error) return response(500, {}, error.message, res);
  if (data.length === 0) return response(404, {}, "User not found", res);
  response(200, { isDeleted: true }, "Data Deleted Successfully", res);
};
