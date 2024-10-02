"use client";

import { updateSiteSetting } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { BlockEditor } from "@elearning/block-editor";
import { Button, Separator, useToast } from "@elearning/ui";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function AboutUsPage({ value }: { value?: string }) {
  const [aboutUs, setAboutUs] = useState(value);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSiteSetting(aboutUs ?? "", 'about-us');
      toast({
        title: "Success",
        description: "About us updated",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl px-0 mb-10">
      <div className="flex items-center space-x-2 mb-4">
        <h2>About Us</h2>
        <div className="flex-grow"></div>
        <Button disabled={isSaving} onClick={handleSave}>
          {isSaving && <LoaderCircle className="mr-2 size-4 animate-spin" />}
          Save
        </Button>
      </div>
      <Separator className="mb-6" />
      <BlockEditor
        content={value}
        onUpdate={(editor) => {
          const html = editor.getHTML();
          setAboutUs(html);
        }}
      />
    </div>
  );
}
