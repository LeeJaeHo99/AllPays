import PaymentsListRadio from "./PaymentsListRadio";

export default function PaymentsListRadios({
    selected,
    handleSelect,
    count,
}: {
    selected: string;
    handleSelect: (status: string) => void;
    count: number[];
}) {
    return (
        <div className="flex justify-start items-center gap-4 w-[70%] mb-4">
            <PaymentsListRadio
                selected={selected}
                handleSelect={handleSelect}
                text="전체"
                count={count[0]}
                id="all"
                color="black"
            />
            <PaymentsListRadio
                selected={selected}
                handleSelect={handleSelect}
                text="결제완료"
                count={count[1]}
                id="completed"
                color="green"
            />
            <PaymentsListRadio
                selected={selected}
                handleSelect={handleSelect}
                text="결제실패"
                count={count[2]}
                id="failed"
                color="rose"
            />
            <PaymentsListRadio
                selected={selected}
                handleSelect={handleSelect}
                text="결제취소"
                count={count[3]}
                id="canceled"
                color="slate"
            />
            <PaymentsListRadio
                selected={selected}
                handleSelect={handleSelect}
                text="승인대기"
                count={count[4]}
                id="pending"
                color="amber"
            />
        </div>
    );
}
