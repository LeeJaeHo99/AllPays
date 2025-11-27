import { Search } from "lucide-react";

export default function PaymentsListSearch() {
    return (
        <div className="flex items-center justify-end gap-2">
            <label htmlFor="searchType" className="relative">
                <span className="absolute left-0 top-[-20px] text-xs font-ns-regular text-gray">
                    검색 종류
                </span>
                <select
                    name="searchType"
                    id="searchType"
                    className="w-full min-w-28 h-10 px-2 py-1 rounded-md border border-1 border-slate-300 text-sm font-ns-regular text-black focus:outline-none"
                >
                    <option value="paymentCode">결제 코드</option>
                    <option value="mchtCode">상점 코드</option>
                    <option value="amount">금액</option>
                    <option value="currency">통화</option>
                    <option value="payType">결제 타입</option>
                </select>
            </label>
            <input
                type="text"
                placeholder="검색"
                className="w-full h-10 px-3 py-1 rounded-md border border-1 border-slate-300 text-sm font-ns-regular text-gray focus:outline-none"
            />
            <button className="flex justify-center items-center w-fit h-10 px-3 py-1 rounded-md bg-black text-white">
                <Search size={16} />
            </button>
        </div>
    );
}
