"use server"

export async function fetchPublications(authorId, access) {
    try {
      
      const publicationData = await fetch(`http://localhost:8080/publication/author/1741101`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access}`
        }
      });
      const parsedPublicationData = await publicationData.json();
      return parsedPublicationData;
    } catch (err) {
      console.error("Failed to fetch publications", err);
      return;
    }
  }
  