import Dashboard from "@/components/DashBoard/Dashboard";

export default function Home() {

    return (
        <div className="bg-zinc-100 min-h-screen h-full mt-20">
            <div className="inner max-w-[1200px] p-10">
                <Dashboard />
            </div>
        </div>
    );
}