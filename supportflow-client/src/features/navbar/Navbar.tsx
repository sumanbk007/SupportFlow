import type { MenuProps } from "antd";
import { Icon } from "@ui/icon/Icon";
import { Avatar, Badge, Dropdown } from "@ui/index";
import { useState } from "react";

const items: MenuProps["items"] = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "settings",
    label: "Settings",
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: "Logout",
  },
];
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <h5>Dashboard</h5>

      <div className="flex items-center gap-6">
        <Badge count={5}>
          <Icon name="Bell" />
        </Badge>

        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar size={"small"}>JD</Avatar>
            <span>John Doe</span>
            <Icon
              name="ChevronDown"
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
