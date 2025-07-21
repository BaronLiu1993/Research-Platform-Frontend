"use server"

export async function fetchPublications(authorId) {
    try {
      
      const publicationData = await fetch(`http://localhost:8080/publication/author/1741101`, {
        method: "GET",
      });
      const parsedPublicationData = await publicationData.json();
      console.log(parsedPublicationData)
      return parsedPublicationData;
    } catch (err) {
      console.error("Failed to fetch publications", err);
      return;
    }
  }
  