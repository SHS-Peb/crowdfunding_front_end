async function postFundraiser(title, description, target, image, isOpen) {
  const token = window.localStorage.getItem("token");

  const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      target: target,
      image: image,
      is_open: isOpen,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Error creating fundraiser";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? JSON.stringify(data) ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postFundraiser;