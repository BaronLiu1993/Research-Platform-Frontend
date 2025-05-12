export default async function RecommendationsSection({ userId }) {
    
    return (
      <div>
        {/* Render your carousel or list */}
        {recommendations.map((prof) => (
          <div key={prof.id}>{prof.name}</div>
        ))}
      </div>
    );
  }