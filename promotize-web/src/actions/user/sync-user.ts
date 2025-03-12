"use server";

interface User {
  clerkId: string;
  name: string;
  email: string;
}

export async function syncUserFirestore(user: User) {
  try {
    await fetch("http://localhost:3333/users/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.log("erro sync (backend)", error);
  }
}
