import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@elearning/ui";
import { Editor } from "@tiptap/core";
import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  EraserIcon,
  PencilLineIcon,
  RefreshCcwDotIcon,
  SparklesIcon,
} from "lucide-react";

const items = [
  {
    group: "Edit or review selection",
    commands: [
      {
        title: "Improve writing",
        command: "improve",
        icon: RefreshCcwDotIcon,
      },
      {
        title: "Fix grammar",
        command: "fix grammar",
        icon: EraserIcon,
      },
      {
        title: "Make shorter",
        command: "make shorter",
        icon: ArrowDownNarrowWideIcon,
      },
      {
        title: "Make longer",
        command: "make longer",
        icon: ArrowUpNarrowWideIcon,
      },
    ],
  },
  {
    group: "Use AI to do more",
    commands: [
      {
        title: "Continue writing",
        command: "continue writing",
        icon: PencilLineIcon,
      },
    ],
  },
];

export const AiSelector = ({ editor }: { editor: Editor }) => {
  const handleCommandClick = (command: string) => {
    const result = editor.chain().focus().aiCompletion({ command }).run();
  };

  // const content = () => {
  //   if (isLoading) {
  //     return (
  //       <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-primary">
  //         <SparklesIcon className="mr-2 size-4 shrink-0" />
  //         AI is thinking
  //         <div className="ml-auto mt-1">
  //           <TypingSpinner />
  //         </div>
  //       </div>
  //     );
  //   }
  //   return items.map((item, i) => {
  //     return (
  //       <div key={i} className="p-1 flex flex-col">
  //         <h6 className="text-muted-foreground font-medium text-xs p-2">
  //           {item.group}
  //         </h6>
  //         {item.commands.map((c, j) => {
  //           return (
  //             <div
  //               key={j}
  //               onClick={() => {
  //                 handleCommandClick(c.command);
  //               }}
  //               className="flex space-x-2 items-center rounded-md hover:bg-accent px-2 py-1.5 text-accent-foreground cursor-pointer"
  //             >
  //               <c.icon className="size-4 text-primary" />
  //               <span className="text-sm">{c.title}</span>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   });
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-none text-primary">
          <SparklesIcon className="size-4 me-2" strokeWidth={2.2} />
          <span className="me-2">AI Tools</span>
          <ChevronDownIcon className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 shadow-xl w-56"
        align="start"
        withoutPortal
      >
        {items.map((item, i) => {
          return (
            <div key={i} className="flex flex-col">
              <h6 className="text-muted-foreground font-medium text-xs p-2">
                {item.group}
              </h6>
              {item.commands.map((c, j) => {
                return (
                  <div
                    key={j}
                    onClick={() => {
                      handleCommandClick(c.command);
                    }}
                    className="flex space-x-2 items-center rounded-md hover:bg-accent px-2 py-1.5 text-accent-foreground cursor-pointer"
                  >
                    <c.icon className="size-4 text-primary" />
                    <span className="text-sm">{c.title}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );

  // return (
  //   <div className="shadow-xl w-56 bg-background border rounded-md flex flex-col divide-y">
  //     {content()}
  //   </div>
  // );
};
