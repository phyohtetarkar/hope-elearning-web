import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

interface TableProps extends Props {
  variant?: "auto" | "fixed";
}

function Table({ variant = "auto", className, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`table-${variant} min-w-full ${className ?? ""}`}
      >
        {children}
      </table>
    </div>
  );
}

export function Header({ className, children }: Props) {
  return (
    <thead className={`${className ?? ""}`}>
      <tr className="">{children}</tr>
    </thead>
  );
}

export function Body({ className, children }: Props) {
  return <tbody className={`divide-y border-y ${className ?? ""}`}>{children}</tbody>;
}

export function Column({ className, children }: Props) {
  return (
    <th
      scope="col"
      className={`py-3 text-left text-sm whitespace-nowrap pr-4 last:pr-0 ${className ?? ""}`}
    >
      {children}
    </th>
  );
}

export function Row({ className, children }: Props) {
  return <tr className={`${className ?? ""}`}>{children}</tr>;
}

export function Cell({ className, children }: Props) {
  return <td className={`py-3.5 text-left pr-4 last:pr-0 ${className ?? ""}`}>{children}</td>;
}

Table.Header = Header;
Table.Body = Body;
Table.Column = Column;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
