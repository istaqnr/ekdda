import { MenuItemType } from "./Menu";
import MenuItem from "./MenuItem";

interface Props {
  menuOptions: MenuItemType[];
  level: number;
  isMobile: boolean;
  searchKeyword: string;
}

const MenuOptions = ({
  menuOptions,
  isMobile,
  level,
  searchKeyword,
}: Props) => {
  return (
    <div key={level} className="text-gray-800 flex flex-col">
      {menuOptions?.length > 0 &&
        menuOptions.map((menuItem: MenuItemType) => {
          return (
            <MenuItem
              key={menuItem.id}
              level={level}
              menuItem={menuItem}
              searchKeyword={searchKeyword}
              isMobile={isMobile}
            />
          );
        })}
    </div>
  );
};

export default MenuOptions;
