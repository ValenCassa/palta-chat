import { Spinner } from "@/components";

export default function Loading() {
  return (
    <div className="grid h-full w-full place-content-center">
      <Spinner />
    </div>
  );
}
