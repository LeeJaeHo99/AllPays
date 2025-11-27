"use client";

import { PaymentList } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export default function useGetPaymentsList() {
    const { data, isLoading, error } = useQuery({

        queryKey: ["paymentsList"],
        queryFn: async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/list`);
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const result = await response.json();
                const data: PaymentList[] = result.data || [];

                const dataWithMchtName = await Promise.all(
                    data.map(async (payment: PaymentList) => {
                        try {
                            const merchantsResponse = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/merchants/details/${payment.mchtCode}`
                            );
                            if (!merchantsResponse.ok) {
                                throw new Error("머천트 정보를 불러오는데 실패했습니다.");
                            }
                            const merchantsResult = await merchantsResponse.json();
                            return {
                                ...payment,
                                mchtName: merchantsResult.data?.mchtName || "",
                            };
                        } catch (error) {
                            console.error(`Failed to fetch merchant for ${payment.mchtCode}:`, error);
                            return {
                                ...payment,
                                mchtName: "",
                            };
                        }
                    })
                );

                return dataWithMchtName;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });

    return { data, isLoading, error };
}