import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Skill } from "@/lib/models";

function SkillEdit({ skill }: { skill?: Skill }) {
  return (
    <form>
      <div className="gird grid-cols-1">
        <Input
          label="Skill"
          id="skill"
          type="text"
          className="mb-4"
          placeholder="Enter skill"
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

export default SkillEdit;
