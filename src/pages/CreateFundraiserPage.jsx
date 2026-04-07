const handleSubmit = (event) => {
  event.preventDefault();
  setError("");

  postFundraiser(
    fundraiserData.title,
    fundraiserData.description,
    fundraiserData.target,
    fundraiserData.image,
    fundraiserData.is_open
  )
    .then((response) => {
      navigate(`/fundraiser/${response.id}`);
    })
    .catch((err) => {
      setError(err.message);
      console.log("create fundraiser error:", err.message);
    });
};