"use client";
import { cn } from "@/lib/utils";
import { ReactElement, ReactNode, useEffect, useState } from "react";

type RenderTitle = (onTabChange: () => void, isActive: boolean) => ReactNode;

interface TabItemProps {
  tabKey: string;
  title: ReactNode | RenderTitle;
  disabled?: boolean;
  hidden?: boolean;
  actionTitle?: boolean;
  className?: string;
  children?: ReactNode;
}

interface TabsProps {
  defaultTabKey: string;
  className?: string;
  onTabChange?: (key: string) => void;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

function TabItem(props: TabItemProps) {
  return <div></div>;
}

function Tabs({ defaultTabKey, className, onTabChange, children }: TabsProps) {
  const [activeTabKey, setActiveTabKey] = useState(defaultTabKey);

  useEffect(() => {
    setActiveTabKey(defaultTabKey);
  }, [defaultTabKey]);

  const list = children instanceof Array ? children : [children];

  return (
    <>
      <ul
        className={cn(
          `flex flex-nowrap overflow-auto scrollbar-none border-b`,
          className
        )}
      >
        {list.map((item) => {
          const { tabKey, title, disabled, className, hidden } = item.props;
          if (hidden) {
            return null;
          }
          const active = activeTabKey === tabKey;
          return (
            <li key={tabKey}>
              <div className="relative">
                {typeof title !== "function" ? (
                  <button
                    disabled={disabled}
                    className={cn("py-3 px-4", className)}
                    onClick={() => {
                      onTabChange?.(tabKey);
                      setActiveTabKey(tabKey);
                    }}
                  >
                    {title}
                  </button>
                ) : (
                  title(() => {
                    setActiveTabKey(tabKey);
                  }, active)
                )}
                {active && (
                  <div className="position-absolute w-full bg-primary bottom-0 h-[2px]"></div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {list.find((item) => item.props.tabKey === activeTabKey)?.props.children}
    </>
  );
}

export { Tabs, TabItem };
