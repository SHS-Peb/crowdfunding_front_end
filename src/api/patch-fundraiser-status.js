async function patchFundraiserStatus(fundraiserId, status) {
  const token = window.localStorage.getItem("token");

  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      status: status,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Could not update fundraiser status";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.status?.[0] ||
      data?.non_field_errors?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }

  return await response.json();
}

export default patchFundraiserStatus;