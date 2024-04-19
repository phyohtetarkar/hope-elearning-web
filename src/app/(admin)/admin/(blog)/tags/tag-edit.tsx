import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Tag } from "@/lib/models";

interface TagEditProps {
  tag?: Tag;
}

function TagEdit({ tag }: TagEditProps) {
  return (
    <form>
      <div className="gird grid-cols-1">
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
      </div>

      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}

export default TagEdit;
