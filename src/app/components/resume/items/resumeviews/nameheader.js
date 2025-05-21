export function NameHeader({ first_name, last_name }) {
  const name = `${first_name} ${last_name}`;

  return (
    <div className = "font-serif flex items-center justify-center text-3xl">
      <h1>{name}</h1>
    </div>
  );
}
