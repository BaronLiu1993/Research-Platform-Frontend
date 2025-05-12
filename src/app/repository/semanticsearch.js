export async function getRecommendations(user_id) {
    try {
      const response = await fetch('http://localhost:8080/match-professors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: user_id }),
      });
  
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      return { error: 'Unable to fetch recommendations at this time.' };
    }
  }