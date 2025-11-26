import { ArrowUpRight } from "lucide-react";

export default function RecentPayments() {
    return (
        <div className="w-[70%] flex flex-col bg-white rounded-lg mb-5 px-10 py-5 shadow-md shadow-slate-500/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="mb-4 text-2xl font-ns-bold">최근 거래 내역</h2>
                <button className="flex justify-center items-center text-xs font-ns-regular text-gray hover:text-primary transition-all duration-300">
                    <span>더보기</span>
                    <ArrowUpRight size={16} />
                </button>
            </div>
            <RecentPaymentsItem />
        </div>
    );
}

function RecentPaymentsItem() {
    return (
        <>
            <div className="flex justify-between items-center mb-2 px-4 py-2 rounded-md bg-black text-white text-xs font-ns-regular">
                <span className="w-[20%] text-center">결제 상태</span>
                <span className="w-[20%] text-center">가게 이름</span>
                <span className="w-[20%] text-center">결제 수단</span>
                <span className="w-[20%] text-center">결제 금액</span>
                <span className="w-[20%] text-center">결제 시간</span>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular border-b border-slate-200 border-1 border-solid">
                <span className="w-[20%] text-center">성공</span>
                <span className="w-[20%] text-center">포치타 커피</span>
                <span className="w-[20%] text-center">신용카드</span>
                <span className="w-[20%] text-center">100,000원</span>
                <span className="w-[20%] text-center">2025-01-01 12:00:00</span>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular border-b border-slate-200 border-1 border-solid">
                <span className="w-[20%] text-center">성공</span>
                <span className="w-[20%] text-center">포치타 커피</span>
                <span className="w-[20%] text-center">신용카드</span>
                <span className="w-[20%] text-center">100,000원</span>
                <span className="w-[20%] text-center">2025-01-01 12:00:00</span>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular border-b border-slate-200 border-1 border-solid">
                <span className="w-[20%] text-center">성공</span>
                <span className="w-[20%] text-center">포치타 커피</span>
                <span className="w-[20%] text-center">신용카드</span>
                <span className="w-[20%] text-center">100,000원</span>
                <span className="w-[20%] text-center">2025-01-01 12:00:00</span>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular border-b border-slate-200 border-1 border-solid">
                <span className="w-[20%] text-center">성공</span>
                <span className="w-[20%] text-center">포치타 커피</span>
                <span className="w-[20%] text-center">신용카드</span>
                <span className="w-[20%] text-center">100,000원</span>
                <span className="w-[20%] text-center">2025-01-01 12:00:00</span>
            </div>
            <div className="flex justify-between items-center mb-2 px-4 py-2 pb-4 text-xs font-ns-regular">
                <span className="w-[20%] text-center">성공</span>
                <span className="w-[20%] text-center">포치타 커피</span>
                <span className="w-[20%] text-center">신용카드</span>
                <span className="w-[20%] text-center">100,000원</span>
                <span className="w-[20%] text-center">2025-01-01 12:00:00</span>
            </div>
        </>
    );
}
