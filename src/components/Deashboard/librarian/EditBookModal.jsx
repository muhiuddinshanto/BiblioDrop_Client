"use client";

import React from "react";
import { Button, Modal } from "@heroui/react";
import { MdEdit } from "react-icons/md";
import BookForm from "./BookForm";

export default function EditBookModal({ isOpen, onOpenChange, bookData, onUpdate, isUpdating }) {

  const handleFormSubmit = (updatedFields) => {
    if (!bookData) return;

    // শুধু onUpdate call করো — InventoryClientContainer বাকি সব সামলাবে
    onUpdate({
      ...updatedFields,
      _id: bookData._id,
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-100 bg-white">
            <Modal.CloseTrigger />

            <Modal.Header className="pt-6 px-6 md:px-8 border-b border-slate-50 pb-4">
              <Modal.Icon className="bg-amber-50 text-[#775a19] rounded-xl p-2.5">
                <MdEdit className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-xl font-bold font-serif text-[#040d1b] mt-2">
                Edit Book Masterpiece
              </Modal.Heading>
              <p className="mt-1 text-xs text-[#45474c]">
                Modify the archival metadata or update the cover image of this acquisition.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6 md:p-8">
              {bookData ? (
                <BookForm
                  initialData={bookData}
                  onSubmit={handleFormSubmit}
                  isSubmitting={isUpdating}
                />
              ) : (
                <div className="py-8 text-center text-sm text-slate-400 font-medium">
                  Loading archival data...
                </div>
              )}
            </Modal.Body>

            <Modal.Footer className="border-t border-slate-50 bg-slate-50/50 px-6 py-4 flex justify-end gap-3">
              <Button
                onClick={() => onOpenChange(false)}
                variant="secondary"
                className="font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border border-slate-200"
              >
                Close Editor
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}