import { useState, useEffect } from "react";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getFundraiser(fundraiserId)
      .then((data) => {
        setFundraiser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [fundraiserId]);

  return { fundraiser, isLoading, error };
}