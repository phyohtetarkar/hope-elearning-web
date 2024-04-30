"use client";

import { Textarea } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function CourseReviewEdit() {
  return (
    <Card className="shadow-none">
      <CardHeader className="px-4 py-3">
        <h4>Leave a review</h4>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <form className="grid grid-cols-1 gap-4">
          <Select>
            <SelectTrigger className="focus:border-primary ring-0 outline-none focus:ring-0">
              <SelectValue placeholder="Choose rating" />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((v, i) => {
                return (
                  <SelectItem
                    key={i}
                    value={`${v}`}
                    hideIndicator
                    className="pl-2"
                  >
                    <div className="flex items-center gap-1">
                      <Rating rating={v} size="sm" />
                      <span>({v}/5)</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Textarea placeholder="Write your review" rows={4} />

          <div>
            <Button className="w-full md:w-auto">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
