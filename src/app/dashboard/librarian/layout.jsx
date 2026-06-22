import { requireRole } from "@/lib/core/session";

const LibrarianLayout = async ({ children }) => {
    await requireRole('Librarian');

    return children;
};

export default LibrarianLayout;
