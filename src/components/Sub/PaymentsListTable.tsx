"use client";

import { useState } from "react";
import PaymentsListRadio from "./PaymentsListRadio";

export default function PaymentsListTable() {
    const [selected, setSelected] = useState("all");

    const handleSelect = (status: string) => {
        setSelected(status);
    };

    return (
        <div>
            <div className="flex justify-start items-center gap-4 mb-4">
                <PaymentsListRadio
                    selected={selected}
                    handleSelect={handleSelect}
                    text="전체"
                    count={70}
                    id="all"
                    color="black"
                />
                <PaymentsListRadio
                    selected={selected}
                    handleSelect={handleSelect}
                    text="결제완료"
                    count={70}
                    id="completed"
                    color="green"
                />
                <PaymentsListRadio
                    selected={selected}
                    handleSelect={handleSelect}
                    text="결제실패"
                    count={70}
                    id="failed"
                    color="rose"
                />
                <PaymentsListRadio
                    selected={selected}
                    handleSelect={handleSelect}
                    text="결제취소"
                    count={70}
                    id="canceled"
                    color="slate"
                />
                <PaymentsListRadio
                    selected={selected}
                    handleSelect={handleSelect}
                    text="승인대기"
                    count={70}
                    id="pending"
                    color="amber"
                />
            </div>
            <table className="w-full">
                <PaymentsListTableHeader />
                <PaymentsListTableBody />
            </table>
        </div>
    );
}

function PaymentsListTableHeader() {
    return (
        <thead>
            <tr>
                <th className="w-[calc(100%/7)] py-2 rounded-tl-md rounded-bl-md bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    결제 코드
                </th>
                <th className="w-[calc(100%/7)] py-2 bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    상점 코드
                </th>
                <th className="w-[calc(100%/7)] py-2 bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    금액
                </th>
                <th className="w-[calc(100%/7)] py-2 bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    통화
                </th>
                <th className="w-[calc(100%/7)] py-2 bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    결제 타입
                </th>
                <th className="w-[calc(100%/7)] py-2 bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    결제 상태
                </th>
                <th className="w-[calc(100%/7)] py-2 rounded-tr-md rounded-br-md bg-slate-200 text-sm font-ns-bold text-gray text-center">
                    결제 시간
                </th>
            </tr>
        </thead>
    );
}

function PaymentsListTableBody() {
    return(
        <tbody>
            <tr>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
                <td className="w-[calc(100%/7)] py-2 text-sm font-ns-regular text-gray text-center">결제실패</td>
            </tr>
        </tbody>
    )
}