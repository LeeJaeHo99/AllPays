export interface PaymentList{
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: string;
    status: string;
    paymentAt: string;
}

export interface MerchantList{
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
}

export interface MerchantsDetails{
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
    bizNo: string;
    address: string;
    phone: string;
    email: string;
    registeredAt: string;
    updatedAt: string;
}

export interface MerchantsDetailsCode{
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
    bizNo: string;
    address: string;
    phone: string;
    email: string;
    registeredAt: string;
    updatedAt: string;
}

export interface PaymentStatus{
    code: string;
    description: string;
}

export interface PaymentType{
    type: string;
    description: string;
}

export interface MchtStatus{
    code: string;
    description: string;
}

export interface PaymentWithMerchant extends PaymentList {
    mchtName?: string;
}

export interface PaymentTotalProps {
    selectedPeriod: string;
}

export interface PayMchtRankProps {
    selectedPeriod: string;
}

export interface RankItem {
    mchtName: string;
    count: number;
}

export interface PeriodFilterProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}

export interface SearchComponentProps {
    searchList: { label: string; value: string }[];
    onSearch?: (searchType: string, searchValue: string) => void;
    initialSearchType?: string;
    initialSearchValue?: string;
    className?: string;
}