import { MerchantsDetails } from "@/types/type";

export default function MerchantsListTableBody({ merchantsList }: { merchantsList: MerchantsDetails[] }) {
    return (
        <tbody>
            {merchantsList.map((merchant) => (
                <tr key={merchant.mchtCode}>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.mchtCode}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-sm font-ns-bold text-black text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.mchtName}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span
                            className={`px-2 py-1 rounded-md text-white ${
                                merchant.status === "ACTIVE"
                                    ? "bg-primary"
                                    : merchant.status === "INACTIVE"
                                    ? "bg-red"
                                    : merchant.status === "READY"
                                    ? "bg-green-500"
                                    : "bg-gray"
                            }`}
                        >
                            {merchant.status}
                        </span>
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-sm font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span>
                            {merchant.bizType === "CAFE"
                                ? "☕️"
                                : merchant.bizType === "SHOP"
                                ? "🛍️"
                                : merchant.bizType === "MART"
                                ? "🛒"
                                : merchant.bizType === "APP"
                                ? "🔍"
                                : merchant.bizType === "TRAVEL"
                                ? "✈️"
                                : merchant.bizType === "EDU"
                                ? "📚"
                                : ""}
                        </span>
                        <span className="ml-1 text-xs font-ns-regular">
                            {merchant.bizType}
                        </span>
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.bizNo}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.address}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.phone}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {merchant.email}
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span>{merchant.registeredAt.split("T")[0]}</span>
                        <span> / </span>
                        <span>{merchant.registeredAt.split("T")[1]}</span>
                    </td>
                    <td
                        className={`w-[calc(100%/${merchantsList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span>{merchant.updatedAt.split("T")[0]}</span>
                        <span> / </span>
                        <span>{merchant.updatedAt.split("T")[1]}</span>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}