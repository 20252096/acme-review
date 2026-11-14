
export async function onRequestPost({ request }) {
  const data = await request.text();

  console.log("ACME_CTF_RESULT:", data);

  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
