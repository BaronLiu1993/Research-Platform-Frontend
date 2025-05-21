export function ContactPreview({ contact }) {
  if (!contact) return null;

  const fieldsData = [
    { value: contact.phone },
    { value: contact.email },
    { value: contact.location },
    { value: contact.linkedin },
    { value: contact.github },
    { value: contact.website || contact.devpost },
  ].filter(({ value }) => value?.trim());

  // Split into two rows - first 3 items on top, rest on bottom
  const topRow = fieldsData.slice(0, 3);
  const bottomRow = fieldsData.slice(3);

  return (
    <div className="flex flex-col items-center w-full text-center">
      <div className="flex justify-center items-center gap-2 text-[8px] underline font-bold font-serif">
        {topRow.map(({ value }, idx) => (
          <div key={idx}>
            {idx > 0 && <span className="text-gray-600">|</span>}
            <a target = "_blank" href = {value} className="text-gray-800">{value}</a>
          </div>
        ))}
      </div>

      {bottomRow.length > 0 && (
        <div className="flex justify-center items-center text-[8px] underline font-bold font-serif">
          {bottomRow.map(({ value }, idx) => (
            <div key={idx}>
              {idx > 0 && <span className="text-gray-600">|</span>}
              <a target = "_blank" href = {value} className="text-gray-800">{value}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}