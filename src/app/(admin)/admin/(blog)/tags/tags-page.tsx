"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import TagEdit from "./tag-edit";
import { useState } from "react";
import { Modal, useDisclosure } from "@nextui-org/modal";
import Table from "@/components/table";
import Pagination from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
        <Table.Header>
          <Table.Column className="uppercase min-w-[300px] w-full">
            Tag
          </Table.Column>
          <Table.Column className="uppercase min-w-[150px]">Slug</Table.Column>
          <Table.Column className="uppercase min-w-[150px]">
            No.of posts
          </Table.Column>
          <Table.Column className="uppercase min-w-[150px]">
            Action
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <h6>News</h6>
            </Table.Cell>
            <Table.Cell>
              <span className="text-sliver text-sm">news</span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-sliver text-sm">1 post</span>
            </Table.Cell>
            <Table.Cell>
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
                          <PencilSquareIcon width={20} />
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
                          <TrashIcon width={20} />
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete tag</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
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
