import { PaymentWithMerchant } from "@/types/type";

export default function RecentPaymentsItem({
    recentPayments,
}: {
    recentPayments: PaymentWithMerchant[];
}) {
    return (
        <>
            <div className="flex justify-between items-center mb-2 px-4 py-2 rounded-md bg-black text-white text-xs font-ns-regular">
                <span className="w-[20%] text-center">결제 상태</span>
                <span className="w-[20%] text-center">가게 이름</span>
                <span className="w-[20%] text-center">결제 수단</span>
                <span className="w-[20%] text-center">결제 금액</span>
                <span className="w-[20%] text-center">결제 시간</span>
            </div>
            {recentPayments.map((payment) => (
                <div
                    className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular border-b border-slate-200 border-1 border-solid"
                    key={payment.paymentCode}
                >
                    <span className="w-[20%] text-center">
                        <span
                            className={`px-2 py-1 rounded-md text-white ${
                                payment.status === "SUCCESS"
                                    ? "bg-green-500"
                                    : payment.status === "FAILED"
                                    ? "bg-rose-500"
                                    : payment.status === "CANCELLED"
                                    ? "bg-slate-500"
                                    : "bg-amber-500"
                            }`}
                        >
                            {payment.status}
                        </span>
                    </span>
                    <span className="w-[20%] text-center">
                        {payment.mchtName}
                    </span>
                    <span className="w-[20%] text-center">
                        {payment.payType}
                    </span>
                    <span className="w-[20%] text-center">
                        <span className="font-ns-bold text-primary mr-1">
                            {payment.currency === "KRW" ? "₩" : "$"}
                        </span>
                        <span>
                            {payment.amount.split(".")[1] === "00"
                                ? payment.amount.split(".")[0]
                                : payment.amount}
                        </span>
                    </span>
                    <span className="w-[20%] text-center">
                        {payment.paymentAt.split("T")[0]}
                        <span> / </span>
                        {payment.paymentAt.split("T")[1]}
                    </span>
                </div>
            ))}
        </>
    );
}