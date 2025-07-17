"use server"

export async function fetchPublications(professorId) {
    try {
      
      const publicationData = await fetch(`http://localhost:8080/get-publications/${professorId}`, {
        method: "GET",
      });
      const parsedPublicationData = await publicationData.json();
      console.log(parsedPublicationData)
      return parsedPublicationData;
    } catch (err) {
      console.error("Failed to fetch publications", err);
      return [];
    }
  }
  