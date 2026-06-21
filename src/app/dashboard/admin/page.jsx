import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


const AdminPage = async () => {

    const user = await getUserSession();
    const admin = user?.role === "admin";

   
    if(admin){
        redirect('/dashboard/admin/overview');
    }
;

    return (
        <div>
            AdminPage
        </div>
    );
};

export default AdminPage;