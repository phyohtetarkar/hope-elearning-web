import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

interface TagEditProps {
  onClose: () => void;
  title: string;
}

function TagEdit({ onClose, title }: TagEditProps) {
  return (
    <ModalContent>
      <ModalHeader>
        <h3 className="fw-bold mt-3">{title}</h3>
      </ModalHeader>
      <ModalBody>
        <form className="gird grid-cols-1">
          <Input
            label="Tag"
            id="tag"
            type="text"
            className="mb-4"
            placeholder="Enter tag"
          />
          <Input
            label="Slug"
            id="slug"
            type="text"
            className="mb-4"
            placeholder="Enter slug"
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default TagEdit;
