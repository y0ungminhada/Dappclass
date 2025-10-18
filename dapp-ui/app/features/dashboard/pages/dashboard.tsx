import { supabase } from "~/postgres/supaclient"

// before rendering Home react component(backend에서 실생)
export async function loader() {
    const { data } = await supabase().from("dapp-test").select("*");

    console.log(data);
}

export default function Dashboard() {
    return <div>
        Dashboard
    </div>
}