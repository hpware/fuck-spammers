export async function getSession(token: string) {
  const req = await fetch("https://api.fastmail.com/jmap/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await req.json();
  console.log(res);
}

export async function masterApi(token: string, data: any) {
  const req = await fetch("https://api.fastmail.com/jmap/api/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
