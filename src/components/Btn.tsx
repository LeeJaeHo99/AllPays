export default function Btn({
    text,
    selected,
    onClick,
}: {
    text: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className={`flex justify-center items-center w-fit h-fit px-3 py-1 rounded-md  ${
                selected
                    ? "bg-slate-300 text-white"
                    : "text-gray border border-1 border-slate-300"
            }`}
            onClick={onClick}
        >
            <span className="text-xs font-ns-regular">{text}</span>
        </button>
    );
}
