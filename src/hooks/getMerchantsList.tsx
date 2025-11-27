"use client";

import { MerchantsDetails } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export default function useGetMerchantsList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["merchantsList"],
        queryFn: async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/merchants/details`
                );
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const result = await response.json();
                const data: MerchantsDetails[] = result.data || [];
                return data;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });

    return { data, isLoading, error };
}

