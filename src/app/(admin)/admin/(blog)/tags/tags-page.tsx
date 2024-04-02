"use client";
import { Pagination, Table } from "@/components";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Tooltip, useDisclosure } from "@nextui-org/react";
import TagEdit from "./tag-edit";
import { useState } from "react";

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
    <div className="p-4 lg:p-5">
      <Modal size="lg" isOpen={isOpen} onClose={onClose} placement="top">
        <TagEdit onClose={onClose} title={modalTitle} />
      </Modal>

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
              <span className="text-muted text-sm">news</span>
            </Table.Cell>
            <Table.Cell>
              <span className="text-muted text-sm">1 post</span>
            </Table.Cell>
            <Table.Cell>{getActionButtons()}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination totalPage={10} currentPage={1} />
      </div>
    </div>
  );

  function getActionButtons() {
    return (
      <div className="flex justify-start gap-2">
        <Tooltip content="Edit tag" color="foreground">
          <Button onClick={handleEditTag} isIconOnly>
            <PencilSquareIcon width={20} />
          </Button>
        </Tooltip>
        <Tooltip content="delete tag" color="danger">
          <Button color="danger" isIconOnly>
            <TrashIcon width={20} />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

export default TagsPage;
