export default function PayMchtRankItem({ rank, payMcht, count }: { rank: number; payMcht: string; count: number }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
                <p className="px-2 py-1 rounded-md text-xs font-ns-bold text-white bg-black">
                    {rank}
                </p>
                <div className="flex justify-start items-center ml-2 text-sm font-ns-regular">
                    {payMcht}
                </div>
            </div>
            <p className="text-sm font-ns-regular">
                <span className="font-ns-bold text-primary">{count}</span>건
            </p>
        </div>
    );
}