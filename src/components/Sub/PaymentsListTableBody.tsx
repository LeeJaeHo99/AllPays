import { PaymentWithMerchant } from "@/types/type";
import { paymentListTableHeader } from "@/data/data";

const COLUMN_COUNT = paymentListTableHeader.length;

interface PaymentsListTableBodyProps {
    paymentList: PaymentWithMerchant[];
}

export default function PaymentsListTableBody({
    paymentList,
}: PaymentsListTableBodyProps) {
    const getCurrencySymbol = (currency: string): string => {
        return currency === "KRW" ? "₩" : "$";
    };

    const formatAmount = (amount: string): string => {
        const parts = amount.split(".");
        return parts[1] === "00" ? parts[0] : amount;
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "SUCCESS":
                return "bg-green-500";
            case "FAILED":
                return "bg-rose-500";
            case "CANCELLED":
                return "bg-slate-500";
            default:
                return "bg-amber-500";
        }
    };

    const formatDateTime = (dateTime: string): string => {
        const [date, time] = dateTime.split("T");
        return `${date} / ${time}`;
    };

    return (
        <tbody>
            {paymentList.map((payment) => (
                <tr key={payment.paymentCode}>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {payment.paymentCode}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {payment.mchtCode}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-sm font-ns-bold text-black text-center border-b border-slate-300 border-solid`}>
                        {payment.mchtName || "-"}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        <span className="font-ns-bold text-primary mr-1">
                            {getCurrencySymbol(payment.currency)}
                        </span>
                        <span>{formatAmount(payment.amount)}</span>
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {payment.payType}
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-white text-center border-b border-slate-300 border-solid`}>
                        <span
                            className={`px-2 py-1 rounded-md text-white ${getStatusColor(
                                payment.status
                            )}`}
                        >
                            {payment.status}
                        </span>
                    </td>
                    <td className={`w-[calc(100%/${COLUMN_COUNT})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}>
                        {formatDateTime(payment.paymentAt)}
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
