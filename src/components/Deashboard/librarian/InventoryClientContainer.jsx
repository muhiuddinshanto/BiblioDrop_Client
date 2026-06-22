"use client";

import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import EditBookModal from "./EditBookModal";
import { booksUpdate, bookDetailsUpdate, bookDelete } from "@/lib/actions/books";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function InventoryClientContainer({ initialBooks = [] }) {
    const [books, setBooks] = useState(initialBooks);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const router = useRouter();

    // à§§. à¦à¦¡à¦¿à¦Ÿ à¦¬à¦¾à¦Ÿà¦¨ â€” corrupt status normalize à¦•à¦°à§‡ modal à¦ à¦ªà¦¾à¦ à¦¾à¦“
    const handleEditClick = (book) => {
        const safeBook = {
            ...book,
            status: typeof book.status === "object"
                ? (book.status?.status ?? "Pending Approval")
                : book.status,
        };
        setSelectedBook(safeBook);
        setIsModalOpen(true);
    };

    // à§¨. à¦¬à¦‡ details à¦†à¦ªà¦¡à§‡à¦Ÿ
    const handleBookUpdate = async (updatedBookData) => {
        setIsUpdating(true);
        const oldBooks = [...books];

        setBooks((prev) =>
            prev.map((b) => b._id === updatedBookData._id ? { ...b, ...updatedBookData } : b)
        );

        try {
            const { _id, userId, date, status, ...editableFields } = updatedBookData;

            const result = await bookDetailsUpdate(_id, editableFields);

            if (!result?.success) throw new Error(result?.message || "Update failed");

            setIsModalOpen(false);
            toast.success("Book updated successfully!");
            router.refresh();
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update. Rolling back...");
            setBooks(oldBooks);
        } finally {
            setIsUpdating(false);
        }
    };

    // à§©. à¦¸à§à¦Ÿà§à¦¯à¦¾à¦Ÿà¦¾à¦¸ à¦Ÿà¦—à¦²
    const handleStatusToggle = async (id, nextStatus) => {
        setIsUpdating(true);
        const oldBooks = [...books];

        setBooks((prev) => prev.map((b) => b._id === id ? { ...b, status: nextStatus } : b));

        try {
            const result = await booksUpdate(id, nextStatus);

            if (!result?.success) throw new Error(result?.message || "Status update failed");

            router.refresh();
        } catch (error) {
            console.error("Status toggle failed:", error);
            setBooks(oldBooks);
            toast.error("Could not update status.");
        } finally {
            setIsUpdating(false);
        }
    };

    // à§ª. à¦¡à¦¿à¦²à¦¿à¦Ÿ
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this book?");
        if (!confirmed) return;

        setIsUpdating(true);
        const oldBooks = [...books];

        setBooks((prev) => prev.filter((b) => b._id !== id));

        try {
            
            const data = await bookDelete(id, { status: "Deleted" });

            if (!data.success) throw new Error(data.message || "Delete failed");

            router.refresh();
        } catch (error) {
            console.error("Delete failed:", error);
            setBooks(oldBooks);
            toast.error("Failed to delete the book.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <InventoryTable
                books={books}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onStatusToggle={handleStatusToggle}
                isUpdating={isUpdating}
            />

            {selectedBook && (
                <EditBookModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    bookData={selectedBook}
                    onUpdate={handleBookUpdate}
                    isUpdating={isUpdating}
                />
            )}
        </>
    );
}

