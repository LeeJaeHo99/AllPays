export default function Table({ tableHeader, tableBody, component }: { tableHeader: string[], tableBody: React.ReactNode, component?: React.ReactNode }) {

    return (
        <div className="w-full h-full">
            {component}
            <table className="w-full border-collapse">
                <TableHeader tableHeader={tableHeader} />
                {tableBody}
            </table>
        </div>
    );
}

function TableHeader({ tableHeader }: { tableHeader: string[] }) {
    return (
        <thead>
            <tr>
                {tableHeader.map((header) => (
                    <th key={header} className={`w-[calc(100%/${tableHeader.length})] py-2 bg-black text-sm font-ns-regular text-white text-center first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md`}>
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

