import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProfileUpdate() {
  return (
    <form>
      <div className="grid grid-cols-12 mt-3 mb-5">
        <div className="col-span-8">
          <div className="grid grid-cols-12">
            <div className="lg:col-span-6 lg:me-2 col-span-12">
              <Input
                label="Nick Name"
                id="nameInput"
                type="text"
                wrapperClass="mb-4"
                placeholder="Enter nick name"
                defaultValue={"Naing"}
              />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Input
                label="Headline"
                id="headlineInput"
                type="text"
                wrapperClass="mb-4"
                placeholder="Enter headline"
                defaultValue={"Exploring the Achievements"}
              />
            </div>
          </div>
          <Input
            label="Email"
            id="emailInput"
            type="email"
            className="bg-default"
            wrapperClass="mb-5"
            defaultValue={"theimwenaing@gmail.com"}
            disabled
          />
          <Button type="submit" color="primary">
            Update profile
          </Button>
        </div>

        <div className="col-span-4 flex justify-center">
          <div>
            <div className="relative overflow-hidden rounded-full">
              <Image
                src="/images/profile.png"
                width={128}
                height={128}
                alt="User image"
                sizes="33vw"
                className="rounded-full object-cover"
              />
              <div className="absolute bg-black bg-opacity-50 text-white text-center w-full bottom-0">
                Edit
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
