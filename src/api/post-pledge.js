async function postPledge(amount, comment, anonymous, fundraiserId) {
  const token = window.localStorage.getItem("token");

  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      amount: amount,
      comment: comment,
      anonymous: anonymous,
      fundraiser: fundraiserId,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Could not create pledge";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.amount?.[0] ||
      data?.comment?.[0] ||
      data?.fundraiser?.[0] ||
      data?.non_field_errors?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postPledge;