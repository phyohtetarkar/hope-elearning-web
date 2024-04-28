import { cn } from "@/lib/utils";
import Select, { Props } from "react-select";

export default function ReactSelect<
  Option = unknown,
  IsMulti extends boolean = false
>({
  label,
  error,
  wrapperClass,
  ...props
}: Props<Option, IsMulti> & {
  label?: string;
  error?: string;
  wrapperClass?: string;
}) {
  return (
    <div className={cn(`flex flex-col`, wrapperClass)}>
      {label && <label className="font-medium mb-1">{label}</label>}
      <Select<Option, IsMulti>
        styles={{
          control: (base, state) => ({}),
          input: (base, state) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
        classNames={{
          control: ({ isFocused }) => {
            if (error) {
              return cn(
                "flex py-1 rounded-md border border-danger",
                isFocused ? "ring-[4px] ring-danger/30" : ""
              );
            }
            return cn(
              "flex py-1 rounded-md border",
              isFocused ? "border-primary" : "border-gray-300"
            );
          },
        }}
        {...props}
      />
      {error && <div className="text-danger text-sm mt-1.5">{error}</div>}
    </div>
  );
}
