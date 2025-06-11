import { Badge } from "@/shadcomponents/ui/badge";

export default function Message({ data, email }) {
  console.log(email);
  return (
    <>
      <div>
        <div className="">
          <div className="font-main">
            <div className="space-x-2">
              <span className="text-lg font-semibold text-black">{data.subject}</span>
              <div className="space-x-2 flex">
                <div>
                  {email !== data.to.address && (
                    <Badge className="bg-green-500 text-[10px] rounded-xs">
                      RECEIVED
                    </Badge>
                  )}
                </div>
                <Badge className="text-[10px] bg-orange-500 rounded-xs">
                  SEEN
                </Badge>
                {data.labels?.map((label, idx) => (
                  <div key={idx}>
                    <Badge className="text-[10px] rounded-xs text-[#979A9B] bg-[#F1F1EF]">
                      {label}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-md">{`To ${data.to.name} <${data.to.address}>`}</div>

          <div className="text-xs">{`From ${data.from.name} <${data.from.address}>`}</div>
        </div>
      </div>
    </>
  );
}
