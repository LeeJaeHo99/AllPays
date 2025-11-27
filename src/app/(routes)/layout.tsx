export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-224px)] mt-20 bg-zinc-100">
            <div className="inner max-w-[1400px] flex flex-col items-center justify-center h-full py-10">
                <div className="flex flex-col w-full h-full bg-white rounded-lg mb-5 px-10 py-5 shadow-md shadow-slate-500/10">
                    {children}
                </div>
            </div>
        </div>
    );
}