import { PaymentWithMerchant } from "@/types/type";



export default function PaymentsListTableBody({ paymentList }: { paymentList: PaymentWithMerchant[] }) {
    console.log(paymentList);
    return (
        <tbody>
            {paymentList.map((payment) => (
                <tr key={payment.paymentCode}>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {payment.paymentCode}
                    </td>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {payment.mchtCode}
                    </td>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {payment.mchtName}
                    </td>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span className="font-ns-bold text-primary mr-1">
                            {payment.currency === "KRW" ? "₩" : "$"}
                        </span>
                        <span>
                            {payment.amount.split(".")[1] === "00"
                                ? payment.amount.split(".")[0]
                                : payment.amount}
                        </span>
                    </td>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        {payment.payType}
                    </td>
                    <td
                        className={`w-[calc(100%/${
                            paymentList.length
                        })] py-4 text-xs font-ns-regular text-white text-center border-b border-slate-300 border-solid `}
                    >
                        <span className={`px-2 py-1 rounded-md text-white ${
                            payment.status === "SUCCESS"
                                ? "bg-green-500"
                                : payment.status === "FAILED"
                                ? "bg-rose-500"
                                : payment.status === "CANCELLED"
                                ? "bg-slate-500"
                                : "bg-amber-500"
                        }`}>
                            {payment.status}
                        </span>
                    </td>
                    <td
                        className={`w-[calc(100%/${paymentList.length})] py-4 text-xs font-ns-regular text-gray text-center border-b border-slate-300 border-solid`}
                    >
                        <span>{payment.paymentAt.split("T")[0]}</span>
                        <span> / </span>
                        <span>{payment.paymentAt.split("T")[1]}</span>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}