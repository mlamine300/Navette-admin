/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase, { supabaseUrl } from "./supabase";

export async function supabaseLogin({ email, password }:{ email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("email or password used does not exist");
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
// export async function signUpApi({ email, password, fullName }) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         fullName,
//         avatar: "",
//       },
//     },
//   });
//   if (error) throw new Error(error.message);
//   console.log(data);
//   return data;
// }

export async function UpdateUser({ fullName, password, avatar }:{ fullName:string, password:string, avatar:any}) {
  let avatarValue = "";
  if (avatar) {
    const avatarName = `${Math.random()}-${avatar?.name}`.replaceAll("/", "");
    const { error: StorageError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);

    // const {
    //   data: newUser,
    //   error: errorUserDataAvatar,
    //   isLoading: isUpdating,
    // } = supabase.auth.updateUser(DataTochange);
    //storage/v1/object/public/avatars/WhatsApp%20Image%202023-12-25%20at%2010.55.38.jpeg
    avatarValue = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

    if (StorageError) throw new Error("64" + StorageError.message);
  }
  let DataTochange={};
  if (password)  DataTochange = { password };
  if (fullName)  DataTochange = { data: { fullName, avatar: avatarValue } };

  const {
    data: user,
    error: errorUserData,
  } = await supabase.auth.updateUser(DataTochange);
  if (errorUserData) throw new Error(errorUserData.message);

  return { user };
}