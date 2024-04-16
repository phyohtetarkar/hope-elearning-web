"use client";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import TagEdit from "./tag-edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TagsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleNewTag = () => {
    setModalTitle("Add Tag");
    onOpen();
  };

  const handleEditTag = () => {
    setModalTitle("Edit Tag");
    onOpen();
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Tags</h2>
        <Button color="primary" onClick={handleNewTag}>
          New tag
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead className="uppercase min-w-[300px] w-full">
            Tag
          </TableHead>
          <TableHead className="uppercase min-w-[150px]">Slug</TableHead>
          <TableHead className="uppercase min-w-[150px]">
            No.of posts
          </TableHead>
          <TableHead className="uppercase min-w-[150px]">
            Action
          </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          <TableRow>
            <TableCell>
              <h6>News</h6>
            </TableCell>
            <TableCell className="text-sliver text-sm">
              news
            </TableCell>
            <TableCell className="text-sliver text-sm">
              10 post
            </TableCell>
            <TableCell>
              <div className="flex justify-start gap-2">
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                      <Button
                        variant="default"
                        size="icon"
                        onClick={handleEditTag}
                        asChild
                      >
                        <span>
                          <Edit size={20} />
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit tag</TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleEditTag}
                        asChild
                      >
                        <span>
                          <Trash2 size={20} />
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete tag</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end">
        <Pagination totalPage={10} currentPage={1} />
      </div>

      <Modal
        size="lg"
        placement="top"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        classNames={{
          body: "py-5 px-6",
          header: "border-b",
          footer: "border-t py-5",
        }}
      >
        <TagEdit onClose={onClose} title={modalTitle} />
      </Modal>
    </>
  );
}

export default TagsPage;
