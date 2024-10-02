"use client";

import { deleteCategory } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@elearning/ui";
import { Category } from "@elearning/lib/models";
import { Edit, LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryEdit from "./category-edit";

export default function CategoryActionButtons({
  category,
}: {
  category: Category;
}) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteCategory(category.id);
      setAlertOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex justify-start gap-2">
      <TooltipProvider>
        <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant="default" size="icon" asChild>
                  <span>
                    <Edit size={20} />
                  </span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Edit category</TooltipContent>
          </Tooltip>

          <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <CategoryEdit data={category} close={() => setEditOpen(false)} />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" asChild>
                  <span>
                    <Trash2 size={20} />
                  </span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete category</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure to delete category: &ldquo;{category.name}&ldquo;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </div>
  );
}
