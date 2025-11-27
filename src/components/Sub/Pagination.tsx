import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({
    length,
    selectedPage,
    setSelectedPage,
    handlePreviousPage,
    handleNextPage,
}: {
    length: number;
    selectedPage: number;
    setSelectedPage: (page: number) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
}) {
    return (
        <div className="flex justify-center items-center gap-6 mt-4">
            <button
                className={`p-1 bg-primary text-white rounded-full ${
                    selectedPage === 0 ? "bg-gray cursor-not-allowed" : ""
                }`}
                onClick={handlePreviousPage}
            >
                <ArrowLeft size={16} />
            </button>
            {Array.from({ length: length }).map((_, index) => (
                <span
                    key={index}
                    className={`cursor-pointer px-2 py-1 rounded ${
                        selectedPage === index
                            ? "text-black font-ns-bold"
                            : "text-gray"
                    }`}
                    onClick={() => setSelectedPage(index)}
                >
                    {index + 1}
                </span>
            ))}
            <button
                className={`p-1 bg-primary text-white rounded-full ${
                    selectedPage === length - 1
                        ? "bg-gray cursor-not-allowed"
                        : ""
                }`}
                onClick={handleNextPage}
            >
                <ArrowRight size={16} />
            </button>
        </div>
    );
}
