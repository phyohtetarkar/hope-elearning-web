import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Tag } from "@/lib/models";

function TagEdit({ tag }: { tag?: Tag }) {
  return (
    <form>
      <div className="gird grid-cols-1">
        <Input
          label="Tag"
          id="tag"
          type="text"
          className="mb-4"
          placeholder="Enter tag"
          value={tag?.name}
        />
        <Input
          label="Slug"
          id="slug"
          type="text"
          className="mb-4"
          placeholder="Enter slug"
          value={tag?.slug}
        />
      </div>

      <DialogFooter>
        <Button variant="default" className="mt-2">
          Cancel
        </Button>
        <Button type="submit" className="mt-2">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default TagEdit;
