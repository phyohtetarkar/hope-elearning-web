import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Category } from "@/lib/models";

function CategoryEdit({ category }: { category?: Category }) {
  return (
    <form>
      <div className="gird grid-cols-1">
        <Input
          label="Category"
          id="category"
          type="text"
          className="mb-4"
          placeholder="Enter category"
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
        <Button variant="default" className="m-2">
          Cancel
        </Button>
        <Button type="submit" className="m-2">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}

export default CategoryEdit;
