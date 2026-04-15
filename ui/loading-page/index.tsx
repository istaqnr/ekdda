import MainLoader from "@/ui/loaders/MainLoader";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-700/40 backdrop-blur-sm">
      <div className="text-center">
        <MainLoader size={250} />
        <p className="text-lg font-semibold text-white mt-6">
          Περιμένετε όσο φορτώνουμε το περιεχόμενο σας.
        </p>
      </div>
    </div>
  );
}
