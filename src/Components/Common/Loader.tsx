import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#4f46e5" size={60} />
    </div>
  );
}