'use client';

import { useState, useEffect } from "react";

interface Payment {
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: string;
    status: string;
    paymentAt: string;
}

export default function Home() {
    const [data, setData] = useState<Payment[]>([]);


    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/list`);
                const result = await response.json();
                setData(result.data || []);
            } catch (error) {
                setData([])
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="home">
            {data.map((item) => (
                <div key={item.paymentCode}>
                    <p>시작</p>
                    <p>paymentCode: {item.paymentCode}</p>
                    <p>mchtCode:{item.mchtCode}</p>
                    <p>amount:{item.amount}</p>
                    <p>currency:{item.currency}</p>
                    <p>payType:{item.payType}</p>
                    <p>status:{item.status}</p>
                    <p>paymentAt:{item.paymentAt}</p>
                    <p>끝</p>
                </div>
            ))}
        </div>
    );
}