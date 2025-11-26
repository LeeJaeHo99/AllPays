export default function PayTypeRank() {
    return (
        <div className="flex flex-col justify-start w-[30%] h-full">
            <h3 className="mb-12 text-sm font-ns-regular text-gray">
                거래 수단별 TOP 5
            </h3>
            <div className="flex flex-col gap-8">
                <PayTypeRankItem rank={1} payType="신용카드" count={8} />
                <PayTypeRankItem rank={2} payType="계좌이체" count={8} />
                <PayTypeRankItem rank={3} payType="휴대폰" count={8} />
                <PayTypeRankItem rank={4} payType="계좌이체" count={8} />
                <PayTypeRankItem rank={5} payType="무통장입금" count={8} />
            </div>
        </div>
    );
}

function PayTypeRankItem({ rank, payType, count }: { rank: number; payType: string; count: number }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
                <p className="px-2 py-1 rounded-md text-xs font-ns-bold text-white bg-black">
                    {rank}
                </p>
                <div className="flex justify-start items-center ml-2 text-sm font-ns-regular">
                    {payType}
                </div>
            </div>
            <p className="text-sm font-ns-regular">
                <span className="font-ns-bold text-primary">{count}</span>건
            </p>
        </div>
    );
}
