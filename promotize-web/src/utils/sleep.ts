export async function sleep() {
  const time = Math.random() * 1000 + 1000;
  return await new Promise((resolve) => setTimeout(resolve, time));
}
