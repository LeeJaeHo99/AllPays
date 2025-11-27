export default function TableFilter({ 
    filterList, 
    value, 
    onChange 
}: { 
    filterList: { label: string, value: string }[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="flex justify-end w-full mb-4">
            <select 
                name="tableFilter" 
                id="tableFilter" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-2 py-1 rounded-md border border-1 border-slate-300 text-xs font-ns-bold text-black focus:outline-none"
            >
                {filterList.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}
