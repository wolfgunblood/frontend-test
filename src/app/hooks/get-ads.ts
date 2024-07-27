import { useEffect } from "react";
import { type Marker } from "~/lib/types";
import { useAdStore } from "~/store/useStore";

function useGetAds() {
  const { initializeMarkers } = useAdStore();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads", {
          method: "GET",
        });

        if (!response.ok) throw new Error("Network response not ok");
        const data = (await response.json()) as Marker[];
        // console.log(data);
        initializeMarkers(data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchAds().catch((error) => {
      console.error("Failed to fetch ads", error);
    });
  }, []);
}

export default useGetAds;
