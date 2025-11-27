export const paymentListTableHeader = [
    "결제 코드",
    "상점 코드",
    "상점 이름",
    "금액",
    "결제 타입",
    "결제 상태",
    "결제 시간",
];

export const paymentListSearchList = [
    {
        label: "상점 이름",
        value: "mchtName",
    },
    {
        label: "결제 타입",
        value: "payType",
    },
    {
        label: "결제 상태",
        value: "status",
    },
];

export const merchantListTableHeader = [
    "상점 코드",
    "상점 이름",
    "상점 상태",
    "상점 유형",
    "사업자 번호",
    "주소",
    "전화번호",
    "이메일",
    "등록 시간",
    "수정 시간",
];

export const merchantListTableBody = [
    "상점 코드",
    "상점 이름",
    "상점 상태",
    "상점 유형",
    "사업자 번호",
    "주소",
    "전화번호",
    "이메일",
    "등록 시간",
    "수정 시간",
];

export const merchantListSearchList = [
    {
        label: "상점 이름",
        value: "mchtName",
    },
    {
        label: "상점 코드",
        value: "mchtCode",
    },
    {
        label: "상점 상태",
        value: "status",
    },
    {
        label: "상점 유형",
        value: "bizType",
    },
    {
        label: "사업자 번호",
        value: "bizNo",
    },
    {
        label: "주소",
        value: "address",
    },
    {
        label: "전화번호",
        value: "phone",
    },
    {
        label: "이메일",
        value: "email",
    },
];

export const merchantListTableFilter = [
    {
        label: "전체",
        value: "all",
    },
    {
        label: "이름순",
        value: "name",
    },
    {
        label: "등록 시간 최신순",
        value: "registeredAtDesc",
    },
    {
        label: "등록 시간 오래된순",
        value: "registeredAtAsc",
    },
    {
        label: "수정 시간 최신순",
        value: "updatedAtDesc",
    },
    {
        label: "수정 시간 오래된순",
        value: "updatedAtAsc",
    },
];

export const paymentListTableFilter = [
    {
        label: "전체",
        value: "all",
    },
    {
        label: "금액 낮은순 (환율 1450원 적용)",
        value: "amountAsc",
    },
    {
        label: "금액 높은순 (환율 1450원 적용)",
        value: "amountDesc",
    },
    {
        label: "결제 시간 최신순",
        value: "paymentAtDesc",
    },
    {
        label: "결제 시간 오래된순",
        value: "paymentAtAsc",
    },
];