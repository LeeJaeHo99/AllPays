import { MerchantsDetails } from "@/types/type";
import { merchantListTableHeader } from "@/data/data";

const COLUMN_COUNT = merchantListTableHeader.length;

interface MerchantsListTableBodyProps {
    merchantsList: MerchantsDetails[];
}

export default function MerchantsListTableBody({ merchantsList }: MerchantsListTableBodyProps) {
    const getStatusColor = (status: string): string => {
        switch (status) {
            case "ACTIVE":
                return "bg-primary";
            case "INACTIVE":
                return "bg-red";
            case "READY":
                return "bg-green-500";
            default:
                return "bg-gray";
        }
    };

    const getBizTypeEmoji = (bizType: string): string => {
        const emojiMap: Record<string, string> = {
            CAFE: "☕️",
            SHOP: "🛍️",
            MART: "🛒",
            APP: "🔍",
            TRAVEL: "✈️",
            EDU: "📚",
        };
        return emojiMap[bizType] || "";
    };

    const formatDateTime = (dateTime: string): string => {
        const [date, time] = dateTime.split("T");
        return `${date} / ${time}`;
    };

    return (
        <tbody>
            {merchantsList.map((merchant) => (
                <tr key={merchant.mchtCode}>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {merchant.mchtCode}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-sm font-ns-bold text-black text-center border-b border-slate-300 border-solid`}>
                        {merchant.mchtName}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        <span className={`px-2 py-1 rounded-md text-white ${getStatusColor(merchant.status)}`}>
                            {merchant.status}
                        </span>
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-sm font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        <span>{getBizTypeEmoji(merchant.bizType)}</span>
                        <span className="ml-1 text-xs font-ns-regular">
                            {merchant.bizType}
                        </span>
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {merchant.bizNo}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {merchant.address}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {merchant.phone}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {merchant.email}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {formatDateTime(merchant.registeredAt)}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {formatDateTime(merchant.updatedAt)}
                    </td>
                </tr>
            ))}
        </tbody>
    );
}