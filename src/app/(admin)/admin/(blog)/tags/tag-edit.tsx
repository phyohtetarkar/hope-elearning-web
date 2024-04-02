import { Input } from "@/components/forms";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface TagEditProps {
  onClose: () => void;
  title: string;
}

function TagEdit({ onClose, title }: TagEditProps) {
  return (
    <ModalContent>
      <ModalHeader>
        <h3 className="fw-bold mt-2">{title}</h3>
      </ModalHeader>
      <ModalBody>
        <form>
          <Input label="Tag" id="tag" type="text" placeholder="Enter tag" />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onClose}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default TagEdit;
