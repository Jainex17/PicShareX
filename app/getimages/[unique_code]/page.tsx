import { GetImages } from "@/components/GetImages";

function Page({ params }: { params: { unique_code: string } }) {
  
  return <>
    <div className="w-full">
      <GetImages unique_code={params.unique_code} />
    </div>
  </>;
};

export default Page;