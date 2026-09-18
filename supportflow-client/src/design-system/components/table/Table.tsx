import { Table as AntTable } from "antd";
import type { TableProps } from "antd";

export const Table = <T extends object = Record<string, unknown>>({
  size = "middle",
  bordered = false,
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  },
  ...props
}: TableProps<T>) => {
  const mergedPagination =
    pagination === false
      ? false
      : {
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} items`,
          ...pagination,
        };

  return (
    <AntTable<T>
      size={size}
      bordered={bordered}
      pagination={mergedPagination}
      {...props}
    />
  );
};

export type { TableProps, TableColumnsType } from "antd";
