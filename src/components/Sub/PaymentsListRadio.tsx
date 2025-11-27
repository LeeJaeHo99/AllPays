export default function PaymentsListRadio({
    selected,
    handleSelect,
    text,
    count,
    id,
    color,
}: {
    selected: string;
    handleSelect: (status: string) => void;
    text: string;
    count: number;
    id: string;
    color: string;
}) {
    return (
        <>
            <label
                htmlFor={id}
                className={`flex items-center gap-1 pb-2 border-b-2 border-solid
                    ${
                        selected === id
                            ? ` border-${color}-500 `
                            : ` border-transparent `
                    }`}
            >
                <span className={`${selected === id ? `font-ns-bold` : `font-ns-regular`} text-sm`}>{text}</span>
                <span className={`${color === "black" ? `bg-black` : `bg-${color}-500`} px-2 py-1 rounded-md text-sm font-ns-regular text-white`}>
                    {count}
                </span>
            </label>
            <input
                type="radio"
                name="paymentStatus"
                className="hidden"
                id={id}
                onChange={() => handleSelect(id)}
            />
        </>
    );
}
