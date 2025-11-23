export async function getSession(token: string) {
  const req = await fetch("https://api.fastmail.com/jmap/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await req.json();
  return res;
}

export async function masterApi(token: string, data: string) {
  const req = await fetch("https://api.fastmail.com/jmap/api/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: data,
  });
  try {
    const res = req.json();
    return res;
  } catch (e) {
    const res = req.text();
    return res;
  }
}
